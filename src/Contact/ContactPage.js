import "./ContactPage.css";
import { useState, useEffect, /*useLayoutEffect, useRef,*/ useReducer } from "react";
import { ContactNav } from "./ContactNav.js";
import { ContactList } from "./ContactList.js";
import { ContactData } from "./ContactData.js";

const ACTIONS = {
  DISPLAY: "display",
  SEARCH: "search",
  SELECT_KEY: "select-key",
  ADD_FILTER: "add-filter",
  RESET: "reset",
  SORT_KEY: "sort-key",
  SORT_DIRECTION: "sort-direction",
}

/*
const useIsOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = useState(undefined);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
*/

const ContactPage = ({ user, contacts, /*keys*/ contactKeys}) => {

  /*const [contactKeys, setContactKeys] = useState(keys);*/

  const reducer = (searchOptions, action) => {
    switch(action.type) {
      case ACTIONS.SEARCH:
        //update search input
        return {...searchOptions, searchInput: action.payload.input};
      case ACTIONS.SELECT_KEY:
        //set the selected keys to all available keys
        searchOptions.selectedKeys = contactKeys.display;
        //if the default option is not selected, set selectedKeys to the selected key
        if(action.payload.id) searchOptions.selectedKeys = [{id: action.payload.id, display: action.payload.display}];
        //update state
        return {...searchOptions};
      case ACTIONS.ADD_FILTER:
        //define current search filters and find the index of the filter for the selected filter id
        let i = searchOptions.filters.findIndex(filter => filter.id === action.payload.id);
        //if there is a filter for the selected filter id, delete it
        if(i !== -1) searchOptions.filters.splice(i, 1);
        //if the filter has a value, add it
        if(action.payload.value) searchOptions.filters = [...searchOptions.filters, {id: action.payload.id, value: action.payload.value}];
        //return filters
        return {...searchOptions};
      case ACTIONS.RESET:
        return {...searchOptions, filters: [], selectedKeys: contactKeys.display, sort: {id: contactKeys.display[0].id, isDesending: false}};
      case ACTIONS.SORT_KEY:
        return {...searchOptions, sort: {...searchOptions.sort, id: action.payload.id}};
      case ACTIONS.SORT_DIRECTION:
        return {...searchOptions, sort: {...searchOptions.sort, isDescending: !searchOptions.sort.isDescending}};
      default: 
        return searchOptions;
    }
  }

  const [searchOptions, dispatch] = useReducer(reducer, {searchInput: "", filters: [], selectedKeys: contactKeys.display, sort: {id: contactKeys.display[0].id, isDesending: false}});
  const [contactDisplay, setContactDisplay] = useState(contacts);
  const [selectedContact, setSelectedContact] = useState(undefined);

  useEffect(() => {
    setContactDisplay(() => contacts.filter(contact => {
      return searchOptions.selectedKeys.some(key => {
        //filter for contact displays the selected keys that include the search input
        return contact[`display`][key.id]?.toLowerCase()?.includes(searchOptions.searchInput.toLowerCase());
      }) && (searchOptions.filters.length ? searchOptions.filters.every(filter => {
        //filter for contact displays at filtered keys that are the filter value
        return contact[`display`][filter.id] === filter.value;
      }) : true);
    }).sort((a, b) => (
      !a[`display`][searchOptions.sort.id] ? (
        //if the display value does not have a value, place it at the bottom of the list
        1
      ) : (
        //sort by the selected sort key by chosen ascending/descending order
        (
          (searchOptions.sort.isDescending ? a : b)[`display`][searchOptions.sort.id]
        ) < (
          (searchOptions.sort.isDescending ? b : a)[`display`][searchOptions.sort.id]
        ) ? ( 
          1
        ) : (
          -1
        )
      )
    )));
  }, [contacts, searchOptions]);

  useEffect(() => {
    if(selectedContact && !contactDisplay.find(contact => contact.id === selectedContact?.id)) setSelectedContact(undefined);
  }, [contactDisplay, selectedContact]);

  /*
  const contactPageRef = useRef(null);
  const contactPageOverflow = useIsOverflow(contactPageRef);

  console.log(contactPageOverflow);
  console.log(contactKeys);

  while(contactPageOverflow) {
    if(!contactKeys.display.length-1) return;
    console.log("removed");
    setContactKeys(() => {return {...contactKeys, display: contactKeys.slice(-1)}});
  }
  */

  return (
    <>
      <div className="contact-page" ref={/*contactPageRef*/ undefined}>
        <div className="contact-body-border-top"> </div>
        <div className="contact-body">
          <div className="contact-access"> 
            <ContactNav
              contactKeys={contactKeys}
              contactDisplay={contactDisplay}
              searchOptions={searchOptions}
              dispatch={dispatch}
            />
            <ContactList
              contacts={contacts}
              contactKeys={contactKeys}
              contactDisplay={contactDisplay}
              searchOptions={searchOptions}
              dispatch={dispatch}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
            />
          </div>
          <ContactData
            contactKeys={contactKeys}
            selectedContact={selectedContact}
          />
        </div>
      </div>
    </>
  );
}

export {
  ContactPage,
}

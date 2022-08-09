import "./ContactPage.css";
import { useState, useEffect, useReducer } from "react";
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

function ContactPage({ user, contacts, contactKeys }) {

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
        a[`display`][searchOptions.sort.id] > b[`display`][searchOptions.sort.id] ? ( 
          searchOptions.sort.isDescending ? -1 : 1
        ) : (
          searchOptions.sort.isDescending ? 1 : -1
        )
      )
    )));
  }, [contacts, searchOptions]);

  useEffect(() => {
    if(selectedContact && !contactDisplay.find(contact => contact.id === selectedContact?.id)) setSelectedContact(undefined);
  }, [contactDisplay, selectedContact]);
  
  return (
    <>
      <div className="contact-page">
        <div className="contact-header">
          <h1 className="contact-welcome"> 
            👋 Welcome to Your Contacts
            {user?.firstName ? `, ${user.firstName}.` : undefined}
          </h1> 
        </div> 
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

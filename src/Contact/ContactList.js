import "./ContactList.css";
import { pluck, unique } from "../Utils/arrayUtils.js";

const ACTIONS = {
  ADD_FILTER: "add-filter",
}

const ContactList = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch, selectedContact, setSelectedContact }) => {

  return (
    <div className="contact-list">
      <div className="contact-list-table"
        style={{gridTemplateColumns: `auto repeat(${contactKeys.display.length}, 1fr)`}}
      > 
        <div className="contact-list-row contact-list-header">
          <div className="contact-list-filter"> 
            <p> # </p>
          </div>
          {contactKeys.display.map((key, index) => {
            const selectedValue = searchOptions.filters.find(filter => filter.id === key.id)?.value;
            return (
              <div className="contact-list-filter" key={index}>
                <select value={selectedValue ?? key.display}
                  onChange={(e) => dispatch({type: ACTIONS.ADD_FILTER, payload: {id: key.id, value: e.target.value}})}
                >
                  <option value=""> {key.display} </option>
                  {unique(pluck(pluck(contacts, [`display`]), [key.id])).map((value, index) => {if(value) return (
                    <option key={index} value={value}> {value} </option>
                  ); return ""})}
                </select>
              </div>
            )})}
        </div>
        {contactDisplay?.map((contact, index) => (
          <ContactItem key={index} rowIndex={index} contactKeys={contactKeys} contact={contact} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        ))}
      </div>
      {contactDisplay.length ? undefined : <div className="contact-list-none-found"> No Search Results Found </div>}
    </div>
  )
}

const ContactItem = ({ rowIndex, contactKeys, contact, selectedContact, setSelectedContact }) => {
  
  //replace empty values with empty strings
  Object.values(contact.display).forEach(value => {if(!value) value = ""});
  //determine if the contactItem is selected
  const isSelected = contact.id === selectedContact?.id;
  
  return (
    <div className="contact-list-row contact-list-item"
      onClick={() => setSelectedContact(() => isSelected ? undefined : contact)}
    >
      <div className={`contact-list-key ${isSelected ? "contact-list-key-selected" : ""}`}> 
        <p> {rowIndex + 1} </p>
      </div>
      {contactKeys.display.map((key, itemIndex) => (
        <div className={`contact-list-key ${isSelected ? "contact-list-key-selected" : ""}`} key={`${rowIndex}-${itemIndex}`}>
          {key.link ? (
            <a title={contact[`display`][key.id]} href={key.link} target="_blank" rel="noreferrer"> {contact[`display`][key.id]} </a>
          ) : (
            <p title={contact[`display`][key.id]}> {contact[`display`][key.id]} </p>
          )}
        </div>
      ))}
    </div>
  )
}

export {
  ContactList,
}

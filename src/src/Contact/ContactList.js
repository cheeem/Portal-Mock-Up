import "./ContactList.css";
import { useState } from "react";
import { pluck, unique } from "../Utils/arrayUtils.js";

const ACTIONS = {
  ADD_FILTER: "add-filter",
}

const ContactList = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch, selectedContact, setSelectedContact }) => {
  //`repeat(${contactKeys.display.length}, auto)`
  return (
    <div className="contact-list">
      <div className="contact-list-table"
        style={{gridTemplateColumns: `repeat(${contactKeys.display.length}, 1fr)`}}
      > 
        <div className="contact-list-row contact-list-header">
          {contactKeys.display.map((key, index) => (
            <div className="contact-list-filter" key={index}>
              <select
                onChange={(e) => dispatch({type: ACTIONS.ADD_FILTER, payload: {id: key.id, value: e.target.value}})}
              >
                <option value=""> {key.display} </option>
                {unique(pluck(pluck(contacts, [`display`]), [key.id])).map((value, index) => {if(value) return (
                  <option key={index} value={value}> {value} </option>
                ); return ""})}
              </select>
            </div>
          ))}
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

  const [hovered, setHovered] = useState(false);
  
  //replace empty values with empty strings
  Object.values(contact.display).forEach(value => {if(!value) value = ""});
  //determine if the contactItem is selected
  const isSelected = contact.id === selectedContact?.id;
  //define styles
  const backgroundColor =  isSelected ? `var(--highlight)` : hovered ? `#EFEFEF` : `unset`; 
  const color = isSelected ? `white` : `black`;
  const transition = isSelected ? `0.2s` : '0.1s';

  return (
    <div className="contact-list-row contact-list-item"
      onClick={() => setSelectedContact(() => isSelected ? undefined : contact)}
      onMouseEnter={() => setHovered(() => true)}
      onMouseLeave={() => setHovered(() => false)}
    >
      {contactKeys.display.map((key, itemIndex) => (
        <div className="contact-list-key" key={`${rowIndex}-${itemIndex}`}
          style={{backgroundColor, transition}}
        >
          <p title={contact[`display`][key.id]}
            style={{color, transition}}
          > {contact[`display`][key.id]} </p>
        </div>
      ))}
    </div>
  )
}

export {
  ContactList,
}
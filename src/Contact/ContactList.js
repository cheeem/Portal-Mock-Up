import "./ContactList.css";
import React from "react";
import { pluck, unique } from "../Utils/arrayUtils.js";

const ACTIONS = {
  ADD_FILTER: "add-filter",
}

const ContactList = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch, selected, setSelected }) => {
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
          <ContactItem key={index} rowIndex={index} contactKeys={contactKeys} contact={contact} selected={selected} setSelected={setSelected} />
        ))}
      </div>
      {contactDisplay.length ? undefined : <div className="contact-list-none-found"> No Search Results Found </div>}
    </div>
  )
}

const ContactItem = ({ rowIndex, contactKeys, contact, selected, setSelected }) => {
  //replace empty values with empty strings
  Object.values(contact.display).forEach(value => {if(!value) value = ""});
  //determine if the contactItem is selected
  console.log(selected);
  const isSelected = selected.index === rowIndex;
  return (
    <div className="contact-list-row contact-list-item"
      style={{backgroundColor: isSelected ? `blue` : `unset`}}
      onClick={(e) => setSelected(() => isSelected ? {index: undefined, contact: undefined} : {index: rowIndex, contact})}
    >
      {contactKeys.display.map((key, itemIndex) => (
        <div className="contact-list-key" key={`${rowIndex}-${itemIndex}`}>
          <p> {contact[`display`][key.id]} </p>
        </div>
      ))}
    </div>
  )
}

export {
  ContactList,
}

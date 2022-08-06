import "./ContactList.css";
import React from "react";
import { pluck, unique } from "../Utils/arrayUtils.js";

const ACTIONS = {
  ADD_FILTER: "add-filter",
}

const ContactList = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch }) => {
  //`repeat(${contactKeys.display.length}, auto)`
  return (
    <div className="contact-list">
      <table className="contact-table" style={{gridTemplateColumns: `repeat(${contactKeys.display.length}, 1fr`}}> 
        <thead>
          <tr className="contact-list-filter">
            {contactKeys.display.map((key, index) => (
              <th key={index}>
                <select onChange={(e) => dispatch({type: ACTIONS.ADD_FILTER, payload: {id: key.id, value: e.target.value}})}>
                  <option value=""> {key.display} </option>
                  {unique(pluck(pluck(contacts, [`display`]), [key.id])).map((value, index) => {if(value) return (
                    <option key={index} value={value}> {value} </option>
                  ); return ""})}
                </select>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contactDisplay?.map((contact, index) => (
            <ContactItem key={index} rowIndex={index} contactKeys={contactKeys} contact={contact} />
          ))}
        </tbody>
      </table>
      {contactDisplay.length ? undefined : <div className="contact-list-none-found"> No Search Results Found </div>}
    </div>
  )
}

const ContactItem = ({ rowIndex, contactKeys, contact }) => {
  //replace empty values with empty strings
  Object.values(contact.display).forEach(value => {if(!value) value = ""});
  return (
    <tr className="contact-list-row">
      {contactKeys.display.map((key, index) => (
        <td key={`${rowIndex}-${index}`}> {contact[`display`][key.id]} </td>
      ))}
    </tr>
  )
}

export {
  ContactList,
}

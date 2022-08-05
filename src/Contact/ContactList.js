import './ContactList.css';
import React from 'react';
import { pluck, unique } from '../Utils/arrayUtils.js';

const ACTIONS = {
  ADD_FILTER: 'add-filter',
}

const ContactList = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch }) => {
  return (
    <table className="contact-list"> 
      <thead> 
        <tr className="contact-list-filter">
          {contactKeys.map((key, index) => (
            <th key={index}>
              <select onChange={(e) => dispatch({type: ACTIONS.ADD_FILTER, payload: {id: key.id, value: e.target.value}})}>
                <option value=""> {key.display} </option>
                {unique(pluck(contacts, key.id)).map((value, index) => {if(value) return (
                  <option key={index} value={value}> {value} </option>
                ); return ''})}
              </select>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contactDisplay?.map((contact, index) => <ContactItem key={index} rowIndex={index} contactKeys={contactKeys} contact={contact} />)}
      </tbody>
    </table>
  )
}

const ContactItem = ({ rowIndex, contactKeys, contact }) => {
  //replace empty values with empty strings
  Object.values(contact).forEach(value => {if(!value) value = ''});
  return (
    <tr className="contact-list-row">
      {contactKeys.map((key, index) => (
        <td key={`${rowIndex}-${index}`}> {contact[key.id]} </td>
      ))}
    </tr>
  )
}

export {
  ContactList,
}

import './ContactNav.css';
import React from 'react';
import { pluck, unique } from '../Utils/arrayUtils.js'

const ACTIONS = {
  SEARCH: 'search',
  SELECT_KEY: 'select-key',
}

const ContactNav = ({ contacts, contactKeys, contactDisplay, searchOptions, dispatch }) => {
  
  //extract all values for each selected key for each contact object into a single array
  const contactValues = unique(searchOptions.selectedKeys.flatMap(key => pluck(contactDisplay, key.id)));

  return (
  <div className="contact-nav">
    <div className="contact-search">
      <label> Search Your Contacts </label>
      <input list="contact-search" type="text" onChange={(e) => dispatch({type: ACTIONS.SEARCH, payload: {input: e.target.value},})} />
      <select className="contact-search-filter"
        onChange={(e) => dispatch({type: ACTIONS.SELECT_KEY, payload: {id: e.target.value, display: contactKeys[e.target.selectedIndex].display}})}
      >
        <option value=""> No Search Filters </option>
        {contactKeys.map((key, index) => (
          <option key={index} value={key.id}> Search By {key.display} </option>
        ))}
      </select>
      <datalist id="contact-search">
          {contactValues.map((value, index) => (
            <option key={index} value={value} />
          ))}
      </datalist>
    </div>
  </div>
  )
}

export {
    ContactNav,
}

/*
import './ContactNav.css';
import React from 'react';

const ContactNav = ({ displayContacts, }) => {
  
  //extract all values for each key for each contact object into a single array
  const contactValues = Object.keys(displayContacts[0]).map(key => displayContacts.map(contact => contact[key])).flat();

  return (
  <div className="contact-nav">
    <div className="contact-search">
      <input className="contact-search-input" list="contact-search" type="text" />
      <datalist id="contact-search">
          {contactValues.map((value, index) => <option key={index} value={value} />)}
      </datalist>
    </div>
  </div>
  )
}

export {
    ContactNav,
}
*/
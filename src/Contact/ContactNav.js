import "./ContactNav.css";
import React from "react";
import { pluck, unique } from "../Utils/arrayUtils.js"

const ACTIONS = {
  SEARCH: "search",
  SELECT_KEY: "select-key",
}

const ContactNav = ({ contactKeys, contactDisplay, searchOptions, dispatch }) => {
  
  //extract all values for each selected key for each contact object into a single array
  const contactValues = unique(searchOptions.selectedKeys.flatMap(key => pluck(pluck(contactDisplay, [`display`]), [key.id])));

  return (
  <div className="contact-nav">
    <div className="contact-search">
      <label> Search Your Contacts </label>
      <input list="contact-search" type="text"
        onChange={(e) => dispatch({type: ACTIONS.SEARCH, payload: {input: e.target.value},})}
      />
      <select className="contact-search-filter"
        onChange={(e) => dispatch({type: ACTIONS.SELECT_KEY, payload: {id: e.target.value, display: contactKeys.display[e.target.selectedIndex-1]?.display}})}
      >
        <option value=""> No Search Filters </option>
        {contactKeys.display.map((key, index) => (
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
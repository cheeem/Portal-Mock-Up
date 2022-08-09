import "./ContactNav.css";
import React from "react";
import { pluck, unique } from "../Utils/arrayUtils.js"

const ACTIONS = {
  SEARCH: "search",
  SELECT_KEY: "select-key",
  RESET: "reset",
  SORT_KEY: "sort-key",
  SORT_DIRECTION: "sort-direction",
}

const ContactNav = ({ contactKeys, contactDisplay, searchOptions, dispatch }) => {
  
  //extract all values for each selected key for each contact object into a single array
  const contactValues = unique(searchOptions.selectedKeys.flatMap(key => pluck(pluck(contactDisplay, [`display`]), [key.id])));

  return (
  <div className="contact-nav">
    <div className="contact-search">
      <label> 🔎 Search Your Contacts </label>
      <input list="contact-search" type="text"
        onChange={(e) => dispatch({type: ACTIONS.SEARCH, payload: {input: e.target.value},})}
      />
      <select className="contact-search-filter" value={searchOptions.selectedKeys.length > 1 ? "" : searchOptions.selectedKeys[0].id}
        onChange={(e) => dispatch({type: ACTIONS.SELECT_KEY, payload: {id: e.target.value, display: contactKeys.display[e.target.selectedIndex-1]?.display}})}
      >
        <option value=""> Search By 🌐 All Fields </option>
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
    <div className="contact-nav-options">
      <p className="contact-reset"
        onClick={() => dispatch({type: ACTIONS.RESET})}
      > Reset Filters 🔄 </p>
      <div className="contact-sort">
        <p className="contact-sort-direction"
          onClick={() => dispatch({type: ACTIONS.SORT_DIRECTION})}
        >
          {searchOptions.sort.isDescending ? "Descending 🔽" : "Ascending 🔼"}
        </p>
        <select className="contact-sort-id"
          onChange={(e) => dispatch({type: ACTIONS.SORT_KEY, payload: {id: e.target.value}})}
        > 
          {contactKeys.display.map((key, index) => (
            <option key={index} value={key.id}> Sort By {key.display} </option>
          ))}
        </select>
      </div>
    </div>
  </div>
  )
}

export {
    ContactNav,
}
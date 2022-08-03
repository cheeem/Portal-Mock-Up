import './ContactNav.css';
import React from 'react';

const ContactNav = ({ contactFilters, }) => {
  return (
    <div className="contact-nav">
        <div className="contact-search">
            {/*<input className="contact-search-input" list="contact-search" type="text" />*/}
            {/*<datalist id="color-list"> </datalist>*/}
        </div>
        <div className="contact-filter-list">
            {contactFilters?.map((filter, index) => <ContactFilter key={index} />)}
        </div>
    </div>
  )
}

const ContactFilter = () => {
    return (
        <div className="contact-filter"> filter </div>
    )
}

export {
    ContactNav,
}

import './ContactPage.css';
import { useReducer } from 'react';
import { ContactNav } from './ContactNav.js';
import { ContactList } from './ContactList.js';
import { ContactData } from './ContactData.js';

const contactFilters = [
  {}, {}, {}, {},
];

const contactsReducer = (filteredContacts, action) => {

}

function ContactPage({ user, contacts, }) {

  const [displayContacts, contactsDipsatch] = useReducer(contactsReducer, contacts);

  return (
    <>
      <div className="contact-page">
        <div className="contact-header">
          <h1 className="contact-welcome"> 
            👋 Welcome to Your Contacts
            {user?.firstName ? `, ${user.firstName}.` : undefined}
          </h1> 
        </div> 
        <div className="contact-body">
          <ContactNav contactFilters={contactFilters}/>
          <div className="contact-container"> 
            <ContactList displayContacts={displayContacts} />
            <ContactData />
          </div>
        </div>
      </div>
    </>
  );
}

export {
  ContactPage,
}

import './ContactList.css';
import React from 'react';

const ContactList = ({ displayContacts, }) => {
  return (
    <table className="contact-table"> 
      <thead> 
        <tr className="contact-table-header"> 
          <th> Name </th>
          <th> Company </th>
          <th> Email </th>
          <th> Phone Number</th>
          <th> Location </th>
        </tr>
      </thead>
      <tbody> 
        {displayContacts?.map((contact, index) => <ContactItem key={index} contact={contact} />)}
      </tbody> 
    </table>
  )
}

const ContactItem = ({ contact }) => {
  return (
    <tr className="contact-row">
      <td> {`${contact?.firstName} ${contact?.lastName} ${contact?.title ? `(${contact.title})` : ''}`} </td>
      <td> <a href="#"> {contact?.company} </a> </td>
      <td> <a href="#"> {contact?.email} </a> </td>
      <td> <a href="#"> {contact?.phoneNumber} </a> </td>
      <td> {contact?.location} </td>
    </tr>
  )
}

export {
  ContactList,
}

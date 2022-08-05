import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './Nav/Nav.js';
import { ContactPage } from './Contact/ContactPage';

const user = {
    firstName: 'Jackson',
    lastName: 'Werner',
    email: 'jackson.werner@intern-operationsmile.org',
    phoneNumber: '828-555-2034',
    rank: 0,
};

const contacts = [
  {
    fullName: 'James Morgan',
    company: "Morgan & Son",
    email: 'james.morgan@morganandson.org',
    phoneNumber: '921-555-6127',
    location: "New York City, NY"
  },
  {
    fullName: 'Ali Yu',
    company: "Technology Incorporated",
    email: 'ali.yu@technologyinc.com',
    phoneNumber: '202-555-3499',
    location: "Los Angeles, CA"
  },
  {
    fullName: 'Alexis Diaz',
    company: "Morgan & Son",
    email: 'alexis.diaz@morganandson.org',
    phoneNumber: '434-555-5454',
    location: "Boston, MA"
  },
  {
    company: "Big Corporation",
    email: 'businessman@corporation.com',
    location: "Town, NV"
  },
  {
    fullName: 'Maureen Harper',
    company: "Customer Agency",
    email: 'm.harper@customeragency.com',
    phoneNumber: '202-555-0178',
    location: "Washington, DC"
  },
];

const contactKeys = [
  {id: 'fullName', display: 'Name'},
  {id: 'company', display: 'Company'},
  {id: 'email', display: 'Email'},
  {id: 'phoneNumber', display: 'Phone Number'},
  {id: 'location', display: 'Location'},
];

const linkList = [
    {label: 'Leads', path: '/leads', element: <></>,},
    {label: 'Opportunities', path: '/opportunities', element: <></>,},
    {label: 'Contacts', path: '/contacts', element: <ContactPage user={user} contacts={contacts} contactKeys={contactKeys} />,},
    {label: 'Vendors', path: '/vendors', element: <></>,},
    {label: 'Home', path: '/', element: <></>,},
];

const App = () => {
  return (
    <>
        <Nav linkList={linkList} />
        <Routes> {linkList.map((link, index) => <Route key={index} path={link.path} element={link.element} />)} </Routes>
    </>
  )
}

export {
    App
}
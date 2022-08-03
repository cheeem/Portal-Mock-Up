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
    firstName: 'James',
    lastName: 'Morgan',
    company: "Morgan & Son",
    email: 'james.morgan@morganandson.org',
    phoneNumber: '921-555-6127',
    location: "New York, USA"
  },
  {
    firstName: 'Ali',
    lastName: 'Yu',
    company: "Technology Incorporated",
    email: 'ali.yu@technologyinc.org',
    phoneNumber: '202-555-3499',
    location: "New York, USA"
  },
  {
    firstName: 'Alexis',
    lastName: 'Diaz',
    company: "Morgan & Son",
    email: 'james.morgan@morganandson.org',
    phoneNumber: '434-555-5454',
    location: "New York, USA"
  },
];

const linkList = [
    {label: 'Leads', path: '/leads', element: <></>,},
    {label: 'Opportunities', path: '/opportunities', element: <></>,},
    {label: 'Contacts', path: '/contacts', element: <ContactPage user={user} contacts={contacts} />,},
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

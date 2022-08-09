import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./Nav/Nav.js";
import { ContactPage } from "./Contact/ContactPage";

const user = {
    firstName: "Jackson",
    lastName: "Werner",
    email: "jackson.werner@intern-operationsmile.org",
    phoneNumber: "828-555-2034",
    rank: 0,
};

const MaureenHarperArray = [];
for(let i = 0; i < 200; i++){
  MaureenHarperArray.push({
    id: 4+i,
    display: {
      fullName: "Maureen Harper",
      company: "Customer Agency",
      email: "m.harper@customeragency.com",
      phoneNumber: "202-555-0178",
      location: "Washington, DC",
    },
    basic: {
      fullName: "Maureen Harper",
      company: "Customer Agency",
      email: "m.harper@customeragency.com",
      phoneNumber: "202-555-0178",
      location: "Washington, DC",
    },
    advanced: {
      
    },
  });
}

const contacts = [
  {
    id: 0,
    display: {
      fullName: "James Morgan",
      company: "Morgan & Son",
      email: "james.morgan@morganandson.org",
      phoneNumber: "921-555-6127",
      location: "New York City, NY",
    },
    basic: {
      fullName: "James Morgan",
      company: "Morgan & Son",
      email: "james.morgan@morganandson.org",
      phoneNumber: "921-555-6127",
      location: "New York City, NY",
    },
    advanced: {

    },
  },
  {
    id: 1,
    display: {
      fullName: "Ali Yu",
      company: "Technology Incorporated",
      email: "ali.yu@technologyinc.com",
      phoneNumber: "202-555-3499",
      location: "Los Angeles, CA",
    },
    basic: {
      fullName: "Ali Yu",
      company: "Technology Incorporated",
      email: "ali.yu@technologyinc.com",
      phoneNumber: "202-555-3499",
      location: "Los Angeles, CA",
    },
    advanced: {

    },
  },
  {
    id: 2,
    display: {
      fullName: "Alexis Diaz",
      company: "Morgan & Son",
      email: "alexis.diaz@morganandson.org",
      phoneNumber: "434-555-5454",
      location: "Boston, MA",
    },
    basic: {
      fullName: "Alexis Diaz",
      company: "Morgan & Son",
      email: "alexis.diaz@morganandson.org",
      phoneNumber: "434-555-5454",
      location: "Boston, MA",
    },
    advanced: {

    },
  },
  {
    id: 3,
    display: {
      company: "Big Corporation",
      email: "businessman@corporation.com",
      location: "Town, NV",
    },
    basic: {
      company: "Big Corporation",
      email: "businessman@corporation.com",
      location: "Town, NV",
    },
    advanced: {
      jordans: "FAKE"
    }
  },
]

const contactKeys = {
  display: [
    {id: "fullName", display: "👤 Name"},
    {id: "company", display: "🏢 Company"},
    {id: "email", display: "📧 Email"},
    {id: "phoneNumber", display: "📱 Phone Number"},
    {id: "location", display: "🗺️ Location"},
  ],
  basic: [
    {id: "fullName", display: "👤 Name"},
    {id: "company", display: "🏢 Company"},
    {id: "email", display: "📧 Email"},
    {id: "phoneNumber", display: "📱 Phone Number"},
    {id: "location", display: "🗺️ Location"},
  ],
  advanced: [
    {id: "jordans", display: "👟 Jordans"}
  ],
  /*{id: "position", display: "Position"},*/
};

const linkList = [
    {label: "Leads", path: "/leads", element: <></>,},
    {label: "Opportunities", path: "/opportunities", element: <></>,},
    {label: "Contacts", path: "/contacts", element: <ContactPage user={user} contacts={contacts} contactKeys={contactKeys} />,},
    {label: "Vendors", path: "/vendors", element: <></>,},
    {label: "Home", path: "/", element: <></>,},
];

const App = () => {
  return (
    <div className="App">
        <Nav linkList={linkList} />
        <Routes> {linkList.map((link, index) => <Route key={index} path={link.path} element={link.element} />)} </Routes>
    </div>
  )
}

export {
    App
}

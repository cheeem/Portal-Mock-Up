import "./App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
for(let i = 0; i < 30; i++){
  MaureenHarperArray.push({
    id: 5+i,
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
    },
  },
  {
    id: 4,
    display: {
      fullName: "ZAZA Jordan",
      company: "Lofts",
      email: "iownlofts@lofts.com",
      location: "Havana, MI",
    },
    basic: {
      fullName: "ZAZA Jordan",
      company: "Lofts",
      email: "iownlofts@lofts.com",
      location: "Havana, MI",
    },
    advanced: {
      jordans: "REAL"
    },
  },
  ...MaureenHarperArray
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
    {
      label: "Leads",
      path: "/leads",
      page: <></>,
      svgPath: <> <circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/> </>},
    {
      label: "Opportunities",
      path: "/opportunities",
      page: <></>,
      svgPath: <> <path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/> </>},
    {
      label:"Contacts",
      path: "/contacts",
      page: <ContactPage user={user} contacts={contacts} contactKeys={contactKeys} />,
      svgPath: <> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path> </> },
    {
      label: "Vendors",
      path: "/vendors",
      page: <></>,
      svgPath: <> <circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/> </>},
    {
      label: "Home",
      path: "/",
      page: <></>,
      svgPath: <> <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/> </>},
];

const App = () => {

  const location = useLocation();
  let destination = linkList.find(link => link.path === location.pathname).label;
  if(destination !== "Home") destination = `to Your ${destination}`;
  //<span className="secondary"> 

  return (
    <div className="app">
        <div className="app-header">
          <div className="app-header-content"> 
            <h1 className="app-header-welcome">
              👋 Welcome {destination}{user?.firstName ? `, ${user.firstName}.` : undefined}
            </h1>
            <Nav linkList={linkList} />
          </div>
        </div> 
        <Routes> {linkList.map((link, index) => <Route key={index} path={link.path} element={link.page} />)} </Routes>
    </div>
  )
}

export {
    App
}

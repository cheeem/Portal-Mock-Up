import "./ContactData.css";
import React from "react";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createDataSection = (contactKeys, selectedContact, type) => {
  const fields = contactKeys[type].filter(key => selectedContact?.[type]?.[key.id]).map((key, index) => (
    <div className="contact-data-field" key={index}>
      <h4 title={key.display}> {`${key.display}: `} </h4>
      <p title={selectedContact[type][key.id]}> {selectedContact[type][key.id]} </p>
    </div>
  ));
  return fields.length ? ( 
    <div className="contact-data-section">
      <h3 className="contact-data-header"> <span> {capitalize(type)} </span> Information </h3>
      {fields}
    </div> 
  ) : undefined
}

const ContactData = ({ contactKeys, selectedContact }) => {
  
  const basicData = createDataSection(contactKeys, selectedContact, "basic");
  const advancedData = createDataSection(contactKeys, selectedContact, "advanced");

  const style = selectedContact ? {
    padding: `10px 20px`,
    borderLeft: `var(--contact-border-size) solid #EFEFEF`,
    //transition: `0.5s`,
  } : undefined;
  
  return (
    <div className="contact-data" style={style}>
      <div className="contact-data-display"> 
        {basicData}
        {advancedData}
      </div>
    </div>
  )
}



export {
  ContactData,
}

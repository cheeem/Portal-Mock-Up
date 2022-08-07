import "./ContactData.css";
import React from "react";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createDataSection = (contactKeys, selected, type) => {
  const fields = contactKeys[type].filter(key => selected.contact?.[type]?.[key.id]).map((key, index) => (
    <div className="contact-data-field" key={index}>
      <h4 title={key.display}> {`${key.display}: `} </h4>
      <p title={selected.contact[type][key.id]}> {selected.contact[type][key.id]} </p>
    </div>
  ));
  return fields.length ? ( 
    <div className="contact-data-section">
      <h3 className="contact-data-header"> <span> {capitalize(type)} </span> Information </h3>
      {fields}
    </div> 
  ) : undefined
}

const ContactData = ({ contactKeys, selected }) => {
  const basicData = createDataSection(contactKeys, selected, "basic");
  const advancedData = createDataSection(contactKeys, selected, "advanced");

  const style = selected?.contact ? {
    padding: `10px 20px`,
    borderLeft: `12px solid #EFEFEF`,
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

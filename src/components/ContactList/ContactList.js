import React from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
require("./ContactList.css");

const ContactList = ({ allConv, setConvId }) => {
  if (allConv) {
    return (
      <ul className="contact">
        {allConv.map((singleConv, key) => (
          <li
            onClick={() => {
              setConvId(singleConv.id);
            }}
            key={key}
          >
            <ProfilPicture />
            <p>{singleConv.Users[0].username}</p>
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>cc</div>;
  }
};

export default ContactList;

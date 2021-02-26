import React from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
require("./ContactList.css");

const ContactList = () => {
  return (
    <ul className="contact">
      <li>
        <ProfilPicture />
        <p>Sam</p>
      </li>
      <li>
        <ProfilPicture />
        <p>tom</p>
      </li>
      <li>
        <ProfilPicture />
        <p>pierre</p>
      </li>
    </ul>
  );
};

export default ContactList;

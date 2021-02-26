import React from "react";
import testPicture from "./1.jpg";
require("./ProfilPicture.css");

const ProfilePicture = () => {
  return <img class="profilPicture" src={testPicture} alt="Profile picture of" />;
};

export default ProfilePicture;

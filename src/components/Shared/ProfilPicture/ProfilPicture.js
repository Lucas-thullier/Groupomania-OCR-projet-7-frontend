import React, { useEffect, useState } from "react";
import picturePlaceholder from "../../../images/picturePlaceholder.jpg";
require("./ProfilPicture.css");

const ProfilePicture = ({ imageUrl }) => {
  return <img className="profilPicture" src={imageUrl ? imageUrl : picturePlaceholder} alt="Profile picture of" />;
};

export default ProfilePicture;

import React, { useEffect, useState } from "react";
require("./ProfilPicture.css");

const ProfilePicture = ({ imageUrl }) => {
  return <img className="profilPicture" src={imageUrl} alt="Profile picture of" />;
};

export default ProfilePicture;

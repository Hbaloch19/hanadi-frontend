import React from "react";
import "../App.css";

const ProfilePreview = () => {
  return (
    <div className="profile-preview">
      <img
        src="https://via.placeholder.com/120"
        alt="Profile"
        className="profile-pic"
      />
      <h3>John Doe</h3>
      <p>Full Stack Developer</p>
      <button className="btn">View Projects</button>
    </div>
  );
};

export default ProfilePreview;

import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div>
      <Link to="/">Home | </Link>
      <Link to="/jobs">Jobs</Link>
      <Link to ="/addjob">addjob</Link>
  

    </div>
  );
};

export default Header;

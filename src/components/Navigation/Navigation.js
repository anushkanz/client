import React from "react";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/bookride">BookRide</NavLink>
      <NavLink to="/driver">Driver</NavLink>
    </div>
  );
};

export default Navigation;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  SIGN_IN_PATH,
  REGISTER_PATH,
  FORGOT_PATH,
  PROFILE_PATH,
} from "./Routes";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <button onClick={() => setShow(!show)}>
        {show ? "hide dev header" : "show dev header"}
      </button>

      {show && <NavLink to={SIGN_IN_PATH}>sign-in</NavLink>}
      {show && <NavLink to={REGISTER_PATH}>register</NavLink>}
      {show && <NavLink to={FORGOT_PATH}>forgot</NavLink>}

      {show && <NavLink to={PROFILE_PATH}>profile</NavLink>}
    </div>
  );
};

export default Header;

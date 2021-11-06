import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FormLogin from "./formLogin";
import FormRegister from "./formRegister";

const Register = () => {
  const [showRegister, setShowRegister] = useState("none");
  const [showLogin, setShowLogin] = useState("none");
  //toggle display of login form
  const toggleRegister = () => {
    if (showLogin === "none") {
      if (showRegister === "none") {
        setShowRegister("block");
      } else if (showRegister === "block") {
        setShowRegister("none");
      }
    } else if (showLogin === "block" || showRegister === "none") {
      setShowLogin("none");
      setShowRegister("block");
    }
  };
  const toggleLogin = () => {
    if (showRegister === "none") {
      if (showLogin === "none") {
        setShowLogin("block");
      } else if (showLogin === "block") {
        setShowLogin("none");
      }
    } else if (showLogin === "none" || showRegister === "block") {
      setShowRegister("none");
      setShowLogin("block");
    }
  };

  return (
    <div className="register">
      <Button variant="info" style={{ margin: "1%" }} onClick={toggleRegister}>
        Sign In
      </Button>
      <Button variant="secondary" onClick={toggleLogin}>
        Login
      </Button>
      <div className="div-popup" style={{ display: showRegister }}>
        <FormRegister />
      </div>
      <div className="div-popup" style={{ display: showLogin }}>
        <FormLogin />
      </div>
    </div>
  );
};

export default Register;

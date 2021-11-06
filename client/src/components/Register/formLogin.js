import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import useForm from "./useForm";
import UserContext from "../../context/User/userContext";

const FormLogin = () => {
  const userContext = useContext(UserContext);
  const { auth } = userContext;
  let history = useHistory();
  const [values, handelChange] = useForm({
    email: "",
    password: "",
  });
  const checkLogin = (e) => {
    e.preventDefault();
    userContext.userLogin(values);
  };

  useEffect(() => {
    if (auth) {
      history.push("/user");
    }
  }, [auth, history]);
  return (
    <div>
      <form className="form-popup" onSubmit={checkLogin}>
        <input
          className="emailbtn"
          type="text"
          placeholder="Email"
          name="email"
          required
          value={values.email}
          onChange={handelChange}
        />
        <br />
        <input
          className="passbtn"
          type="password"
          placeholder="Password"
          name="password"
          required
          value={values.password}
          onChange={handelChange}
        />
        <br />
        <Button variant="success" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;

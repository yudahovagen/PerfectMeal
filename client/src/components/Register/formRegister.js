import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import useForm from "./useForm";
import UserContext from "../../context/User/userContext";

const FormRegister = () => {
  const userContext = useContext(UserContext);
  const { success } = userContext;
  const [values, handelChange] = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const checkRegister = async (e) => {
    e.preventDefault();
    await userContext.userRegister(values);
  };

  return (
    <div>
      <form className="form-popup" onSubmit={checkRegister}>
        <input
          className="namebtn"
          type="text"
          placeholder="First Name"
          name="firstname"
          required
          value={values.firstname}
          onChange={handelChange}
        />
        <br />
        <input
          className="namebtn"
          type="text"
          placeholder="Last Name"
          name="lastname"
          required
          value={values.lastname}
          onChange={handelChange}
        />
        <br />
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

        <br />
        <Button variant="success" type="submit">
          Register
        </Button>
      </form>
      {success ? <h3>you successfully registerd!!!</h3> : null}
    </div>
  );
};

export default FormRegister;

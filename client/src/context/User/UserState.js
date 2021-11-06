import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const UserState = (props) => {
  const initialState = {
    user: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    auth: false,
    success: false,
    isAuth:false,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const userRegister = async ({ password, firstname, lastname, email }) => {
    const request = await axios.post("/api/register", {
      email,
      password,
      lastname,
      firstname,
    });
    try {
      if (request.data.success) {
        dispatch({
          type: "USER_REGISTER",
          payload: request.data.success,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const userLogin = async ({ email, password }) => {
    const request = await axios.post("api/login", { email, password });
    try {
      if (request.data.isAuth) {
        dispatch({
          type: "USER_LOGIN",
          payload: request.data.isAuth,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const authCheck = () => {
    const request = axios.get("/api/auth").then((response) => response.data);

    dispatch({
      type: "USER_AUTH",
      payload: request,
    });
  };
  const userLogout = () => {
    const request = axios.get("api/logout").then((res) => res.data);
    dispatch({
      type: "USER_LOGOUT",
      payload: request,
    });
  };
  const getUser = () => {
    const request = axios.get("api/users").then((res) => res.data);
    dispatch({
      type: "GET_USERS",
      playload: request,
    });
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          user: state.user,
          auth: state.auth,
          success: state.success,
          isAuth:state.isAuth,
          userLogin,
          authCheck,
          userLogout,
          userRegister,
          getUser,
        }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
};

export default UserState;

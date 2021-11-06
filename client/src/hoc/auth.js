import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/User/userContext";
import { useHistory } from "react-router-dom";

const AuthCheck = () => {
  const userContext = useContext(UserContext);
  const { isAuth } = userContext;
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("will mounth");
    userContext.authCheck();
  }, []);

  useEffect(() => {
    setLoading(false);
    if (isAuth) {
      history.push("/user");
    } else {
      history.push("/");
    }
  }, [isAuth, history]);

  return <div>{loading ? <h1>loading...</h1> : null}</div>;
};
export default AuthCheck;

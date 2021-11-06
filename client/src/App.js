import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodState from "./context/Food/FoodState";
import AlertState from "./context/Alert/AlertState";
import UserState from "./context/User/UserState";
import Home from "./components/Home/home";
import Alert from "./components/layout/Alert";
import Header from "./components/Header/header";
// import Footer from "./components/Footer/footer";
// import NotFound from "./components/layout/Notfound";
import Register from "./components/Register/register";
// import AuthCheck from "./hoc/auth";

import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <br />
      <FoodState style={{ marginTop: "5px", position: "relative" }}>
        <AlertState>
          <UserState>
            <Router>
              <Alert />
              <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/user" exact component={Home} />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Router>
          </UserState>
        </AlertState>
      </FoodState>
      {/* <Footer /> */}
    </div>
  );
};

export default App;

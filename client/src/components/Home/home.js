import React, { Fragment } from "react";
import Search from "../Search/search";
import Food from "../Food/food";
import Plate from "../Food/plate";

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Food />
      <Plate />
    </Fragment>
  );
};

export default Home;

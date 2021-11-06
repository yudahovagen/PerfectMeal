import React, { useContext, useState } from "react";
import FoodContext from "../../context/Food/foodContext";
import AlertContext from "../../context/Alert/alertContext";

const Search = () => {
  const foodContext = useContext(FoodContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      foodContext.searchfood(text);
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div className="search">
      <form onSubmit={onSubmit} style={{ width: "25%" }}>
        <input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="search food"
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Search;

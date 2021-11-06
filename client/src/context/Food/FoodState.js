import React, { useReducer } from "react";
import axios from "axios";
import FoodContext from "./foodContext";
import FoodReducer from "./foodReducer";

const FoodState = (props) => {
  const initialState = {
    macro: [],
  };
  const [state, dispatch] = useReducer(FoodReducer, initialState);
  //search food
  const searchfood = async (text) => {
    const res = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=IckhwEjFyp6BaAC0oonKEpKjTbBjgG8b5EqBggnm&query=${text}`
    );
    //function to get only the needed items from the food nutrients    
    if (!res.data.foods[0]) {
      //if we didnt find the food
      dispatch({
        type: "NOT_FOUND",
        payload: {},
      });
    } else {
      //picking the first food element from the food array to avoid brands ("rice","brown rice","diff rice"...)
      const tmp = res.data.foods[0].foodNutrients;
      const result = {
        id: Math.floor(Math.random() * 100),
        name: text,
        Protien: tmp.filter((m) => m.nutrientId === 1003)[0].value,
        Fat: tmp.filter((m) => m.nutrientId === 1004)[0].value,
        Carbohydrate: tmp.filter((m) => m.nutrientId === 1005)[0].value,
        Calories: tmp.filter((m) => m.nutrientId === 1008)[0].value,
      };
      dispatch({
        type: "SEARCH_FOOD",
        payload: result,
      });
    }
  };

  return (
    <div>
      <FoodContext.Provider
        value={{
          macro: state.macro,
          searchfood,
        }}>
        {props.children}
      </FoodContext.Provider>
    </div>
  );
};

export default FoodState;

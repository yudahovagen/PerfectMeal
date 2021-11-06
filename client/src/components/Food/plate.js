import React, { useContext, useState, useEffect } from "react";
import FoodContext from "../../context/Food/foodContext";
import { Table } from "react-bootstrap";

const Plate = () => {
  const foodContext = useContext(FoodContext);
  const { macro } = foodContext;
  const [disply, setDisply] = useState(false);
  const [plate, setPlate] = useState([]);
  const [double, setDouble] = useState(false);

  const deleteFood = (i) => {
    let tmp = [...plate];
    let position = tmp.map((e) => e.id).indexOf(i);
    tmp.splice(position, 1);
    setPlate([...tmp]);
  };
  const addToPlate = () => {
    //we want to check if the item is already in the plate first
    for (let i = 0; i < plate.length; i++) {
      if (macro.name === plate[i].name) {
        setDouble(true);
        return;
      }
    }
    double ? setPlate([...plate]) : setPlate([...plate, macro]);
  };
  useEffect(() => {
    setTimeout(() => setDouble(false), 1000);
  }, [double]);
  useEffect(() => {
    if (plate.length === 0) {
      setDisply(false);
    }
  }, [plate]);

  return (
    <div className="plate">
      {macro.name ? (
        <button
          onClick={() => {
            addToPlate();
            setDisply(true);
          }}>
          add to plate
        </button>
      ) : null}
      {double ? <h4>item already in the table</h4> : null}

      <h2>my plate:</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Protein (100g)</th>
            <th>Fat (100g)</th>
            <th>Carbs (100g)</th>
            <th>Calories (100g)</th>
            <th></th>
          </tr>
        </thead>
        {disply ? (
          <tbody>
            {plate.map((e) => (
              <tr key={e.id}>
                <th>{e.name}</th>
                <th>{e.Protien}</th>
                <th>{e.Fat}</th>
                <th>{e.Carbohydrate}</th>
                <th>{e.Calories}</th>
                <th>
                  <button onClick={() => deleteFood(e.id)}>Remove</button>
                </th>
              </tr>
            ))}
            <tr>
              <th>total</th>
              <th>{plate.reduce((acc, curr) => acc + curr.Protien, 0)}</th>
              <th>{plate.reduce((acc, curr) => acc + curr.Fat, 0)}</th>
              <th>{plate.reduce((acc, curr) => acc + curr.Carbohydrate, 0)}</th>
              <th>{plate.reduce((acc, curr) => acc + curr.Calories, 0)}</th>
            </tr>
          </tbody>
        ) : null}
      </Table>
    </div>
  );
};

export default Plate;

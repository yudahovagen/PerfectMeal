import React, { useContext } from "react";
import FoodContext from "../../context/Food/foodContext";
import { Container, Row, Col } from "react-bootstrap";

const Food = () => {
  const foodContext = useContext(FoodContext);
  const { macro } = foodContext;

  return (
    <div className="food">
      {macro.name ? (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h1>{macro.name}</h1>
          <Container>
            <Row>
              <Col>Protien: {macro.Protien}</Col>
            </Row>
            <Row>
              <Col>Fat: {macro.Fat}</Col>
            </Row>
            <Row>
              <Col>Carbohydrate: {macro.Carbohydrate}</Col>
            </Row>
            <Row>
              <Col>Calories: {macro.Calories}</Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default Food;

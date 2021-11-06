import React, { useContext } from "react";
import AlertContext from "../../context/Alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      <div>
        <i />
        {alert.msg}
      </div>
    )
  );
};

export default Alert;

import React from "react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "black",
      background: "yellow",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    drone
  </div>
);

export default Marker;

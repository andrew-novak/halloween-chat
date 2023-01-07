import React from "react";

const Screen = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </div>
  );
};

export default Screen;

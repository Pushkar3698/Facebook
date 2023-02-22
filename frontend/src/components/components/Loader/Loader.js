import React from "react";

import "./Loader.css";

// const Loader = ({ login }) => (

// );

// import React from 'react'

const Loader = ({ login }) => {
  return (
    <div
      className="loader"
      style={{
        transform: `scale(${login ? "0.5" : "0"})`,
      }}
    >
      <div style={{ borderColor: `${login ? "white" : ""}` }} />
      <div style={{ borderColor: `${login ? "white" : ""}` }} />
      <div />
      <div />
    </div>
  );
};

export default Loader;
// export default Loader;

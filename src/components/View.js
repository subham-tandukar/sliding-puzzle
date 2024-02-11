import React from "react";

const View = ({ handleShowView }) => {
  return (
    <>
      <div
        uk-tooltip="Click Anywhere"
        className="view-overlay"
        onClick={handleShowView}
      ></div>
    </>
  );
};

export default View;

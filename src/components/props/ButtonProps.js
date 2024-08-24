import React from "react";

function ButtonProps({ label, color, onClick }) {
  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      {label}
    </button>
  );
}

export default ButtonProps;

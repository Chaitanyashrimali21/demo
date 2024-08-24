//Question: Create a Counter component that accepts initialCount and step props, and implements a counter with increment and decrement buttons.
import React, { useState } from 'react'




const CounterProp = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount);

  const buttonStyle = {
    margin: "0 5px",
    padding: "5px 10px",
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button style={buttonStyle} onClick={() => setCount(count + step)}>
        Increment
      </button>
      <button style={buttonStyle} onClick={() => setCount(count - step)}>
        Decrement
      </button>
    </div>
  );
};

export default CounterProp
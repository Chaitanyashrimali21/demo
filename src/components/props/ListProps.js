//Question: Create a List component that accepts an array of items as a prop and renders them as an unordered list.
import React from 'react'

function ListProps({items}) {
  const listStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
  };

  return (
    <ul style={listStyle}>
      {items?.map((item, index) => (
        <li key={index} style={listItemStyle}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ListProps

import React from 'react'

function CardProps({ title, content, imageUrl }) {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "10px",
    maxWidth: "300px",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const contentStyle = {
    padding: "15px",
  };
  return (
    <div style={cardStyle}>
      <img src={imageUrl} alt={title} style={imageStyle} />
      <div style={contentStyle}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CardProps
import React, { useState } from "react";

// Sample array of image URLs
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://example.com/image4.jpg",
  "https://example.com/image5.jpg",
];

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="image-gallery">
      <h2>Image Gallery</h2>
      <div className="gallery-container">
        <button onClick={goToPrevious}>&lt; Previous</button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ maxWidth: "500px", maxHeight: "500px" }}
        />
        <button onClick={goToNext}>Next &gt;</button>
      </div>
      <p>
        Image {currentIndex + 1} of {images.length}
      </p>
    </div>
  );
}

export default ImageGallery;

// import React, { useState } from "react";

// Sample array of image URLs
// const images = [
//   "https://picsum.photos/id/237/200/300",
//   "https://picsum.photos/seed/picsum/200/300",
//   "https://picsum.photos/200/300?grayscale",
//   "https://example.com/image4.jpg",
//   "https://example.com/image5.jpg",
// ];

// function ImageGallery() {
//   const[currentIndex , setCurrentIndex] =  useState();

//   const goToPrevious () =>{
//      setCurrentIndex
//   }
//   return (
//     <div className="image-gallery">
      
//     </div>
//   );
// }

// export default ImageGallery;

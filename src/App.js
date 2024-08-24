import React from "react";
import Propspractice from "./components/props/Propspractice"


function App() {
  
  return (
    <div className="App">
      {/* <h1>User Information</h1>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            <li>{user.name}</li>
            <li> {user.age}</li>
            <li> {user.hobbies[1]}</li>
          </li>
        ))}
      </ul> */}
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <li>{product.name}</li>
             <li>
              {product.category.main}
             </li>
          </li>
        ))}
      </ul> */}
      {/* {<CounterButton/>} */}
      {/* <TodoList /> */}
      {/* <Form/>  */}
      {/* <ImageGallery/> */}
      <Propspractice />
    </div>
  );
}

export default App;



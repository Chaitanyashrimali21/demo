import React from "react";
import ButtonProps from "./ButtonProps";
import UserProps from "./UserProps";
import ListProps from "./ListProps";
import CounterProp from "./CounterProp";
import CardProps from "./CardProps";

function Propspractice() {
 const users = [
   { name: "John Doe", email: "john@example.com" },
   { name: "Jane Smith", email: "jane@example.com" },
 ];

 const fruits = ["Apple", "Banana", "Cherry", "Date"];
  return (
    <div>
      {/* <GreetingProps name={"rahul"}/> */}
      {/* <div>
          <ButtonProps
            label={"click me"}
            color={"blue"}
            onClick={() => alert("Button clicked")}
          />
          <ButtonProps
            label={"save me"}
            color={"red"}
            onClick={() => console.log("Submitted")}
          />
        </div> */}
      {/* {users.map((user, index) => (
        <UserProps key={index} user={user} />
      ))} */}

      {/* <ListProps  items={fruits} /> */}
      {/* <CounterProp initialCount={0} step={1}/>
      <CounterProp initialCount={10} step={5}/> */}

      <CardProps
        title="React Props"
        content="Learn about React props and how to use them effectively."
        imageUrl="https://via.placeholder.com/300x200.png?text=React+Props"
      />
    </div>
  );
}

export default Propspractice;

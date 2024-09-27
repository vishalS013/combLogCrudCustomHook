import React from "react";
import UseApi from "./contexts/authContext/UseApi";

const Fetch = () => {
  const [data] = UseApi("https://jsonplaceholder.typicode.com/todos");
  const [cardsdata] = UseApi("https://jsonplaceholder.typicode.com/posts");
  return (
    <div className="!mt-10  flex justify-evenly text-white  left-0">
      <div>
        {data &&
          data.slice(0, 10).map((item) => {
            return <p key={item.id}><span className="text-white">{item.id-1 + 1}</span> . {item.title}</p>;
          })}
      </div>
      <div className="text-white w-[500px] overflow-auto">
        {cardsdata &&
          cardsdata.slice(0, 10).map((card) => {
            return <p>{card.id-1 + 1} . {card.title}</p>;
          })}
      </div>
    </div>
  );
};

export default Fetch;

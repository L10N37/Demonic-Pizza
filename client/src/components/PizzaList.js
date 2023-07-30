import React from 'react';

const PizzaList = ({ pizzas }) => {
  return (
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza._id}>
          <h2>{pizza.name}</h2>
          <p>{pizza.ingredients}</p>
          <p>{pizza.description}</p>
          <p>${pizza.price}</p>
          <img src={pizza.image} alt={pizza.name} />
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

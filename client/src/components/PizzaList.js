import React from 'react';

const PizzaList = ({ pizzas }) => {
  return (
    <div>
      <h2>Pizzas</h2>
      {pizzas.map((pizza) => (
        <div key={pizza._id}>
          <h3>{pizza.name}</h3>
          <img src={`/assets/images/pizzas/${pizza.image}`} alt={pizza.name} />
          <p>{pizza.description}</p>
          <p>Price: ${pizza.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

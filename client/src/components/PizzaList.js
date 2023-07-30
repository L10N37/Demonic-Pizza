import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../utils/queries';
import { pizzaImages } from '../assets/js';

const PizzaList = () => {
  const { loading, data } = useQuery(GET_PIZZAS);

  if (loading) return <p>Loading...</p>;

  const pizzas = data ? data.pizzas : [];

  return (
    <div className="menuItems">
      {pizzas.map((pizza) => (
        <div className="menuCard" key={pizza._id}>
          <img src={pizzaImages[pizza.name]} className="menuItemPicture" alt={pizza.name} />
          <h2>{pizza.name}</h2>
          <p>{pizza.ingredients}</p>
          <p>{pizza.description}</p>
          <p>${pizza.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;
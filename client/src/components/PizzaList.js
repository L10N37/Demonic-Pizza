import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../utils/queries';

const PizzaList = () => {
  const { loading, data } = useQuery(GET_PIZZAS);

  if (loading) return <p>Loading...</p>;

  const pizzas = data ? data.pizzas : [];

  return (
    <div className="menuItems">
      {pizzas.map((pizza) => (
        <div className="menuCard" key={pizza._id}>
          <img src={pizza.image} className="menuItemPicture" alt={pizza.name} />
          <h2>{pizza.name}</h2>
          <p className="ingredientsText">{pizza.ingredients.join(', ')}</p>
          <p className="menuItemDescription">{pizza.description}</p>
          <p className="priceText">${pizza.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

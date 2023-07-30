import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../utils/queries';

const PizzaList = () => {
  const { loading, data } = useQuery(GET_PIZZAS);

  if (loading) return <p>Loading...</p>;

  const pizzas = data ? data.pizzas : [];

  return (
    <div>
      <h2>Pizzas</h2>
      {pizzas.map((pizza) => (
        <div key={pizza._id}>
          <h3>{pizza.name}</h3>
          <p>{pizza.description}</p>
          <p>Price: ${pizza.price}</p>
          {/* Render other pizza details */}
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

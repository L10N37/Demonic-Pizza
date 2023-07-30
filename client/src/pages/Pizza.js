import React from 'react';
import PizzaList from '../components/PizzaList';

const Pizza = () => {
  return (
    <div>
      <h1>Pizzas</h1>
      <PizzaList /> {/* sideList component */}
    </div>
  );
};

export default Pizza;
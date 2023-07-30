import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS, GET_PASTAS, GET_SIDES } from '../utils/queries';
import PizzaList from '../components/PizzaList';
import PastaList from '../components/PastaList';
import SideList from '../components/SideList';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const { loading: pizzaLoading, data: pizzaData } = useQuery(GET_PIZZAS);
  const { loading: pastaLoading, data: pastaData } = useQuery(GET_PASTAS);
  const { loading: sideLoading, data: sideData } = useQuery(GET_SIDES);

  if (pizzaLoading || pastaLoading || sideLoading) return <p>Loading...</p>;

  // Add a check for the data objects before trying to access their properties
  if (!pizzaData || !pastaData || !sideData) return <p>Error loading data</p>;

  let activeContent;
  if (activeCategory === 'Pizza') {
    activeContent = <PizzaList pizzas={pizzaData.pizzas} />;
  } else if (activeCategory === 'Pasta') {
    activeContent = <PastaList pastas={pastaData.pastas} />;
  } else if (activeCategory === 'Sides') {
    activeContent = <SideList sides={sideData.sides} />;
  }

  return (
    <div>
      <div className="buttonContainer">
        <button
          onClick={() => setActiveCategory('Pizza')}
          className={`button ${activeCategory === 'Pizza' ? 'active' : ''}`}
        >
          Pizza
        </button>
        <button
          onClick={() => setActiveCategory('Pasta')}
          className={`button ${activeCategory === 'Pasta' ? 'active' : ''}`}
        >
          Pasta
        </button>
        <button
          onClick={() => setActiveCategory('Sides')}
          className={`button ${activeCategory === 'Sides' ? 'active' : ''}`}
        >
          Sides
        </button>
      </div>
      {activeContent}
    </div>
  );
};

export default Home;

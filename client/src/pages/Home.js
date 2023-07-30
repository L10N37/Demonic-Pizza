import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS, GET_PASTAS, GET_SIDES } from '../utils/queries';
import PizzaList from '../components/PizzaList';
import PastaList from '../components/PastaList';
import SideList from '../components/SideList';

const Home = () => {
  const { loading: pizzaLoading, data: pizzaData } = useQuery(GET_PIZZAS);
  const { loading: pastaLoading, data: pastaData } = useQuery(GET_PASTAS);
  const { loading: sideLoading, data: sideData } = useQuery(GET_SIDES);

  if (pizzaLoading || pastaLoading || sideLoading) return <p>Loading...</p>;

  // Add a check for the data objects before trying to access their properties
  if (!pizzaData || !pastaData || !sideData) return <p>Error loading data</p>;

  return (
    <div>
      <img src="/assets/logo.png" alt="Logo" />
      <PizzaList pizzas={pizzaData.pizzas} />
      <PastaList pastas={pastaData.pastas} />
      <SideList sides={sideData.sides} />
    </div>
  );
};

export default Home;

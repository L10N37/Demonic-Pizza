import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS, GET_PASTAS, GET_SIDES } from '../utils/queries';
import PizzaList from '../components/PizzaList';
import PastaList from '../components/PastaList';
import SideList from '../components/SideList';
import Cart from '../components/Cart';
import { CartContext } from '../contexts/CartContext';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const { loading: pizzaLoading, data: pizzaData } = useQuery(GET_PIZZAS);
  const { loading: pastaLoading, data: pastaData } = useQuery(GET_PASTAS);
  const { loading: sideLoading, data: sideData } = useQuery(GET_SIDES);

  const [cart, setCart] = useState([]); // Local state for cart items

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  if (pizzaLoading || pastaLoading || sideLoading) return <p>Loading...</p>;

  if (!pizzaData || !pastaData || !sideData) return <p>Error loading data</p>;

  // Helper function to calculate pizza price with crust and extras
  const calculatePizzaPrice = (pizza) => {
    const crustPrice = pizza.crust ? pizza.crust.price || 0 : 0;
    const extrasPrice = pizza.extras ? pizza.extras.reduce((total, extra) => total + (extra.price || 0), 0) : 0;
    return pizza.price + crustPrice + extrasPrice;
  };

  let activeContent;
  if (activeCategory === 'Pizza') {
    activeContent = (
      <PizzaList
        pizzas={pizzaData.pizzas.map((pizza) => ({
          ...pizza,
          price: calculatePizzaPrice(pizza),
        }))}
        addToCart={addToCart}
      />
    );
  } else if (activeCategory === 'Pasta') {
    activeContent = <PastaList pastas={pastaData.pastas} addToCart={addToCart} />;
  } else if (activeCategory === 'Sides') {
    activeContent = <SideList sides={sideData.sides} addToCart={addToCart} />;
  } else if (activeCategory === 'Cart') {
    activeContent = <Cart />;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
          <button
            onClick={() => setActiveCategory('Cart')}
            className={`button ${activeCategory === 'Cart' ? 'active' : ''}`}
          >
            Cart
          </button>
        </div>
        {activeContent}
      </div>
    </CartContext.Provider>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS, GET_CRUSTS, GET_EXTRAS } from '../utils/queries';

const PizzaList = ({ addToCart }) => {
  const { loading: pizzaLoading, data: pizzaData } = useQuery(GET_PIZZAS);
  const { loading: crustLoading, data: crustData } = useQuery(GET_CRUSTS);
  const { loading: extraLoading, data: extraData } = useQuery(GET_EXTRAS);

  const [selectedCrusts, setSelectedCrusts] = useState({});
  const [selectedExtras, setSelectedExtras] = useState({});
  const [totalPrices, setTotalPrices] = useState({});

  const handleExtraChange = (pizzaId, extraName, isChecked) => {
    setSelectedExtras(prevExtras => {
      const previousExtrasForPizza = prevExtras[pizzaId] || [];
      if (isChecked) {
        return { ...prevExtras, [pizzaId]: [...previousExtrasForPizza, extraName] };
      } else {
        return { ...prevExtras, [pizzaId]: previousExtrasForPizza.filter(extra => extra !== extraName) };
      }
    });
  };

  useEffect(() => {
    const prices = {};

    Object.keys(selectedCrusts).forEach(key => {
      const pizza = pizzaData.pizzas.find(pizza => pizza._id === key);
      const crust = crustData.crusts.find(crust => crust.name === selectedCrusts[key]);
      const extras = selectedExtras[key] ? selectedExtras[key].map(extraName => extraData.extras.find(extra => extra.name === extraName)) : [];

      const extrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);

      // round to 2 decimal places
      const totalPrice = parseFloat((pizza.price + (crust ? crust.price : 0) + extrasPrice).toFixed(2));

      prices[key] = totalPrice;
    });

    setTotalPrices(prices);
  }, [selectedCrusts, selectedExtras, pizzaData, crustData, extraData]);

  const handleAddToCart = (pizza) => {
    const crust = selectedCrusts[pizza._id];
    const extras = selectedExtras[pizza._id] || [];
    const totalPrice = totalPrices[pizza._id] || pizza.price;

    if (!crust) {
      alert('Please select a crust before adding to cart.');
      return;
    }

    addToCart({
      pizza: {
        id: pizza._id,
        name: pizza.name,
      },
      crust,
      extras,
      totalPrice,
    });
  };

  if (pizzaLoading || crustLoading || extraLoading) return <p>Loading...</p>;

  const pizzas = pizzaData ? pizzaData.pizzas : [];
  const crusts = crustData ? crustData.crusts : [];
  const extras = extraData ? extraData.extras : [];

  return (
    <div className="menuItems">
      {pizzas.map((pizza) => (
        <div className="menuCard" key={pizza._id}>
          <img src={pizza.image} className="menuItemPicture" alt={pizza.name} />
          <h2>{pizza.name}</h2>
          <p className="ingredientsText">{pizza.ingredients.join(', ')}</p>
          <p className="menuItemDescription">{pizza.description}</p>
          <p className="priceText">${totalPrices[pizza._id] || pizza.price}</p>

          <div>
            <label>Select a crust </label>
            <select value={selectedCrusts[pizza._id] || ''} onChange={e => setSelectedCrusts({ ...selectedCrusts, [pizza._id]: e.target.value })}>
              <option value=''>Select...</option>
              {crusts.map(crust => <option key={crust._id} value={crust.name}>{crust.name} (+${crust.price})</option>)}
            </select>
          </div>
          <br></br>
          <div>
            <label>Select extras</label>
            {extras.map(extra => (
              <div key={extra._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedExtras[pizza._id] ? selectedExtras[pizza._id].includes(extra.name) : false}
                    onChange={e => handleExtraChange(pizza._id, extra.name, e.target.checked)}
                  />
                  {extra.name} (+${extra.price})
                </label>
              </div>
            ))}
          </div>

          <button onClick={() => handleAddToCart(pizza)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

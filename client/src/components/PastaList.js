import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PASTAS } from '../utils/queries';
import { CartContext } from '../contexts/CartContext'; // Import CartContext

const PastaList = () => {
  const { loading, data } = useQuery(GET_PASTAS);
  const { addToCart } = useContext(CartContext); // Get the addToCart function from CartContext

  if (loading) return <p>Loading...</p>;

  const pastas = data ? data.pastas : [];

  const handleAddToCart = (pasta) => {
    addToCart({
      pasta: {
        id: pasta._id,
        name: pasta.name,
      },
      totalPrice: pasta.price,
    });
  };

  return (
    <div className="menuItems">
      {pastas.map((pasta) => (
        <div className="menuCard" key={pasta._id}>
          <img src={pasta.image} className="menuItemPicture" alt={pasta.name} />
          <h2>{pasta.name}</h2>
          <p className="ingredientsText">{pasta.ingredients.join(', ')}</p>
          <p className="menuItemDescription">{pasta.description}</p>
          <p className="priceText">${pasta.price}</p>
          <button onClick={() => handleAddToCart(pasta)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default PastaList;

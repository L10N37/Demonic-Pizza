import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIDES } from '../utils/queries';
import { CartContext } from '../contexts/CartContext'; // Import CartContext

const SideList = () => {
  const { loading, data } = useQuery(GET_SIDES);
  const { addToCart } = useContext(CartContext); // Get the addToCart function from CartContext

  if (loading) return <p>Loading...</p>;

  const sides = data ? data.sides : [];

  const handleAddToCart = (side) => {
    addToCart({
      side: {
        id: side._id,
        name: side.name,
      },
      totalPrice: side.price,
    });
  };

  return (
    <div className="menuItems">
      {sides.map((side) => (
        <div className="menuCard" key={side._id}>
          <img src={side.image} className="menuItemPicture" alt={side.name} />
          <h2>{side.name}</h2>
          <p className="menuItemDescription">{side.description}</p>
          <p className="priceText">${side.price}</p>
          <button onClick={() => handleAddToCart(side)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SideList;

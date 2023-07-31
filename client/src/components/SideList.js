import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIDES } from '../utils/queries';
import { useStoreContext } from '../contexts/CartContext';

const SideList = () => {
  const { loading, data } = useQuery(GET_SIDES);
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  if (loading) return <p>Loading...</p>;

  const sides = data ? data.sides : [];

  const handleAddToCart = (side) => {
    dispatch({
      type: 'ADD_TO_CART',
      product: {
        id: side._id,
        name: side.name,
        totalPrice: side.price,
      },
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

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIDES } from '../utils/queries';

const SideList = () => {
  const { loading, data } = useQuery(GET_SIDES);

  if (loading) return <p>Loading...</p>;

  const sides = data ? data.sides : [];

  return (
    <div className="menuItems">
      {sides.map((side) => (
        <div className="menuCard" key={side._id}>
          <img src={side.image} className="menuItemPicture" alt={side.name} />
          <h2>{side.name}</h2>
          <p className="menuItemDescription">{side.description}</p>
          <p className="priceText">${side.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SideList;

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIDES } from '../utils/queries';

const SideList = () => {
  const { loading, data } = useQuery(GET_SIDES);

  if (loading) return <p>Loading...</p>;

  const sides = data ? data.sides : [];

  return (
    <div>
      <h2>Sides</h2>
      {sides.map((side) => (
        <div key={side._id}>
          <h3>{side.name}</h3>
          <p>{side.description}</p>
          <p>Price: ${side.price}</p>
          {/* Render other side details */}
        </div>
      ))}
    </div>
  );
};

export default SideList;

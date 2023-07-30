import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PASTAS } from '../utils/queries';

const PastaList = () => {
  const { loading, data } = useQuery(GET_PASTAS);

  if (loading) return <p>Loading...</p>;

  const pastas = data ? data.pastas : [];

  return (
    <div className="menuItems">
      {pastas.map((pasta) => (
        <div className="menuCard" key={pasta._id}>
          <img src={pasta.image} className="menuItemPicture" alt={pasta.name} />
          <h2>{pasta.name}</h2>
          <p className="ingredientsText">{pasta.ingredients.join(', ')}</p>
          <p className="menuItemDescription">{pasta.description}</p>
          <p className="priceText">${pasta.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PastaList;

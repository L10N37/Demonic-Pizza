import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PASTAS } from '../utils/queries';
import { pastaImages } from '../assets/js';

const PastaList = () => {
  const { loading, data } = useQuery(GET_PASTAS);

  if (loading) return <p>Loading...</p>;

  const pastas = data ? data.pastas : [];

  return (
    <div className="menuItems">
      {pastas.map((pasta) => (
        <div className="menuCard" key={pasta._id}>
          <img src={pastaImages[pasta.name]} className="menuItemPicture" alt={pasta.name} />
          <h2>{pasta.name}</h2>
          <p>{pasta.ingredients}</p>
          <p>{pasta.description}</p>
          <p>${pasta.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PastaList;

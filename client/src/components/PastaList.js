import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PASTAS } from '../utils/queries';

const PastaList = () => {
  const { loading, data } = useQuery(GET_PASTAS);

  if (loading) return <p>Loading...</p>;

  const pastas = data ? data.pastas : [];

  return (
    <div>
      <h2>Pastas</h2>
      {pastas.map((pasta) => (
        <div key={pasta._id}>
          <h3>{pasta.name}</h3>
          <p>{pasta.ingredients}</p>
          <p>{pasta.description}</p>
          <p>${pasta.price}</p>
          {/* Render other pasta details */}
        </div>
      ))}
    </div>
  );
};

export default PastaList;

import React, { useState, useEffect } from 'react';
import carData from '../data/taladrod-cars.json';

function CarTable() {
  const [expandedModel, setExpandedModel] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Create a lookup for MkID to Brand Name
  const mkIDLookup = carData.MMList.reduce((acc, item) => {
    acc[item.mkID] = item.Name;
    return acc;
  }, {});

  // Group cars by MkID and Model
  const brandModelData = carData.Cars.reduce((acc, car) => {
    const { MkID, Model, NameMMT, Prc, Cid } = car;
    const brandName = mkIDLookup[MkID];

    if (!acc[brandName]) {
      acc[brandName] = {};
    }

    if (!acc[brandName][Model]) {
      acc[brandName][Model] = [];
    }

    acc[brandName][Model].push({ NameMMT, Prc, Cid });

    return acc;
  }, {});

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRowClick = (model) => {
    setExpandedModel(expandedModel === model ? null : model);
  };

  const handleFavoriteToggle = (carId) => {
    const updatedFavorites = favorites.includes(carId)
      ? favorites.filter(id => id !== carId)
      : [...favorites, carId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '16px' }}>
      <thead>
        <tr style={{ backgroundColor: '#333', color: '#fff' }}>
          <th style={{ textAlign: 'left', padding: '10px' }}>Model</th>
          <th style={{ textAlign: 'center', padding: '10px' }}>Count</th>
          <th style={{ textAlign: 'center', padding: '10px' }}>Total Value (Baht)</th>
          <th style={{ textAlign: 'center', padding: '10px' }}>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(brandModelData).map(brandName => (
          <>
            <tr key={brandName} style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
              <td colSpan="4" style={{ padding: '10px' }}>{brandName}</td>
            </tr>
            {Object.keys(brandModelData[brandName]).map(model => (
              <>
                <tr 
                  key={model} 
                  onClick={() => handleRowClick(model)} 
                  style={{ 
                    backgroundColor: expandedModel === model ? '#e0e0e0' : '#fff', 
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                    transition: 'background-color 0.3s' 
                  }}
                >
                  <td style={{ padding: '10px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#333' }}>
                    {model} 
                    <span style={{ marginLeft: 'auto', fontSize: '14px' }}>
                      {expandedModel === model ? '▼' : '▶'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>{brandModelData[brandName][model].length}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}></td> 
                  <td style={{ textAlign: 'center', padding: '10px' }}></td> 
                </tr>
                {expandedModel === model && brandModelData[brandName][model].map((car, index) => (
                  <tr key={`${model}-${index}`} style={{ backgroundColor: '#444', color: '#fff' }}>
                    <td style={{ padding: '10px' }} colSpan="2">{car.NameMMT}</td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      {parseInt(car.Prc.replace(/,/g, '')).toLocaleString()} Baht
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <button onClick={() => handleFavoriteToggle(car.Cid)}>
                        {favorites.includes(car.Cid) ? '★' : '☆'}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default CarTable;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import carData from '../data/taladrod-cars.json';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6F61', '#6B5B95', '#88B04B'];

function StackedBarChartComponent() {
  // Prepare data for StackedBarChart
  const brandModelCounts = carData.Cars.reduce((acc, car) => {
    const brand = carData.MMList.find(brand => brand.mkID === car.MkID).Name;
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = {};
    }

    if (!acc[brand][model]) {
      acc[brand][model] = 0;
    }

    acc[brand][model] += 1;

    return acc;
  }, {});

  // Convert the brandModelCounts object into an array format that Recharts can use
  const barData = Object.keys(brandModelCounts).map(brand => ({
    name: brand,
    ...brandModelCounts[brand],
  }));

  // Get all unique models to use as data keys for the bars
  const allModels = [...new Set(carData.Cars.map(car => car.Model))];

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height={500}> {/* Increased height for a bigger chart */}
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} background={{ fill: '#ffffff' }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax + 10']} /> {/* Set the domain to fit your data range */}
          <Tooltip />
          <Legend />
          {allModels.map((model, index) => (
            <Bar key={index} dataKey={model} stackId="a" fill={COLORS[index % COLORS.length]} barSize={40} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StackedBarChartComponent;

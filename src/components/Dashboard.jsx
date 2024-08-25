import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CarTable from './CarTable';
import PieChartComponent from './PieChart';
import StackedBarChartComponent from './StackedBarChart';
import { Link } from 'react-router-dom';  
import carData from '../data/taladrod-cars.json';

function Dashboard() {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brandCounts = carData.Cars.reduce((acc, car) => {
    const brandName = carData.MMList.find(brand => brand.mkID === car.MkID).Name;
    acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(brandCounts).map(brand => ({
    name: brand,
    value: brandCounts[brand],
  }));

  const handleLegendClick = (data) => {
    const brand = data.payload.name;
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const adjustedPieData = pieData.map(brand => ({
    ...brand,
    value: selectedBrands.includes(brand.name) ? 0 : brand.value,
    fill: selectedBrands.includes(brand.name) ? '#E0E0E0' : null,
  }));

  return (
    <Box 
      p={3} 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between" 
      height="100vh" 
      style={{ backgroundColor: '#000', color: '#fff' }} // Set background to black and text to white
    >
      <Box mb={2}>
        <Link 
          to="/dashboard" 
          style={{ marginRight: '20px', textDecoration: 'none', color: 'white' }} // Change link color to white
        >
          Dashboard
        </Link>
        <Link 
          to="/highlighted" 
          style={{ textDecoration: 'none', color: 'white' }} // Change link color to white
        >
          Highlight
        </Link>
      </Box>

      <Typography variant="h4" gutterBottom>Car Dashboard</Typography>

      <Box mt={5} flexGrow={1}>
        <CarTable />
      </Box>

      <Box mt={8}>
        <Typography variant="h5" gutterBottom>Pie Chart of Car Brands</Typography>
        <PieChartComponent data={adjustedPieData} onLegendClick={handleLegendClick} />
      </Box>

      <Box mt={8} flexGrow={1}>
        <Typography variant="h5" gutterBottom>Stacked Bar Chart of Car Brands and Models</Typography>
        <StackedBarChartComponent />
      </Box>
    </Box>
  );
}

export default Dashboard;

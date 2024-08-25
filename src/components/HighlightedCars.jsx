import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import carData from '../data/taladrod-cars.json';

const HighlightedCars = () => {
  const [favorites, setFavorites] = useState([]);
  const [carDetails, setCarDetails] = useState([]);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    const selectedCars = carData.Cars.filter(car => storedFavorites.includes(car.Cid));
    setCarDetails(selectedCars);
  }, []);

  const handleRemoveFavorite = (carId) => {
    const updatedFavorites = favorites.filter(id => id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setCarDetails(carDetails.filter(car => car.Cid !== carId));
  };

  const isHighlightedPage = location.pathname === '/highlighted';

  return (
    <Box p={3} display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
      <Box mb={2} style={{ backgroundColor: isHighlightedPage ? 'black' : 'transparent', padding: '10px', borderRadius: '5px' }}>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: isHighlightedPage ? 'white' : '#000' }}>
          <Typography variant="h6" component="span">Dashboard</Typography>
        </Link>
        <Link to="/highlighted" style={{ textDecoration: 'none', color: isHighlightedPage ? 'white' : '#000', borderBottom: isHighlightedPage ? '2px solid white' : 'none' }}>
          <Typography variant="h6" component="span">Highlighted</Typography>
        </Link>
      </Box>

      <Typography variant="h4" gutterBottom style={{ color: isHighlightedPage ? 'white' : '#000' }}>Highlighted Cars</Typography>
      <Grid container spacing={3} flexGrow={1}>
        {carDetails.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.Cid}>
            <Card style={{ width: '300px', height: 'auto' }}> {/* Set the desired width and auto height */}
              <CardMedia
                component="img"
                image={car.Img300}
                alt={car.Model}
                style={{ height: '150px', objectFit: 'cover' }} // Shorter height for the image
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {car.Model} - {car.Province}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {car.NameMMT}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  Year: {car.Yr}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  Price: {parseInt(car.Prc.replace(/,/g, '')).toLocaleString()} Baht
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveFavorite(car.Cid)}>
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightedCars;

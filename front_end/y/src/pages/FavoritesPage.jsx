import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/users/${userId}/favorites`)
        .then((response) => {
          console.log("Favorites fetched:", response.data.favorites);
          setFavorites(response.data.favorites);
        })
        .catch((err) => console.error("Failed to fetch favorites:", err));
    }
  }, [userId]);

  return (
    <Box padding={3} sx={{ maxWidth: 900, mx: "auto" }}>
      <IconButton onClick={() => navigate("/")} sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((flashcard) => (
          <Grid item key={flashcard.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`${BASE_URL}${flashcard.picture}`}
                alt={flashcard.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {flashcard.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesPage;

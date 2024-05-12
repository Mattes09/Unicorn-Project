import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const Flashcard = ({ card, userId }) => {
  const playAudio = () => {
    const audio = new Audio(`${BASE_URL}${card.audio}`);
    audio.play();
  };

  const toggleFavorite = () => {
    if (!userId) {
      console.error("No user ID provided");
      return;
    }

    axios
      .post(
        `${BASE_URL}/users/${userId}/favorites`,
        { flashcardId: card.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Favorite updated:", response.data);
        // Optionally refresh or update UI here
      })
      .catch((error) => {
        console.error("Error toggling favorite:", error);
      });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        width="100%"
        image={`${BASE_URL}${card.picture}`}
        alt={card.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pronunciation: {card.pronunciation}
        </Typography>
        <IconButton onClick={playAudio}>
          <VolumeUpIcon />
        </IconButton>
        <IconButton onClick={toggleFavorite}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default Flashcard;

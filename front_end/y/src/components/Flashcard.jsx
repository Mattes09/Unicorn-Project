import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Flashcard = ({ card }) => {
  const playAudio = () => {
    const audio = new Audio(`http://localhost:3000${card.audio}`);
    audio.play();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        width="100%"
        image={`http://localhost:3000${card.picture}`}
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
        <VolumeUpIcon onClick={playAudio} sx={{ cursor: "pointer" }} />
      </CardContent>
    </Card>
  );
};

export default Flashcard;

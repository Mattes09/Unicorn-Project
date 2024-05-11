import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Make sure this is correct and has no trailing slash

const PairsPage = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pairs/cards`)
      .then((response) => {
        const fetchedCards = response.data.getGameCards.map((card) => ({
          ...card,
          isFlipped: false,
        }));
        setCards(fetchedCards);
      })
      .catch((error) => console.error("Error fetching pairs cards:", error));
  }, []);

  const handleCardClick = (index) => {
    const newFlippedIndices = [...flippedIndices, index];
    const newCards = cards.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      const matchQuery = {
        id1: cards[newFlippedIndices[0]].id,
        id2: cards[newFlippedIndices[1]].id,
      };
      axios
        .post(`${BASE_URL}/pairs/check-match`, matchQuery)
        .then((response) => {
          if (!response.data.isMatch) {
            setTimeout(() => {
              setCards((prevCards) =>
                prevCards.map((card) => ({ ...card, isFlipped: false }))
              );
            }, 1000);
          }
          setFlippedIndices([]);
        })
        .catch((error) => console.error("Error checking match:", error));
    } else {
      setFlippedIndices(newFlippedIndices);
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Match the Cards!
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Card variant="outlined">
              <CardActionArea onClick={() => handleCardClick(index)}>
                {card.isFlipped ? (
                  card.type === "image" ? (
                    <CardMedia
                      component="img"
                      image={`http://localhost:3000${card.content}`}
                      alt={card.name}
                      title={card.name}
                      sx={{ height: 140, objectFit: "contain" }}
                    />
                  ) : (
                    <CardContent
                      sx={{
                        height: 140,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5">{card.content}</Typography>
                    </CardContent>
                  )
                ) : (
                  <CardContent
                    sx={{
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      Card Back
                    </Typography>
                  </CardContent>
                )}
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PairsPage;

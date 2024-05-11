import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const PairsPage = () => {
  const navigate = useNavigate();
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
        console.log("Fetched cards:", fetchedCards);
        setCards(fetchedCards);
      })
      .catch((error) => {
        console.error("Error fetching pairs cards:", error);
      });
  }, []);

  const handleCardClick = (index) => {
    const card = cards[index];
    if (card.isMatched || card.isFlipped) {
      return; // Ignore clicks on matched or already flipped cards
    }

    const newFlippedIndices = [...flippedIndices, index];
    const newCards = cards.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    console.log("Cards after flip:", newCards);

    if (newFlippedIndices.length === 2) {
      const id1 = cards[newFlippedIndices[0]].id;
      const id2 = cards[newFlippedIndices[1]].id;
      axios
        .post(`${BASE_URL}/pairs/check-match`, { id1, id2 })
        .then((response) => {
          if (response.data.isMatch) {
            console.log("Match found between:", id1, "and", id2);
            const updatedCards = newCards.map((card) =>
              newFlippedIndices.includes(cards.indexOf(card))
                ? { ...card, isMatched: true }
                : card
            );
            setCards(updatedCards);
            console.log("Cards after confirming match:", updatedCards);
          } else {
            console.log("No match:", id1, "and", id2);
            setTimeout(() => {
              const updatedCards = newCards.map((card) =>
                newFlippedIndices.includes(cards.indexOf(card))
                  ? { ...card, isFlipped: false }
                  : card
              );
              setCards(updatedCards);
              console.log("Cards after flipping back:", updatedCards);
            }, 1000);
          }
          setFlippedIndices([]);
        })
        .catch((error) => {
          console.error("Error checking match:", error);
        });
    } else {
      setFlippedIndices(newFlippedIndices);
      console.log("Waiting for second card to flip...");
    }
  };

  return (
    <Box padding={3}>
      <IconButton onClick={() => navigate("/")} sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Match the Cards!
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Card variant="outlined">
              <CardActionArea onClick={() => handleCardClick(index)}>
                {card.isFlipped || card.isMatched ? (
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

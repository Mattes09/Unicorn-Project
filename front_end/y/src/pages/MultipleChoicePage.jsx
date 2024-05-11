import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { getItems } from "../api";

const MultipleChoicePage = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getItems();
      setCards(data);
      generateOptions(data[0], data);
    };
    fetchData();
  }, []);

  const generateOptions = (correctCard, allCards) => {
    const options = [correctCard];
    while (options.length < 4) {
      const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
      if (!options.some((card) => card.id === randomCard.id)) {
        options.push(randomCard);
      }
    }
    setOptions(options.sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (option) => {
    if (option.id === cards[currentCardIndex].id) {
      setScore(score + 1);
    }
    const nextIndex = currentCardIndex + 1;
    if (nextIndex < cards.length) {
      setCurrentCardIndex(nextIndex);
      generateOptions(cards[nextIndex], cards);
    } else {
      alert(`Well done! Your score is ${score + 1}`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <Typography variant="h2" gutterBottom>
        Multiple Choice
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {options.map((option) => (
          <Grid item key={option.id}>
            <Button
              variant="contained"
              onClick={() => handleOptionClick(option)}
            >
              {option.word}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MultipleChoicePage;

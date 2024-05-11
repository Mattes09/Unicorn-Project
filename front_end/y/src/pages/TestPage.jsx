import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { getItems } from "../api";

const TestPage = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getItems();
      setCards(data);
    };
    fetchData();
  }, []);

  const handleCheck = () => {
    if (
      userInput.toLowerCase() === cards[currentCardIndex].word.toLowerCase()
    ) {
      setScore(score + 1);
      setUserInput("");
      const nextIndex = currentCardIndex + 1;
      if (nextIndex < cards.length) {
        setCurrentCardIndex(nextIndex);
      } else {
        alert(`Well done! Your score is ${score + 1}`);
      }
    } else {
      alert("Try again!");
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
        Test Your Knowledge
      </Typography>
      {cards[currentCardIndex] && (
        <>
          <Typography variant="h4">{cards[currentCardIndex].word}</Typography>
          <TextField
            label="Guess the word"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleCheck}>
            Check
          </Button>
        </>
      )}
    </Box>
  );
};

export default TestPage;

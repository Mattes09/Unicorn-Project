import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Adjust according to your setup

const JumbledLettersPage = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jumbled-letters/card`);
      setCard(response.data);
      setUserInput("");
      setMessage("");
    } catch (error) {
      console.error("Error fetching jumbled word:", error);
      setMessage("Failed to fetch a new word. Please try again.");
    }
  };

  const handleCheck = async () => {
    if (!card) return;
    try {
      const response = await axios.post(
        `${BASE_URL}/jumbled-letters/check-answer`,
        {
          id: card.id,
          userAnswer: userInput,
        }
      );
      if (response.data.isCorrect) {
        setMessage("Correct! Well done!");
        fetchCard(); // Fetch a new card
      } else {
        setMessage("Incorrect, try again!");
      }
    } catch (error) {
      console.error("Error checking answer:", error);
      setMessage("Error checking the answer. Please try again.");
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
      <IconButton onClick={() => navigate("/")} sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h2" gutterBottom>
        Jumbled Letters
      </Typography>
      {card && (
        <Box textAlign="center">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={`${BASE_URL}${card.picture}`}
              alt={card.name}
              sx={{ height: 140, objectFit: "contain" }}
            />
          </Card>
          <Typography variant="h4">{card.scrambleWord}</Typography>
        </Box>
      )}
      <TextField
        label="Guess the word"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" onClick={handleCheck} sx={{ mt: 2 }}>
        Check
      </Button>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default JumbledLettersPage;

import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import Flashcard from "../components/Flashcard";
import { getFlashcards } from "../api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFlashcards();
      setFlashcards(data);
    };
    fetchData();
  }, []);

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
        Flashcards
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {flashcards.map((card) => (
          <Grid item key={card.id}>
            <Flashcard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlashcardsPage;

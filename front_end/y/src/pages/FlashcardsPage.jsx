import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Flashcard from "../components/Flashcard";
import { getFlashcards } from "../api";

const FlashcardsPage = () => {
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

import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GamesIcon from "@mui/icons-material/Games";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" gutterBottom>
        Learn English with Flashcards
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<SchoolIcon />}
            onClick={() => navigate("/flashcards")}
          >
            Start Learning
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<GamesIcon />}
            onClick={() => navigate("/activities")}
          >
            Learning Activities
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<QuizIcon />}
            onClick={() => navigate("/test")}
          >
            Test Your Knowledge
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

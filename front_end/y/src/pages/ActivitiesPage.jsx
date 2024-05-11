// src/pages/ActivitiesPage.jsx
import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActivitiesPage = () => {
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
        Learning Activities
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/pairs")}>
            Pairs
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate("/jumbled-letters")}
          >
            Jumbled Letters
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate("/multiple-choice")}
          >
            Multiple Choice
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivitiesPage;

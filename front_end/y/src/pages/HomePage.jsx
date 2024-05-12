import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GamesIcon from "@mui/icons-material/Games";
import QuizIcon from "@mui/icons-material/Quiz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => setUsers(response.data.users))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

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
        <Grid item>
          <Button
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={() => navigate(`/favorites/${selectedUserId}`)}
          >
            Favorites
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Select a User
      </Typography>
      <select onChange={(e) => setSelectedUserId(e.target.value)}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default HomePage;

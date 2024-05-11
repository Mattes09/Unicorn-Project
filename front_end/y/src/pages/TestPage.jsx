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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/test/questions`)
      .then((response) => {
        setCurrentQuestion(response.data[0]); // Assuming you're fetching multiple and using the first.
        console.log(response.data[0]); // Log to see what data is being received
      })
      .catch((err) => console.error("Error fetching test questions:", err));
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/test/questions`);
      if (response.data.length > 0) {
        setCurrentQuestion(response.data[0]);
      } else {
        setCurrentQuestion(null); // Handle no questions returned
        console.error("No questions available.");
      }
      setUserAnswer(""); // Reset user answer for new question
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || userAnswer.trim() === "") return;

    const payload = {
      answers: [
        {
          id: currentQuestion.id,
          userAnswer: userAnswer,
        },
      ],
    };

    try {
      const response = await axios.post(`${BASE_URL}/test/submit`, payload);
      setResults((prev) => [
        ...prev,
        response.data.results
          .map((result) => (result.isCorrect ? "Correct" : "Incorrect"))
          .join(", "),
      ]);
      fetchQuestion(); // Fetch next question or handle completion
    } catch (error) {
      console.error(
        "Error submitting answer:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <Box padding={3} sx={{ maxWidth: 600, mx: "auto" }}>
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          marginBottom: 2,
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Test Your Knowledge
      </Typography>

      {currentQuestion && (
        <>
          <Card>
            <CardMedia
              component="img"
              image={`${BASE_URL}${currentQuestion.picture}`}
              alt="Test Image"
              sx={{ height: 300, width: "100%" }}
            />
          </Card>
          <TextField
            fullWidth
            label="Type your answer"
            variant="outlined"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAnswer}
          >
            Submit Answer
          </Button>
          {results.length > 0 && (
            <Typography sx={{ mt: 2 }}>
              Results: {results.join(", ")}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default TestPage;

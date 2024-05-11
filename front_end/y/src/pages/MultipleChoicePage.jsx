import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MultipleChoicePage = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0); // Track the number of attempts for the current question

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/multiple-choice/question"
      );
      setQuestion(response.data);
      setFeedback("");
      setSelectedAnswer("");
      setAttempts(0); // Reset attempts whenever a new question is fetched
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer);
    setAttempts(attempts + 1); // Increment attempts

    try {
      const response = await axios.post(
        "http://localhost:3000/multiple-choice/submit",
        {
          questionId: question.id,
          chosenAnswer: answer,
        }
      );
      if (response.data.isCorrect) {
        setFeedback("Correct!");
        setTimeout(() => {
          fetchQuestion();
        }, 2000);
      } else {
        setFeedback("Incorrect, try again!");
        if (attempts >= 2) {
          // Allow 3 attempts
          setTimeout(() => {
            fetchQuestion(); // Move to next question after 3 incorrect attempts
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (!question) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box padding={3} sx={{ maxWidth: 500, margin: "auto" }}>
      <IconButton onClick={() => navigate("/")} sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Guess the word for the image!
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image={`http://localhost:3000${question.picture}`}
          alt="Question Image"
          sx={{ height: 260 }}
        />
        <CardContent>
          {question.choices.map((choice, index) => (
            <Button
              key={index}
              variant="contained"
              color={selectedAnswer === choice ? "primary" : "secondary"}
              onClick={() => handleAnswer(choice)}
              sx={{ margin: 1 }}
              disabled={feedback && attempts >= 3} // Disable buttons after 3 attempts or when moving to the next question
            >
              {choice}
            </Button>
          ))}
        </CardContent>
      </Card>
      {feedback && (
        <Typography
          variant="h6"
          color={feedback === "Correct!" ? "green" : "red"}
          sx={{ mt: 2 }}
        >
          {feedback}
        </Typography>
      )}
    </Box>
  );
};

export default MultipleChoicePage;

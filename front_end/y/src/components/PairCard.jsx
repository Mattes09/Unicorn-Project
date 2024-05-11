import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const PairCard = ({ card, isFlipped, onClick }) => {
  return (
    <Card sx={{ maxWidth: 150, cursor: "pointer" }} onClick={onClick}>
      {isFlipped ? (
        <>
          {card.image ? (
            <CardMedia
              component="img"
              height="100"
              image={card.image}
              alt={card.word}
            />
          ) : (
            <CardContent>
              <Typography variant="h5" component="div">
                {card.word}
              </Typography>
            </CardContent>
          )}
        </>
      ) : (
        <CardContent>
          <Typography variant="h5" component="div">
            ?
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default PairCard;

const express = require("express");
const { FlashcardService } = require("./flashcard.service");

const flashcardRouter = express.Router();

flashcardRouter.get("/:id", FlashcardService.getFlashcard);
flashcardRouter.get("/", FlashcardService.listAllFlashcards);
flashcardRouter.get("/theme/:theme", FlashcardService.getFlashCardsByTheme);
flashcardRouter.post("/favorites", FlashcardService.getMultipleFlashcards);

module.exports = flashcardRouter;

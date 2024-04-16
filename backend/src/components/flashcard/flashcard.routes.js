const express = require("express");
const { FlashcardService } = require("./flashcard.service");

const flashcardRouter = express.Router();

flashcardRouter.get("/:id", FlashcardService.getFlashcard);
flashcardRouter.get("/", FlashcardService.listAllFlashcards);

module.exports = flashcardRouter;

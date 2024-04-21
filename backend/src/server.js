const express = require("express");
const cors = require("cors");

const userRouter = require("./components/user/user.routes");
const flashcardRouter = require("./components/flashcard/flashcard.routes");
const pairsRouter = require("./components/pairs/pairs.routes");
const jumbledLettersRouter = require("./components/jumbled_letters/jumbled_letters.routes");
const multipleChoiceRouter = require("./components/multiple_choice/multiple_choice.routes");
const testRouter = require("./components/test/test.routes");

const PORT = 3000;
const app = express();

app.use(express.json()); //application json support
app.use(express.urlencoded({ extended: true })); //support for application/x-www-form-urlencoded
app.use(cors()); //Cross-Origin Resource Sharing, managing requests from different domains

app.use("/users", userRouter);
app.use("/flashcards", flashcardRouter);
app.use("/pairs", pairsRouter);
app.use("/jumbled-letters", jumbledLettersRouter);
app.use("/multiple-choice", multipleChoiceRouter);
app.use("/test", testRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

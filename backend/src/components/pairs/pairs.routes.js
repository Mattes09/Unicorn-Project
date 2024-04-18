const express = require("express");
const { PairsService } = require("./pairs.service");

const pairsRouter = express.Router();

pairsRouter.get("/cards", PairsService.getGameCards);
pairsRouter.post("/check-match", PairsService.checkMatch);

module.exports = pairsRouter;

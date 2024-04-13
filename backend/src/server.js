const express = require("express");
const userRouter = require("./components/user/user.routes");

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/user/hello-world", (req, res) => {
  //logika co se deje
  res.send("Všetko funguje !");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

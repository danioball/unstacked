import express from "express";
import cors from "cors";
import structuresRouter from "./routes/structures";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", structuresRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Test");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


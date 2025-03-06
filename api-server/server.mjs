import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const todos = [
  {
    id: 1,
    text: "useOptimistic",
  },
  {
    id: 2,
    text: "Learn React",
  },
];
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const body = req.body || {};
  const todo = {
    id: todos.length + 1,
    text: body.text ?? "",
  };
  todos.push(todo);
  setTimeout(() => {
    res.json(todo);
  }, 3000);
});

app.listen(8080, () => {
  console.log("server running on http://localhost:8080");
});

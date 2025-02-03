const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Create Task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const task = await prisma.tasks.create({ data: { title } });
  res.json(task);
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.tasks.findMany();
  res.json(tasks);
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const tasks = await prisma.tasks.update({
    where: { id },
    data: { completed },
  });
  res.json(tasks);
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tasks.delete({ where: { id } });
  res.json({ message: "Task deleted" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

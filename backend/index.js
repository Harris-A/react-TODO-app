const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Database connection test
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

// Create Task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await prisma.tasks.create({ data: { title } });
    res.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await prisma.tasks.update({
      where: { id: id },
      data: { completed },
    });
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tasks.delete({ where: { id: id } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start Server
async function startServer() {
  await testDatabaseConnection();
  app.listen(5000, () => console.log("Server running on port 5000"));
}

startServer().then(r => {});

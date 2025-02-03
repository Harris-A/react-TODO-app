import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';

const API_URL = "http://localhost:5000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Fetch tasks
    useEffect(() => {
        axios.get(API_URL).then((res) => setTasks(res.data));
    }, []);

    // Add Task
    const addTask = async () => {
        if (!newTask) return;
        const res = await axios.post(API_URL, { title: newTask });
        setTasks([...tasks, res.data]);
        setNewTask("");
    };

    // Toggle Complete
    const toggleComplete = async (id, completed) => {
        const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
        setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
    };

    // Delete Task
    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            {/* --Navbar component */}
            <Navbar />
            {/* -- end */}

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                    <p className="text-gray-600 text-center p-6">Simple React app for better task management.</p>
                    <h1 className="text-3xl font-bold text-gray-800 text-center">TaskMate</h1>
                    <p className="text-gray-600 text-center">Your friendly task manager</p>

                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a task"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={addTask}>Add</button>
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>bg-gradient-to-br from blue-50 to-indigo-100
                                <span onClick={() => toggleComplete(task.id, task.completed)} style={{textDecoration: task.completed ? "line-through" : "none", cursor: "pointer",}}>{task.title}</span>
                                <button onClick={() => deleteTask(task.id)}> ❌ Delete task</button>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_URL = "http://localhost:5000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get(API_URL).then((res) => setTasks(res.data));
    }, []);

    const addTask = async () => {
        if (!newTask.trim()) return;
        const res = await axios.post(API_URL, { title: newTask, completed: false });
        setTasks([...tasks, res.data]);
        setNewTask("");
    };

    const toggleComplete = async (id, completed) => {
        const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
        setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center p-6">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">TaskMate</h1>
                    <p className="text-gray-600 text-center mb-6">Manage your tasks efficiently</p>

                    <div className="flex items-center space-x-2 mb-6">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">+</button>
                    </div>

                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li key={task.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                                <span
                                    onClick={() => toggleComplete(task.id, task.completed)}
                                    className={`cursor-pointer flex-1 text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                                >
                                    {task.title}
                                </span>
                                <button onClick={() => deleteTask(task.id)} className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;

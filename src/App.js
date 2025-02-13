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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6 transition-all">
            <Navbar />

            <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 max-w-xl w-full transition-all">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">🚀 TaskMate</h1>
                <p className="text-gray-500 dark:text-gray-700 text-center mb-6">Plan. Execute. Achieve.</p>

                {/* Input Field */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-200 p-2 rounded-xl shadow-inner">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 bg-transparent px-4 py-2 text-gray-800 focus:outline-none"
                    />
                    <button onClick={addTask}
                        className="px-4 py-2 bg-blue-500 dark:bg-gray-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"> +
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-4 mt-6">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-xl transition-all"
                        >
                            <span
                                onClick={() => toggleComplete(task.id, task.completed)}
                                className={`cursor-pointer flex-1 text-lg transition-all ${
                                    task.completed
                                        ? "line-through text-gray-400 dark:text-gray-500"
                                        : "text-gray-800 dark:text-white"
                                }`}
                            >
                                {task.title}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-all"
                            > Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;

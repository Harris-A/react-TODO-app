import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-4 sm:p-6 transition-all">
            <Navbar />

            <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full transition-all">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-3 sm:mb-4">🚀 TaskMate</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-5 sm:mb-6">Plan. Execute. Achieve.</p>

                {/* Input Field */}
                <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-2 rounded-xl shadow-inner">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 bg-transparent px-4 py-2 text-gray-800 dark:text-white focus:outline-none w-full sm:w-auto"
                    />
                    <button
                        onClick={addTask}
                        className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-blue-500 dark:bg-gray-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                    >
                        +
                    </button>
                </div>

                {/* Drag & Drop Task List */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4 mt-5 sm:mt-6"
                            >
                                {tasks.length > 0 ? (
                                    tasks.map((tasks, index) => (
                                        <Draggable key={tasks.id} draggableId={tasks.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`flex items-center justify-between p-4 sm:p-5 bg-gray-50 dark:bg-gray-900 shadow-md rounded-xl transition-all ${
                                                        snapshot.isDragging ? "bg-gray-200 dark:bg-gray-" : ""
                                                    }`}
                                                >
                                                    <span
                                                        onClick={() => toggleComplete(tasks.id, tasks.completed)}
                                                        className={`cursor-pointer flex-1 text-lg transition-all ${
                                                            tasks.completed
                                                                ? "line-through text-gray-400 dark:text-gray-500"
                                                                : "text-gray-800 dark:text-white "
                                                        }`}
                                                    >
                                                        {tasks.title}
                                                    </span>
                                                    <button
                                                        onClick={() => deleteTask(tasks.id)}
                                                        className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No tasks available.</p>
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <Footer />
        </div>
    );
}

export default App;

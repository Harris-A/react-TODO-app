import { useState } from "react";

export default function Add({ onAddTask }) {
    const [newTask, setNewTask] = useState("");

    const handleAddClick = () => {
        if (newTask.trim() === "") return; // Prevent empty tasks
        onAddTask(newTask); // Send new task to parent component (App.js)
        setNewTask(""); // Clear input field
    };

    return (
        <div className="flex space-x-2 mb-4">
            <input
                type="text"
                className="flex-1 p-2 border rounded-md"
                placeholder="Enter a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                +
            </button>
        </div>
    );
}
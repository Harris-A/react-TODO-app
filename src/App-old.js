import './App.css';
import Navbar from './Navbar';
import Add from './Add';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

// Main App component
function App () {
    const container = document.getElementById('root');
    const root = createRoot(container);
    const [tasks, setTasks] = useState([]);
    const handleAddTask = (task) => {
        setTasks([...tasks, task]); // Add new task to list
    };

    const myList = (
        <div>
            {/* --Navbar component */}
            <Navbar />
            {/* -- end */}

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">TaskMate</h1>
                    <p className="text-gray-600 text-center">Your friendly task manager</p>

                    {/* To-Do App main Content Here */}
                    <div className="p-4 max-w-md mx-auto">
                        <Add onAddTask={handleAddTask}/> {/* Using Add component */}
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index} className="p-2 border-b">{task}</li>
                            ))}
                        </ul>
                    </div>
                    {/* To-Do App main Content end */}

                </div>
            </div>
        </div>
    );
    root.render(myList);
}
export default App; // Exporting the App component
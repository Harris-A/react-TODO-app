import './App.css';
import Navbar from './Navbar';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Main App component
function App () {
    const container = document.getElementById('root');
    const root = createRoot(container);

    const myList = (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">TaskMate</h1>
                    <p className="text-gray-600 text-center">Your friendly task manager</p>
                    {/* Your To-Do App Content Goes Here */}
                </div>
            </div>
        </div>
    );
    root.render(myList);
}
export default App; // Exporting the App component


//code below not required

        // <div>
        //     <Navbar />
        //     <div className="container">
        //         <header className="App-header">
        //             <h1 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600 text-center sm:text-5xl md:text-6xl pt-6">TaskMate
        //             </h1>
        //         </header>
        //         <p className="font-bold tracking-tight text-sky-950 text-center pt-2">Your friendly task manager</p>
        //     </div>
        // </div>
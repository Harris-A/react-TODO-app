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
            <header className="App-header">
                <h1 className="page-header text-black text-5xl font-semibold tracking-tight text-balance sm:text-7xl">React TO-DO List</h1>
            </header>
            <ul className="text-black text-center m-8">
                <li> Learn React</li>
                <li> Create a basic application using React</li>
                <li> Learn and use TailwindCSS</li>
            </ul>
        </div>
    );
    root.render(myList);
}
export default App; // Exporting the App component
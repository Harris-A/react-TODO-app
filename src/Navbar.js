import DarkModeToggle from "./DarkModeToggle"; // Import the toggle
import React from "react";
const Navbar = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-light dark:bg-gray-900">
                <div className="container">
                    <a className="navbar-brand"><img src="/logo192.png" width="50"/></a>
                    <DarkModeToggle /> {/* Add the dark mode toggle button */}
                </div>
            </nav>
    );
}
export default Navbar;
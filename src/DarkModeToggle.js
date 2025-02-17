import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Icons for light and dark mode

const DarkModeToggle = () => {
    // Get theme from localStorage (default to false if not set)
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    // Effect runs when `darkMode` state changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");  // Add "dark" class to <html> for dark mode
            localStorage.setItem("theme", "dark"); // Save theme preference
        } else {
            document.documentElement.classList.remove("dark"); // Remove "dark" class for light mode
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-6 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md transition"
        >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
};

export default DarkModeToggle;

const Footer = () => {
    return (
        <footer className="bg-transparent text-gray-800 dark:text-white py-4 text-center mt-10 absolute bottom-0">
            <div className="container mx-auto px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Harris To-Do App. All rights reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;

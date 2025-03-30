import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#2D2A24] text-white py-6 mt-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold text-[#DBDBDB]">Event Manager</h2>
                    <p className="text-sm text-[#C9B194] mt-1">Making events seamless and exciting!</p>
                </div>
                <nav className="flex space-x-6">
                    <Link to="/about" className="text-[#DBDBDB] hover:text-[#C9B194] transition">About</Link>
                    <Link to="/contact" className="text-[#DBDBDB] hover:text-[#C9B194] transition">Contact</Link>
                    <Link to="/privacy" className="text-[#DBDBDB] hover:text-[#C9B194] transition">Privacy Policy</Link>
                    <Link to="/terms" className="text-[#DBDBDB] hover:text-[#C9B194] transition">Terms of Service</Link>
                </nav>
            </div>
            <div className="text-center text-sm text-[#C9B194] mt-6">
                &copy; {new Date().getFullYear()} Event Manager. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

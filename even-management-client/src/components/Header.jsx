import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, UserCircle } from "lucide-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated authentication state

    const navLinkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition font-medium ${
            isActive ? "bg-[#C9B194] text-[#2D2A24]" : "text-white hover:bg-[#A08963] hover:text-white"
        }`;

    return (
        <header className="bg-[#2D2A24] text-white py-4 px-6 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold text-[#DBDBDB] hover:text-[#C9B194] transition">
                    Event Manager
                </NavLink>
                <nav className="hidden md:flex space-x-4">
                    <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                    <NavLink to="/events" className={navLinkClasses}>Events</NavLink>
                    <NavLink to="/event/create" className={navLinkClasses}>Create Event</NavLink>
                    <NavLink to="/about" className={navLinkClasses}>About</NavLink>
                    <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <NavLink to="/profile" className="flex items-center space-x-2 hover:text-[#C9B194] transition">
                            <UserCircle className="w-6 h-6" />
                            <span>Profile</span>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/signin" className={navLinkClasses}>Sign In</NavLink>
                            <NavLink to="/signup" className={navLinkClasses}>Sign Up</NavLink>
                        </>
                    )}
                </div>
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-6 h-6 text-white" />
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center bg-[#2D2A24] text-white py-4 space-y-4">
                    <NavLink to="/" className={navLinkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/events" className={navLinkClasses} onClick={() => setIsOpen(false)}>Events</NavLink>
                    <NavLink to="/create" className={navLinkClasses} onClick={() => setIsOpen(false)}>Create Event</NavLink>
                    <NavLink to="/about" className={navLinkClasses} onClick={() => setIsOpen(false)}>About</NavLink>
                    <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink>
                    {isLoggedIn ? (
                        <NavLink to="/profile" className="flex items-center space-x-2 hover:text-[#C9B194] transition" onClick={() => setIsOpen(false)}>
                            <UserCircle className="w-6 h-6" />
                            <span>Profile</span>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/signin" className={navLinkClasses} onClick={() => setIsOpen(false)}>Sign In</NavLink>
                            <NavLink to="/signup" className={navLinkClasses} onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
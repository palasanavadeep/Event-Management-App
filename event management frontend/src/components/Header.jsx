import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    const navLinkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition font-medium ${
            isActive ? "bg-[#C9B194] text-[#2D2A24]" : "text-white hover:bg-[#A08963] hover:text-white"
        }`;

    return (
        <>
            <header className="bg-[#2D2A24] text-white py-4 px-6 shadow-lg fixed top-0 left-0 w-full z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <NavLink to="/" className="text-2xl font-bold text-[#DBDBDB] hover:text-[#C9B194] transition">
                        Event Manager 
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-4">
                        <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                        <NavLink to="/events" className={navLinkClasses}>Events</NavLink>
                        {auth.role === "USER" && (
                            <NavLink to="/admin-access" className={navLinkClasses}>Become an Admin</NavLink>
                        )}
                        {auth.role === "ADMIN" && (
                            <NavLink to="/event/create" className={navLinkClasses}>Create Event</NavLink>
                        )}
                        {auth.role === "SUPER_ADMIN" && (
                            <NavLink to="/upgrade-requests" className={navLinkClasses}>Upgrade Requests</NavLink>
                        )}
                        <NavLink to="/about" className={navLinkClasses}>About</NavLink>
                        <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {auth.isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <NavLink to={`/profile/${auth.id}`} className="flex items-center space-x-2 pr-4 hover:bg-[#A08963] rounded-lg">
                                    <FaUser className="w-10 h-10 rounded-full p-2" />
                                    <span className="text-white">{auth.username}</span>
                                </NavLink>
                                {/* <NavLink to="/edit-profile" className={navLinkClasses}>Edit Profile</NavLink> */}
                                <button 
                                    onClick={handleLogout} 
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/signin" className={navLinkClasses}>Sign In</NavLink>
                                <NavLink to="/signup" className={navLinkClasses}>Sign Up</NavLink>
                            </>
                        )}
                    </div>

                    {/* Hamburger Menu */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden flex flex-col items-center bg-[#2D2A24] text-white py-4 space-y-4">
                        <NavLink to="/" className={navLinkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/events" className={navLinkClasses} onClick={() => setIsOpen(false)}>Events</NavLink>
                        {auth.role === "ADMIN" && (
                            <NavLink to="/event/create" className={navLinkClasses} onClick={() => setIsOpen(false)}>Create Event</NavLink>
                        )}
                        <NavLink to="/about" className={navLinkClasses} onClick={() => setIsOpen(false)}>About</NavLink>
                        <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink>

                        {auth.isLoggedIn ? (
                            <div className="flex flex-col items-center space-y-2">
                                <NavLink to={`/profile/${auth.id}`} className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                    <FaUser className="w-10 h-10 rounded-full p-2" />
                                    <span className="text-white">{auth.username}</span>
                                </NavLink>
                                {/* <NavLink to="/edit-profile" className={navLinkClasses} onClick={() => setIsOpen(false)}>Edit Profile</NavLink> */}
                                <button 
                                    onClick={() => { handleLogout(); setIsOpen(false); }} 
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/signin" className={navLinkClasses} onClick={() => setIsOpen(false)}>Sign In</NavLink>
                                <NavLink to="/signup" className={navLinkClasses} onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* Page Content Padding */}
            <div className="pt-20"></div>
        </>
    );
};

export default Header;

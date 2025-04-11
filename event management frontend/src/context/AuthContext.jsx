import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        role: "",
        email: "",
        username: "",
        id: "",  
        token: "",
        isLoggedIn: false,
    });

    // Load auth data from cookies when app loads
    useEffect(() => {
        const storedToken = Cookies.get("auth_token");
        const storedRole = Cookies.get("user_role");
        const storedEmail = Cookies.get("user_email");
        const storedUsername = Cookies.get("user_name");
        const storedUserId = Cookies.get("user_id");  // Retrieve the user_id cookie

        if (storedToken) {
            setAuth({
                role: storedRole || "",
                email: storedEmail || "",
                username: storedUsername || "",
                id: storedUserId || "",  // Set user_id from cookies
                token: storedToken,
                isLoggedIn: true,
            });
        }
    }, []);

    // Function to update the auth state after login
    const login = (userData) => {
        setAuth({
            role: userData.role,
            email: userData.email,
            username: userData.username,
            id: userData.id,  // Store userId in the state
            token: userData.token,
            isLoggedIn: true,
        });

        // Store user details in cookies for persistence
        Cookies.set("auth_token", userData.token, { expires: 1, secure: true, sameSite: "Strict" });
        Cookies.set("user_role", userData.role, { expires: 1 });
        Cookies.set("user_email", userData.email, { expires: 1 });
        Cookies.set("user_name", userData.username, { expires: 1 });
        Cookies.set("user_id", userData.id, { expires: 1 });  // Store userId in cookies
    };

    // Function to log out the user
    const logout = () => {
        setAuth({
            role: "",
            email: "",
            username: "",
            id: "",  // Clear userId from state
            token: "",
            isLoggedIn: false,
        });

        // Remove stored cookies
        Cookies.remove("auth_token");
        Cookies.remove("user_role");
        Cookies.remove("user_email");
        Cookies.remove("user_name");
        Cookies.remove("user_id");  // Remove userId cookie
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

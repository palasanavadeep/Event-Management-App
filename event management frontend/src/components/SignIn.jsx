import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    TextField, Button, Box, Typography, Card, 
    IconButton, InputAdornment, Snackbar, Alert 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const { login } = useContext(AuthContext); // Access login function from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                { email, password });

            if (response.status === 200) {
                const userData = response.data; // { role, email, username, token }

                // Save user data in context
                login(userData);

                setSnackbar({ open: true, message: "Sign-in successful!", severity: "success" });

                setTimeout(() => navigate("/"), 2000); // Redirect after delay
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Invalid email or password. Please try again.";
            setSnackbar({ open: true, message: errorMsg, severity: "error" });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F2EFE7">
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="#A08963" mb={2}>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ bgcolor: "#706D54", color: "white", mt: 2, ":hover": { bgcolor: "#A08963" } }}
                    >
                        Sign In
                    </Button>
                </form>

                {/* <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ mt: 2, color: "#706D54", borderColor: "#A08963", ":hover": { bgcolor: "#C9B194" } }}
                >
                    Sign in with Google
                </Button> */}

                <Typography variant="body2" mt={2}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "#A08963", textDecoration: "none", fontWeight: "bold" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Card>

            {/* Snackbar for error/success messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert 
                    severity={snackbar.severity} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    sx={{ width: "400px", fontSize: "1.2rem", p: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SignIn;

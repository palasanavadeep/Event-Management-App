import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
    TextField, Button, Box, Typography, Card, 
    IconButton, InputAdornment, FormControl, 
    FormLabel, RadioGroup, FormControlLabel, Radio, 
    Snackbar, Alert 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!email.includes("@")) {
            newErrors.email = "Enter a valid email address";
            valid = false;
        }

        if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
            valid = false;
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: "Please fix the errors before submitting.",
                severity: "error"
            });
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, 
            {   name,
                email,
                phone,
                password,
                role
            });

            if (response.status === 200) {
                setSnackbar({ open: true, message: "Signup successful!", severity: "success" });
                setTimeout(() => navigate("/signin"), 2000);
            }
        } catch (error) {
            console.log(error);
            
            const errorMsg = error.response?.data?.message || "Signup failed. Try again!"+error+"";
            setSnackbar({ open: true, message: errorMsg, severity: "error" });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F2EFE7">
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="#A08963" mb={2}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Name" variant="outlined" margin="normal" value={name}
                        onChange={(e) => setName(e.target.value)} required error={!!errors.name} helperText={errors.name} />

                    <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email}
                        onChange={(e) => setEmail(e.target.value)} required error={!!errors.email} helperText={errors.email} />

                    <TextField fullWidth label="Phone Number" variant="outlined" margin="normal" value={phone}
                        onChange={(e) => setPhone(e.target.value)} required error={!!errors.phone} helperText={errors.phone} />

                    <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} variant="outlined"
                        margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required 
                        error={!!errors.password} helperText={errors.password}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )}} />

                    <TextField fullWidth label="Confirm Password" type={showConfirmPassword ? "text" : "password"}
                        variant="outlined" margin="normal" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword} InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )}} />

                    {/* <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend">Select Role</FormLabel>
                        <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
                            <FormControlLabel value="ADMIN" control={<Radio />} label="ADMIN" />
                            <FormControlLabel value="USER" control={<Radio />} label="USER" />
                        </RadioGroup>
                    </FormControl> */}

                    <Button type="submit" fullWidth variant="contained" 
                        sx={{ bgcolor: "#706D54", color: "white", mt: 2, ":hover": { bgcolor: "#A08963" } }}>
                        Sign Up
                    </Button>
                </form>

                <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} 
                    sx={{ mt: 2, color: "#706D54", borderColor: "#A08963", ":hover": { bgcolor: "#C9B194" } }}>
                    Sign up with Google
                </Button>

                <Typography variant="body2" mt={2}>
                    Already have an account?{" "}
                    <Link to="/signin" style={{ color: "#A08963", textDecoration: "none", fontWeight: "bold" }}>
                        Sign In
                    </Link>
                </Typography>
            </Card>

            {/* Snackbar for success/error messages */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={4000} 
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert 
                    severity={snackbar.severity} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    sx={{ width: "400px", fontSize: "1.2rem", p: 2 }} // Increased size
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SignUp;

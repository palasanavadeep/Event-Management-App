
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Card } from "@mui/material";

const Register = () => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userProfile", JSON.stringify({ name, profilePic }));
        navigate("/"); // Redirect to Home Page
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F2EFE7">
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="#A08963" mb={2}>Complete Your Profile</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
                    <TextField fullWidth label="Profile Picture URL" variant="outlined" margin="normal" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} required />
                    <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#706D54", color: "white", mt: 2, ":hover": { bgcolor: "#A08963" } }}>Save & Continue</Button>
                </form>
            </Card>
        </Box>
    );
};

export default Register;

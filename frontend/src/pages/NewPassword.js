import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const theme = createTheme();

export default function NewPassword() {
    const userId = localStorage.getItem('userId')
    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const { id, token } = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let newPassword = data.get('newpassword')
        let confirmPassword = data.get('confirmpassword')

        if (newPassword !== confirmPassword) return

        setLoading(true)
        const response = await fetch(`${baseUrl}/api/user/changePassword`, {
            method: 'POST',
            body: JSON.stringify({ id, token, newPassword }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
        }
        if (response.ok) {
            setLoading(false)
        }
    };

    return (
        !userId ? <>{loading ? <Loader /> : null}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newpassword"
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Password
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </> : <Navigate to="/" />
    );
}
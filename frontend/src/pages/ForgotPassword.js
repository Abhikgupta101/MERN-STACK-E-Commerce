import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const theme = createTheme();

export default function ForgotPassword() {
    const userId = localStorage.getItem('userId')
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email')

        if (!email) return
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/user/sendEmail`, {
            method: 'POST',
            body: JSON.stringify({ email }),
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
            navigate(`/`, { replace: true });
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
                            Trouble with logging in?
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                id="email"
                                autoComplete="new-email"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Login Link
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </> : <Navigate to="/" />
    );
}
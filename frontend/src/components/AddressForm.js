import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addAddress } from '../store/addressSlice';
import { useNavigate } from 'react-router-dom';

export default function AddressForm({ handleNext }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')

    const submit = () => {
        if (!fname || !lname || !address || !city || !state || !zip || !country) {
            toast.error(`All fields must be filled`);
            return
        }
        dispatch(addAddress({
            fname, lname, address, city, state, zip, country
        }))
        handleNext()
    }
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={fname} onChange={(e) => setFname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={lname} onChange={(e) => setLname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={city} onChange={(e) => setCity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        value={state} onChange={(e) => setState(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={zip} onChange={(e) => setZip(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={country} onChange={(e) => setCountry(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/', { replace: true })}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
            <ToastContainer />
        </>
    );
}
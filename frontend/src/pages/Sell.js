import React, { useEffect, useState } from 'react'
import { storage } from '../Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Dashbar from '../dashboard/Dashbar';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from '../components/Loader.js'


const theme = createTheme();

export default function Sell() {
    const userID = localStorage.getItem('userId')
    const userData = useSelector(state => state.user)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [loading, setLoading] = useState(false)
    const genders = ["Choose Gender", "Men", "Women", "Unisex"]
    const sizes = ["Choose Sizes", "S", "M", "L", "ML", "XL"]
    const brands = [
        "Choose Brand",
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Sparks",
        "Bata"
    ]

    const [sizesAr, setSizesAr] = useState([])
    const [genderAr, setGenderAr] = useState([])
    const [brand, setBrand] = useState('')
    const [file, setFile] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name')
        let description = data.get('description')
        let quantity = data.get('quantity')
        let price = data.get('price')
        setLoading(true)
        const storageRef = ref(storage, `/data/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', fn1, fn2, fn3)

        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }

        function fn2(error) {
        }

        function fn3(error) {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                const createProduct = async () => {
                    const response = await fetch(`${baseUrl}/api/products/create`,
                        {
                            method: 'POST',
                            body: JSON.stringify({ name, description, price, image: url, sizes: sizesAr, stock: quantity, gender: genderAr, brand }),
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
                }

                createProduct()
            })
        }

    }
    const addSize = (value) => {
        if (value === "Choose Sizes") return
        if (!sizesAr.includes(value)) {
            setSizesAr([...sizesAr, value])
            return
        }
        else {
            setSizesAr(sizesAr.filter((size) => size !== value))
        }
    }
    const addGender = (value) => {
        if (value === "Choose Gender") return
        if (!genderAr.includes(value)) {
            setGenderAr([...genderAr, value])
            return
        }
        else {
            setGenderAr(genderAr.filter((gender) => gender !== value))
        }
    }

    const addBrand = (value) => {
        if (value === "Choose Brand") return
        setBrand(value)
    }
    return (
        Object.keys(userData).length !== 0 && userData.role == "admin" ? <>
            {loading ? <Loader /> : null}
            <ThemeProvider theme={theme}>
                <Dashbar />
                <Container component="main" maxWidth="xs" sx={{ mt: 1 }}>
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
                            Product Details
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Product Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                type="description"
                                id="description"
                                autoComplete="current-description"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="price"
                                label="Price"
                                type="price"
                                id="price"
                                autoComplete="current-price"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="quantity"
                                label="Quantity"
                                type="quantity"
                                id="quantity"
                                autoComplete="current-quantity"
                            />
                            <div style={{
                                display: 'flex', width: '100%', height: '50px',
                                justifyContent: 'space-around', alignItems: 'center'
                            }}>
                                {
                                    sizesAr.map((size) => (
                                        <div key={size} style={{
                                            display: 'flex', width: "50px", height: '25px', backgroundColor: 'gray',
                                            justifyContent: 'space-around', alignItems: 'center'
                                        }}>
                                            <CloseIcon sx={{ fontSize: "15px" }} onClick={() => addSize(size)} />
                                            <div>{size}</div>

                                        </div>
                                    ))
                                }
                            </div>
                            <select className='signup_input' onChange={(e) => addSize(e.target.value)}>
                                {
                                    sizes.map((size) => (
                                        <option key={size} value={size} >{size}</option>
                                    ))
                                }
                            </select>
                            <select className='signup_input' onChange={(e) => addBrand(e.target.value)}>
                                {
                                    brands.map((brand) => (
                                        <option key={brand} value={brand} >{brand}</option>
                                    ))
                                }
                            </select>
                            {/* <select className='signup_input' onChange={(e) => addCategory(e.target.value)}>
                            {
                                categories.map((category) => (
                                    <option key={category} value={category} >{category}</option>
                                ))
                            }
                        </select> */}
                            <div style={{
                                display: 'flex', width: '100%', height: '50px',
                                justifyContent: 'space-around', alignItems: 'center'
                            }}>
                                {
                                    genderAr.map((gender) => (
                                        <div key={gender} style={{
                                            display: 'flex', width: "100px", height: '25px', backgroundColor: 'gray',
                                            justifyContent: 'space-around', alignItems: 'center'
                                        }}>
                                            <CloseIcon sx={{ fontSize: "15px" }} onClick={() => addGender(gender)} />
                                            <div>{gender}</div>

                                        </div>
                                    ))
                                }
                            </div>

                            <select className='signup_input' onChange={(e) => addGender(e.target.value)}>
                                {
                                    genders.map((gender) => (
                                        <option key={gender} value={gender} >{gender}</option>
                                    ))
                                }
                            </select>
                            <input style={{ display: 'none' }} type="file" id="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])}>
                            </input>
                            <label for="file" className='signup_file_lable'>
                                Upload Product Image
                            </label>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                List Product
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link to='/password/reset' style={{ color: 'blue', textDecoration: 'none' }}>
                                    Forgot password?
                                </Link> */}
                                </Grid>
                                <Grid item>
                                    {/* <Link to='/signup' style={{ color: 'blue', textDecoration: 'none' }}>
                                    Don't have an account? Sign Up
                                </Link> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </> : <Navigate to="/" />
    );
}


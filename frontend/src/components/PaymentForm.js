import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOrder } from '../store/orderSlice';
import Loader from './Loader';
import { addCart, setCount } from '../store/cartSlice';

export default function PaymentForm({ handleNext, handleBack }) {
    const baseUrl = process.env.REACT_APP_BASE_URL
    var totalCart = 0;
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const address = useSelector(state => state.address)
    const cartItems = useSelector(state => state.cart.cart)
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const [name, setName] = useState('')

    // ADDING PRODUCT ON APP

    useEffect(() => {
        const payment = async () => {
            const response = await fetch(`${baseUrl}/api/payment/create`, {
                method: 'POST',
                body: JSON.stringify({ amount: totalCart }),
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
                setClientSecret(json.clientSecret)
                setLoading(false)
            }
        }
        if (totalCart !== 0) {
            payment()
        }


    }, [])

    if (cartItems.length > 0) {
        cartItems.map((item) => {
            totalCart = totalCart + (item.qty * item.price)
        })
    }

    const submitOrder = async (e) => {
        e.preventDefault();
        if (name == '') {
            toast.error(`Please enter card holder's name`);
            return;
        }
        setLoading(true)

        const paymentData = [
            { name: 'Card type', detail: 'Visa' },
            { name: 'Card holder', detail: name },
            { name: 'Card number', detail: 'xxxx-xxxx-xxxx-4242' },
            { name: 'Expiry date', detail: '04/2024' },

        ]

        const result = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })

        if (result.error) {
            setLoading(false)
            toast.error(result.error.message);
            return;
        }
        const response = await fetch(`${baseUrl}/api/order/create`,
            {
                method: 'POST',
                body: JSON.stringify({ order_id: result.paymentIntent.id, total_order: totalCart, products: cartItems, user_name: name, address, user_id: userId, payment: paymentData }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            })
        const json = await response.json()

        if (!response.ok) {
            toast.error(`Order can't be placed. Please try again`);
            setLoading(false)
        }
        if (response.ok) {
            toast.success(`Order Placed Successfully`);
            setLoading(false)
            localStorage.removeItem('cart')
            dispatch(addCart([]))
            dispatch(setCount(0))
            dispatch(setOrder(json))
            handleNext()
        }
    }

    const cardStyle = {
        style: {
            base: {
                display: "flex",
                flexDirection: "column",
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    return (
        <>
            {loading ? <Loader /> : null}
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                sx={{ mb: '2rem' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <CardElement id="card-element" options={cardStyle} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => handleBack()}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={submitOrder}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
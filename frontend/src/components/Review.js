import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, setCount } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Orders from './Orders';

export default function Review() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    var totalCart = 0;
    const navigate = useNavigate()
    const userid = localStorage.getItem('userId')
    const dispatch = useDispatch()
    const order = useSelector(state => state.order)

    useEffect(() => {
        const emptyCart = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/products/emptyCart/${userid}`, {
                    method: 'POST',
                    body: JSON.stringify({ products: order.products }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    mode: 'cors'
                })
                const json = await response.json()
                if (response.ok) {

                }
            } catch (err) {
            }
        }
        emptyCart()
    }, [])
    return (
        <>
            <Orders order={order} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/', { replace: true })}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Back
                </Button>
            </Box>
        </>
    );
}
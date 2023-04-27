import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate } from 'react-router-dom';
import { addCart, removeCart, setCount } from '../store/cartSlice';
import Loader from './Loader';

const SingleCartProduct = ({ cart }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.cart)
    const removefromCart = async () => {
        if (cart.qty === 1) return
        if (userId !== null) {
            setLoading(true)
            const response = await fetch(`${baseUrl}/api/products/addCart/${cart._id}`, {
                method: 'POST',
                body: JSON.stringify({ qty: cart.qty - 1 }),
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
                dispatch(addCart({ ...cart, qty: cart.qty - 1 }))
                dispatch(setCount(-1))
            }
        }
        else {
            dispatch(addCart({ ...cart, qty: cart.qty - 1 }))
            dispatch(setCount(-1))
        }

        let data = localStorage.getItem('cart')
        data = JSON.parse(data).map((item) => {
            if (item._id == cart._id) {
                item.qty = item.qty - 1
            }
        })

        localStorage.setItem('cart', JSON.stringify(data))

    }

    const addtoCart = async () => {
        if (cart.qty === cart.stock) {
            return
        }
        if (userId !== null) {
            setLoading(true)
            const response = await fetch(`${baseUrl}/api/products/addCart/${cart._id}`, {
                method: 'POST',
                body: JSON.stringify({ qty: cart.qty + 1 }),
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
                dispatch(addCart({ ...cart, qty: cart.qty + 1 }))
                dispatch(setCount(1))
            }
        }
        else {
            dispatch(addCart({ ...cart, qty: cart.qty + 1 }))
            dispatch(setCount(1))
        }

    }

    const deleteCart = async () => {
        if (userId !== null) {
            setLoading(true)
            const response = await fetch(`${baseUrl}/api/products/removeCart/${cart._id}`, {
                method: 'POST',
                body: JSON.stringify(),
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
                dispatch(removeCart(cart))
                dispatch(setCount(-cart.qty))
                let data = localStorage.getItem('cart')
                data = JSON.parse(data)
                let new_data = data.filter((item) => item._id !== cart._id)
                if (new_data.length === 0) {
                    localStorage.removeItem('cart')
                }
                else {
                    localStorage.setItem('cart', JSON.stringify(new_data))
                }
            }
        }

        else {
            dispatch(removeCart(cart))
            dispatch(setCount(-cart.qty))
            let data = localStorage.getItem('cart')
            data = JSON.parse(data)
            let new_data = data.filter((item) => item._id !== cart._id)
            if (new_data.length === 0) {
                localStorage.removeItem('cart')
            }
            else {
                localStorage.setItem('cart', JSON.stringify(new_data))
            }
        }
    }

    if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }

    return (

        <div className='cart'>
            {loading ? <Loader /> : null}
            <div className='cart_cont'>
                <div className='cart_info'>
                    <img style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                        src={cart.image}
                    />
                </div>
                <div className='cart_info'>
                    {cart.name}
                </div>
                <div className='cart_info'>
                    Price: ${(cart.price * cart.qty)}
                </div>
                <div className='cart_counters'>
                    <RemoveCircleIcon onClick={removefromCart} />
                    <div>{cart.qty}</div>
                    <AddCircleIcon onClick={addtoCart} />
                </div>
                <div className='cart_delete'>
                    <RemoveShoppingCartIcon onClick={deleteCart} />
                </div>
            </div >
        </div>
    )
}

export default SingleCartProduct
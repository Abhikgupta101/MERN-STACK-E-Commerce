import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from './pages/Feed';
import Sell from './pages/Sell';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addCart, fetchCart, setCount } from './store/cartSlice';
import { fetchUser } from './store/userSlice';
import DashOrders from './dashboard/DashOrders';
const promise = loadStripe(
  "pk_test_51MfSkCSAfImheSrYJvD1fJ7KoykNU3eh7S8kFhWvAXye5PZ9IrKVlmqq8pK7IOTub3OCVj2046Woa745iLNNKFgE00UFT7g4EB"
);

export default function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const userid = localStorage.getItem('userId')
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart)

  useEffect(() => {
    const data = localStorage.getItem('cart')
    if (cartItems.length === 0 && data !== null) {
      dispatch(addCart(JSON.parse(data)))
      JSON.parse(data).map((item) => (
        dispatch(setCount(item.qty))
      ))
    }
    else if (cartItems.length === 0 && userid !== null) {
      dispatch(fetchCart(baseUrl))
    }
  }, [])

  useEffect(() => {
    if (userid !== null) {
      dispatch(fetchUser(userid, baseUrl))
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          }
        />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        < Route path='/password/reset' element={<ForgotPassword />} />
        < Route path='/password/reset/:id/:token' element={<NewPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard/create' element={<Sell />} />
        <Route path='/dashboard/orders' element={<DashOrders />} />
        < Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  );
}
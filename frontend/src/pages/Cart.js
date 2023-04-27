import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { Navigate, useNavigate } from 'react-router-dom';
import SingleCartProduct from '../components/SingleCartProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const userid = localStorage.getItem('userId')
  const cartCount = useSelector(state => state.cart.count)
  const userData = useSelector(state => state.user)
  var totalCart = 0;

  const navigate = useNavigate()

  const cartItems = useSelector(state => state.cart.cart)

  const checkout = () => {
    if (cartCount == 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate(`/checkout`, { replace: true });
  }

  if (cartItems.length > 0) {
    cartItems.map((item) => {
      totalCart = totalCart + (item.qty * item.price)
    })
  }

  return (
    <>
      {
        Object.keys(userData).length !== 0 && userData.role == "admin" ? <Dashbar /> : <Navbar />
      }
      <div>
        <Navbar />
        <div className='checkout'>
          <div onClick={checkout}>CHECKOUT</div>
        </div>
        <div style={{ display: 'flex', width: '80vw', height: '10vh', alignItems: 'center', justifyContent: 'center', margin: 'auto', marginTop: '15vh', fontSize: '30px' }}>CART PRICE: ${totalCart}</div>
        {
          < div style={{ display: 'flex', flexDirection: 'column', marginTop: '5vh', marginBottom: '5vh', alignItems: 'center' }}>
            {
              cartItems.length !== 0 && cartItems.map((cart) => (
                <SingleCartProduct key={cart._id} cart={cart} />
              ))
            }
          </div>
        }

      </div >
    </>
  )
}

export default Cart
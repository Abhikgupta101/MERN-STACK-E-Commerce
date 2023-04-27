
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate, useNavigate } from 'react-router-dom';
import Orders from '../components/Orders';
import Loader from '../components/Loader.js'

const Profile = () => {
  const userId = localStorage.getItem('userId')
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [ordersData, setOrdersData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/order/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        })
        const json = await response.json()
        if (response.ok) {
          setLoading(false)
          setOrdersData(json)
        }
      } catch (err) {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <>
      {loading ? <Loader /> : null}
      <Navbar />
      <p style={{ marginTop: '12vh', marginLeft: "45%", fontSize: "20px", fontWeight: "bolder" }}>
        {
          ordersData.length != 0 ? <>Your Orders</> : <>No Orders Yet</>
        }

      </p>
      <div>
        {ordersData.length != 0 ?
          <div>
            {ordersData.map((order) => (
              order.user_id == userId ? <Orders key={order._id} order={order} /> : null
            ))}
          </div> : null}
      </div >
    </ >

  )
}

export default Profile
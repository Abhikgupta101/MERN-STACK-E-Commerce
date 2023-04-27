import React, { useEffect, useState } from 'react'
import Orders from '../components/Orders'
import Dashbar from './Dashbar'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DashOrders = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [ordersData, setOrdersData] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.user)
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${baseUrl}/api/order`, {
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
                console.log(err);
            }
        }
        fetchOrders()
    }, [])
    return (
        Object.keys(userData).length !== 0 && userData.role == "admin" ?
            <>
                {loading ? <Loader /> : null
                }
                <Dashbar />
                <div>
                    {ordersData ?
                        <div style={{ marginTop: '10vh' }}>
                            {ordersData.map((order) => (
                                <Orders key={order._id} order={order} />
                            ))}
                        </div> : null}
                </div>
            </> : <Navigate to="/" />
    )
}

export default DashOrders
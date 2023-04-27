import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import { addUser } from '../store/userSlice';
import Loader from '../components/Loader';
import { addSearch } from '../store/searchSlice';

const Dashbar = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userId = localStorage.getItem('userId')
    const search = useSelector(state => state.search)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const updateUrl = (id) => {
        navigate(`/dashboard/${id}`, { replace: true });
    }

    const logout = async () => {
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/user/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setLoading(false)
        }
        if (response.ok) {
            setLoading(false)
            localStorage.removeItem("userId");
            dispatch(addUser({}))
            navigate(`/signin`, { replace: true });

        }
    }

    const searchFunc = (val) => {
        dispatch(addSearch(val))
    }

    return (
        <>
            {loading ? <Loader /> : null}
            <div className='nav_container'>
                <div className='nav_logo'>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate('/', { replace: true })}>Dashboard</div>
                </div>
                <div className='search_bar'>
                    <input type="text" placeholder="Search" value={search} onChange={(e) => searchFunc(e.target.value)} className='search_input'></input>
                </div>
                <div className='nav_links'>
                    <div onClick={() => navigate('/', { replace: true })} className='links' >
                        <div className='links_icons'>
                            <InventoryIcon />
                        </div>
                    </div>
                    <div onClick={() => updateUrl('orders')} className='links' >
                        <div className='links_icons'>
                            <ShoppingCartIcon />
                        </div>
                    </div>
                    <div onClick={() => updateUrl('create')} className='links' >
                        <div className='links_icons'>
                            <AddBoxIcon />
                        </div>
                    </div>
                    <div onClick={logout}>
                        <div className='links_icons'>
                            <LogoutIcon onClick={logout} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashbar
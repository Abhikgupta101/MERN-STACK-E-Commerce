import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { addUser, removeUser } from '../store/userSlice';
import { addCart } from '../store/cartSlice';
import { addSearch } from '../store/searchSlice';
import Loader from './Loader';

const Navbar = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const search = useSelector(state => state.search)

    const dispatch = useDispatch();
    const cartCount = useSelector(state => state.cart.count)
    const userData = useSelector(state => state.user)

    const updateUrl = (id) => {
        navigate(`/${id}`, { replace: true });
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
        if (!response.ok) {
            setLoading(false)
        }
        if (response.ok) {
            setLoading(false)
            localStorage.removeItem("userId");
            localStorage.removeItem("cart");
            navigate(`/signin`, { replace: true });
            dispatch(addUser({}))
            dispatch(addCart([]))

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
                    <div style={{ cursor: "pointer" }} onClick={() => navigate('/', { replace: true })}>DropKart</div>
                </div>
                {/* <SearchIcon /> */}
                <div className='search_bar'>
                    <input type="text" placeholder="Search" value={search} onChange={(e) => searchFunc(e.target.value)} className='search_input'></input>
                </div>
                <div className='nav_links'>
                    <div onClick={() => updateUrl('')} className='links' >
                        <div className='links_icons'>
                            <HomeIcon />
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
                            <ShoppingCartIcon />
                        </Link>
                        {cartCount}
                    </div>
                    {userId !== null ?
                        <>
                            {Object.keys(userData).length !== 0 ? <div onClick={() => updateUrl('profile')} className='links' >
                                <div className='links_icons'>
                                    <AccountCircleIcon />
                                </div>
                            </div> : null}
                            <div onClick={logout}>
                                <div className='links_icons'>
                                    <LogoutIcon />
                                </div>
                            </div>
                        </> :
                        <div onClick={() => updateUrl('signin')} className='links' >
                            <div className='links_icons'>
                                Login
                            </div>
                        </div>}
                </div>
            </div >
        </>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Dashbar from '../dashboard/Dashbar';
import SinglePost from '../components/SinglePost';
import { addProduct, fetchProducts } from '../store/productSlice';
import { fetchUser } from '../store/userSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from '../components/Loader';

const Feed = () => {
    const userid = localStorage.getItem('userId')
    const baseUrl = process.env.REACT_APP_BASE_URL
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.user)
    const products = useSelector(state => state.product)
    const filterStocks = useSelector(state => state.stock)
    const filterGender = useSelector(state => state.genders)
    const filterSizes = useSelector(state => state.sizes)
    const filterBrands = useSelector(state => state.brands)
    const filterSearch = useSelector(state => state.search)
    const [sort, setSort] = useState({ sort: "price", order: "desc" });
    const [page, setPage] = useState(1);


    useEffect(() => {
        dispatch(fetchProducts(baseUrl))
    }, [])

    const stock = ["Out of stocks"]
    const gender = ["Men", "Women", "Unisex"]
    const sizes = ["S", "M", "L", "ML", "XL"]
    const brands = [
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Sparks",
        "Bata"
    ]

    useEffect(() => {
        let timerOut = setTimeout(() => {
            filterProducts();
        }, 800)
        const filterProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${baseUrl}/api/products/filter?page=${page}&limit=5&sort=${sort.sort},${sort.order
                    }&gender=${filterGender.toString()}&sizes=${filterSizes.toString()}&brand=${filterBrands.toString()}&stock=${filterStocks}&search=${filterSearch}`, {
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
                    dispatch(addProduct(json.products))
                }
            } catch (err) {
                setLoading(false)
            }
        }
        return () => clearTimeout(timerOut)
    }, [sort, page, filterSearch, filterGender, filterSizes, filterBrands, filterStocks]);

    useEffect(() => {
        if (userid !== null) {
            dispatch(fetchUser(userid, baseUrl))
        }
    }, [userid])

    const nextPage = (event, value) => {
        setPage(value)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {loading ? <Loader /> : null}
            {
                Object.keys(userData).length !== 0 && userData.role == "admin" ? <Dashbar /> : <Navbar />
            }

            <div className='home'>

                <div className='filter_cont'>
                    <div className='filter'>

                        {
                            Object.keys(userData).length !== 0 && userData.role == "admin" ?
                                <>
                                    <p>Stocks</p>
                                    {
                                        stock.map((item) => (
                                            <Filter key={item} item={item} type="stock" />
                                        ))
                                    }
                                </>
                                : null
                        }
                    </div>

                    <div className='filter'>
                        <p>Gender</p>
                        {
                            gender.map((item) => (
                                <Filter key={item} item={item} type="genders" />
                            ))
                        }
                    </div>
                    <div className='filter'>
                        <p>Sizes</p>
                        {
                            sizes.map((item) => (
                                <Filter key={item} item={item} type="sizes" />
                            ))
                        }
                    </div>
                    <div className='filter'>
                        <p>Brands</p>
                        {
                            brands.map((item) => (
                                <Filter key={item} item={item} type="brands" />
                            ))
                        }
                    </div>
                </div>

                {products ? <div className='feed_singlepost'>
                    {
                        products.map((productData) => (
                            <SinglePost key={productData._id} productData={productData} />
                        ))
                    }

                </div> : null}
            </div>
            <Stack spacing={2} style={{ marginTop: "30px", marginBottom: "30px" }}>
                <Pagination count={10} color="primary" page={page} onChange={nextPage} />
            </Stack>
        </div>
    )
}

export default Feed
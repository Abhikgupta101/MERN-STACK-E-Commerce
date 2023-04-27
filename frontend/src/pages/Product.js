import React, { useEffect, useState } from 'react'
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { addCart, setCount } from '../store/cartSlice';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProduct } from '../store/productSlice';
import Loader from '../components/Loader.js'
import Dashbar from '../dashboard/Dashbar';

const Product = () => {
    const userId = localStorage.getItem('userId')
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart)
    const [review, setReview] = useState('')

    const navigate = useNavigate()

    const [productData, setProductData] = useState({})

    let { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/products/product/${id}`, {
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
                    setProductData(json)
                }
            } catch (err) {
            }
        }
        fetchProduct()
    }, [id])

    const addToCart = async () => {
        let value = 1;
        let notavailable = false
        if (cartItems.some(item => item._id === id)) {
            cartItems.map((item) => {
                if (item.qty == productData.stock) {
                    notavailable = true
                }
                else if (item._id === id) {
                    value = item.qty + 1
                    dispatch(addCart({ ...productData, qty: item.qty + 1 }))
                }
            })
        }

        else {
            dispatch(addCart({ ...productData, qty: 1 }))
        }

        if (notavailable) {
            toast.success('No more stock available')
            return
        }

        if (userId !== null) {
            setLoading(true)
            const response = await fetch(`${baseUrl}/api/products/addCart/${id}`, {
                method: 'POST',
                body: JSON.stringify({ qty: value }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            })
            const json = await response.json()

            if (!response.ok) {
                setLoading(false)
                toast.error(json.error)
            }
            if (response.ok) {
                setLoading(false)
            }
        }
        dispatch(setCount(1))
        toast.success('Product is added to cart')
    }

    if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }

    const deleteProd = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/products/delete/${id}`, {
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
            dispatch(updateProduct(json))
            toast.success('A product is deleted')
        }
    }

    const addReview = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/products/addReview/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                text: review
            }),
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
            setProductData(json)
            setReview('')
        }

    }

    const deleteReview = async (review) => {
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/products/deleteReview/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                review
            }),
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
            setProductData(json)
        }
    }

    return (
        < div >
            {loading ? <Loader /> : null}
            {
                Object.keys(userData).length !== 0 && userData.role == "admin" ? <Dashbar /> : <Navbar />
            }
            {
                productData !== {} ? <div className='product_cont'>
                    <div className='product_img'
                        style={{ backgroundImage: `url(${productData.image})` }}>
                    </div>
                    <div className='product_info'>
                        <div style={{ color: 'gray', fontWeight: "bolder" }}>
                            {productData.brand}
                        </div>
                        <div style={{ fontSize: 'larger' }}>
                            {productData.name}
                        </div>
                        <div style={{ fontWeight: "bolder" }}>
                            ₹{productData.price}
                        </div>
                        {productData.sizes ? <div >
                            Sizes:
                            {
                                productData.sizes.map((size) => (
                                    <span key={size}>{size},</span>
                                ))
                            }
                        </div> : null}
                        <div>
                            <div >

                                {productData.stock !== 0 ?
                                    <>
                                        {Object.keys(userData).length == 0 || (Object.keys(userData).length !== 0 && userData.role !== "admin") ? <div style={{ cursor: 'pointer', backgroundColor: 'red', color: 'white', fontSize: 'larger', padding: '3px', width: '10rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1%' }}
                                            onClick={addToCart}>
                                            Add To Cart
                                        </div> : null}
                                    </> : null}

                                {Object.keys(userData).length !== 0 && userData.role == "admin" ? <div style={{ cursor: 'pointer', backgroundColor: 'red', color: 'white', fontSize: 'larger', padding: '3px', width: '10rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1%' }} onClick={deleteProd}>
                                    Delete
                                </div> : null}
                                {
                                    productData.stock === 0 ?
                                        <div style={{ cursor: 'pointer', backgroundColor: 'red', color: 'white', fontSize: 'larger', padding: '3px', width: '10rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1%' }}>OUT OF STOCK</div>
                                        :
                                        <div>Quantity: {productData.stock}</div>
                                }

                            </div>
                        </div>
                        <div style={{ fontWeight: "bolder" }}>REVIEWS</div>
                        <div className='prod_reviews'>
                            {
                                productData.reviews ?
                                    <>
                                        {productData.reviews.map((review) => (
                                            <div key={review._id}>
                                                {
                                                    review.user_id == userId ?
                                                        <Flex w="100%" h="80%" overflowY="hidden" flexDirection="column" p="3">
                                                            <Flex w="100%" justify="flex-end">
                                                                <Flex
                                                                    flexDirection="column"
                                                                    borderRadius='5'
                                                                    borderBottomLeftRadius='0'
                                                                    bg="black"
                                                                    color="white"
                                                                    minW="100px"
                                                                    maxW="350px"
                                                                    mr="10"
                                                                    my="0"
                                                                    mt='0'
                                                                    mb="10"
                                                                    p="3"
                                                                >
                                                                    <div>
                                                                        <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={review.avatar} />
                                                                    </div>
                                                                    <Text marginTop="5"
                                                                        fontSize={13} >{review.text}
                                                                    </Text>
                                                                </Flex>
                                                                <div style={{ alignItems: 'center', marginRight: '10px' }}
                                                                    onClick={() => deleteReview(review)}
                                                                >
                                                                    {review.text !== "message was deleted" ? < DeleteIcon style={{ color: 'white' }} /> : null}
                                                                </div>
                                                            </Flex>
                                                        </Flex>

                                                        :
                                                        <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
                                                            <Flex w="100%" justify="flex-start">
                                                                <Flex
                                                                    flexDirection="column"
                                                                    borderRadius='5'
                                                                    borderBottomRightRadius='0'
                                                                    bg="white"
                                                                    color="black"
                                                                    minW="100px"
                                                                    maxW="350px"
                                                                    ml="10"
                                                                    mb="10"
                                                                    my="0"
                                                                    p="3"
                                                                >
                                                                    <Text fontSize={10} color="black" fontWeight='bold'>
                                                                        {review.user_name}
                                                                    </Text>
                                                                    <Text marginTop="0" fontSize={13}>{review.text}
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
                                                }
                                            </div>
                                        ))
                                        }
                                    </> : null
                            }
                        </div>
                        {productData.user_id !== userId && userId ? < div className='messageform_cont'>
                            <input style={{ height: "2vh", flex: "1", padding: "11px", border: "none", outline: "none" }} type="text" placeholder="Your Comment"
                                value={review} onChange={(e) => setReview(e.target.value)}></input>
                            <SendIcon style={{ flex: "0.2" }} onClick={addReview} />
                        </div> : null}
                    </div>
                </div> : null
            }
        </div >
    )
}

export default Product
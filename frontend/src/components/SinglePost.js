import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const SinglePost = ({ productData }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const productInfo = () => {
        navigate(`/product/${productData._id}`, { replace: true });
    }


    return (
        <div className='singlepost_cont'
        >
            <div className='singlepost_img'
                style={{ backgroundImage: `url(${productData.image})` }}
                onClick={productInfo}>
            </div>
            <div className='singlepost_footer'>
                <div style={{ color: 'gray', fontWeight: "bolder" }}>
                    {productData.brand}
                </div>
                <div style={{ fontSize: 'larger' }}>
                    {productData.name}
                </div>
                <div style={{ fontWeight: "bolder" }}>
                    ₹{productData.price}
                </div>
                <div >
                    Sizes:
                    {
                        productData.sizes.map((size) => (
                            <span key={size}>{size},</span>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default SinglePost
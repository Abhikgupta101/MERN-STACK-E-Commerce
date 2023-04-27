import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:
    {
        addProduct(state, action) {
            if (Array.isArray(action.payload)) return action.payload
            else state.unshift(action.payload)
            //action.payload is the new Product data

        },
        updateProduct(state, action) {
            if (typeof action.payload === 'object') {
                return state.map((item) => {
                    if (item._id === action.payload._id) return action.payload;
                    return item;
                })
            }
            else {
                return state.filter((item) => item._id !== action.payload)
            }
        },
        removeProduct(state, action) {
            return []
        }
    }
})

export const { addProduct, updateProduct, removeProduct } = productSlice.actions
export default productSlice.reducer


//THUNK

export function fetchProducts(baseUrl) {
    return async function fetchProductThunk(dispatch) {
        try {
            const response = await fetch(`${baseUrl}/api/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            })
            const json = await response.json()
            if (response.ok) {
                dispatch(addProduct(json))
            }
        } catch (err) {
        }
    }
}
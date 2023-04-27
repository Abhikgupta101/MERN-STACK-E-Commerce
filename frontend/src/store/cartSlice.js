import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cart: [],
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:
    {
        addCart(state, action) {
            if (Array.isArray(action.payload)) {
                state.cart = action.payload
            }
            else if (state.cart.some(item => item._id === action.payload._id)) {
                state.cart = state.cart.map((item) => {
                    if (item._id === action.payload._id) return action.payload
                    return item
                })
            }
            else {
                state.cart.push(action.payload)
            }


        },
        removeCart(state, action) {
            state.cart = state.cart.filter((item) => item._id !== action.payload._id)
        },
        setCount(state, action) {
            if (action.payload == 0) { state.count = 0 }
            else {
                state.count = state.count + action.payload
            }
        }
    }
})

export const { addCart, removeCart, setCount } = cartSlice.actions
export default cartSlice.reducer


//THUNK

export function fetchCart(baseUrl) {
    return async function fetchCartThunk(dispatch) {
        try {
            const response = await fetch(`${baseUrl}/api/products/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            })
            const json = await response.json()
            if (response.ok) {
                dispatch(addCart(json))
                json.map((item) => (
                    dispatch(setCount(item.qty))
                ))
            }
        } catch (err) {
        }
    }
}
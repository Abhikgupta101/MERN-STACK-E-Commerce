import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:
    {
        setOrder(state, action) {
            return action.payload
        },
    }
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer
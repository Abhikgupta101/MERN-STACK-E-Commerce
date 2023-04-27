import { createSlice } from '@reduxjs/toolkit'


const initialState = -1

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers:
    {
        setStock(state, action) {
            return action.payload
        }
    }
})

export const { setStock } = stockSlice.actions
export default stockSlice.reducer
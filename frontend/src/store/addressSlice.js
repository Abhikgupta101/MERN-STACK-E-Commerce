import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:
    {
        addAddress(state, action) {
            return action.payload
        },
    }
})

export const { addAddress } = addressSlice.actions
export default addressSlice.reducer
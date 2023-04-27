import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const sizesSlice = createSlice({
    name: 'sizes',
    initialState,
    reducers:
    {
        addSize(state, action) {
            if (Array.isArray(action.payload)) return action.payload
            else state.push(action.payload)
        },
        removeSize(state, action) {
            return state.filter((item) => item !== action.payload)
        }
    }
})

export const { addSize, removeSize } = sizesSlice.actions
export default sizesSlice.reducer
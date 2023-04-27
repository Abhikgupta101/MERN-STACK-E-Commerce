import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers:
    {
        addBrand(state, action) {
            if (Array.isArray(action.payload)) return action.payload
            else state.push(action.payload)
        },
        removeBrand(state, action) {
            return state.filter((item) => item !== action.payload)
        }
    }
})

export const { addBrand, removeBrand } = brandsSlice.actions
export default brandsSlice.reducer
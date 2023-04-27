import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const gendersSlice = createSlice({
    name: 'genders',
    initialState,
    reducers:
    {
        addGender(state, action) {
            if (Array.isArray(action.payload)) return action.payload
            else state.push(action.payload)
        },
        removeGender(state, action) {
            return state.filter((item) => item !== action.payload)
        }
    }
})

export const { addGender, removeGender } = gendersSlice.actions
export default gendersSlice.reducer
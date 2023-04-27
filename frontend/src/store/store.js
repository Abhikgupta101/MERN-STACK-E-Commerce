import { configureStore } from '@reduxjs/toolkit'
import stockReducer from './stockSlice'
import orderReducer from './orderSlice'
import sizesReducer from './sizesSlice'
import searchReducer from './searchSlice'
import cartReducer from './cartSlice'
import gendersReducer from './gendersSlice'
import brandsReducer from './brandsSlice'
import addressReducer from './addressSlice'
import productReducer from './productSlice'
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        stock: stockReducer,
        genders: gendersReducer,
        sizes: sizesReducer,
        search: searchReducer,
        brands: brandsReducer,
        product: productReducer,
        user: userReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer
    },
})

export default store;
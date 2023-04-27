import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBrand, removeBrand } from '../store/brandsSlice'
import { addGender, removeGender } from '../store/gendersSlice'
import { addSize, removeSize } from '../store/sizesSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setStock } from '../store/stockSlice'
const Filter = ({ item, type }) => {
    const dispatch = useDispatch()
    const checkboxValue = async (e) => {
        if (e.target.checked) {
            if (type === "genders") {
                dispatch(addGender(item))
            }
            else if (type === "sizes") {
                dispatch(addSize(item))
            }
            else if (type === "brands") {
                dispatch(addBrand(item))
            }
            else if (type === "stock") {
                dispatch(setStock(0))
            }
        }
        else {
            if (type == "genders") {
                dispatch(removeGender(item))
            }
            else if (type == "sizes") {
                dispatch(removeSize(item))
            }
            else if (type == "brands") {
                dispatch(removeBrand(item))
            }
            else if (type === "stock") {
                dispatch(setStock(-1))
            }
        }
    }
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label={item} onChange={(e) => checkboxValue(e)} />
        </FormGroup>
    )
}

export default Filter
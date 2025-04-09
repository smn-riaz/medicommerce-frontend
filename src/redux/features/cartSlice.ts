import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {

        }
    }
})

export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

import { initialProduct } from "./initialProduct";


export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: initialProduct,
        wallet: 100000000000
    },
    reducers: {
        buyProduct: (state, action) => {
            const item = state.items[action.payload - 1];
            item.count++;
            state.wallet -= item.price;
        },
        sellProduct: (state, action) => {
            const item = state.items[action.payload - 1];
            item.count--;
            state.wallet += item.price;
        },
        changeCount: (state, action) => {
            let item = state.items[action.payload.id - 1];
            state.wallet += item.count * item.price;
            item.count = action.payload.count;
            state.wallet -= item.count * item.price;
        }
    }

})

export const { buyProduct, sellProduct, changeCount } = productSlice.actions;
export default productSlice.reducer;
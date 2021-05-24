import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/products_reducer';
import { GET_PRODUCTS_BEGIN } from '../actions/actions-type';

const ProductsUrl = process.env.REACT_APP_API_Products;

const initialState = {
    products_loading: false,
    products_error: false,
    products: [],
}

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state)

    const fetchProducts = async(url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN})
        try {
            const response = await axios.get(url);
            const products = response.data;
            console.log(products)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // fetchProducts(ProductsUrl);
    })

    return (
        <ProductsContext.Provider value={ {...state}} >
            {children}
        </ProductsContext.Provider>
    )
}


export const useProductsContext = () => {
const useContextProducts = useContext(ProductsContext);
    return useContextProducts;
}
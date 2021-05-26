import {
    CLEAR_FILTERS,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    UPDATE_SORT
} from "../actions/actions-type";

const SORT_PRICE_LOWEST = process.env.SORT_PRICE_LOWEST;
const SORT_PRICE_HIGHEST = process.env.SORT_PRICE_HIGHEST;
const SORT_NAME_A = process.env.SORT_NAME_A;
const SORT_NAME_Z = process.env.SORT_NAME_Z;

const filter_reducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            let maxPrice = action.payload.map(item => item.price)
            maxPrice = Math.max(...maxPrice);
            return {
                ...state,
                all_products: [...action.payload],
                filter_products: [...action.payload],
                filters: {
                    ...state.filters,
                    max_price: maxPrice,
                    price: maxPrice
                }
            }

        case SET_GRIDVIEW:
            return {
                ...state,
                grid_view: true
            }

        case SET_LISTVIEW:
            return {
                ...state,
                sort: action.payload
            }

        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload
            }

        case SORT_PRODUCTS:
            const {
                sort, filter_products
            } = state;
            let tempProducts = [...filter_products];

            switch (sort) {
                case SORT_PRICE_LOWEST:
                    tempProducts = tempProducts.sort((a, b) => {
                       if (a.price < b.price) {
                           return -1;
                       }
                        if (a.price > b.price) {
                            return 1;
                        }
                        return 0
                    })

                case SORT_PRICE_HIGHEST:
                    tempProducts = tempProducts.sort((a, b) => {
                        return b.price - a.price
                    })

                case SORT_NAME_A:
                    tempProducts = tempProducts.sort((a, b) => {
                        return a.name.localeCompare(b.name)
                    })
                    
                case SORT_NAME_Z:
                    tempProducts = tempProducts.sort((a, b) => {
                        return b.name.localeCompare(a.name)
                    })

                    return {
                        ...state, filter_products: tempProducts
                    }
                
                    throw new Error('No Matching sort value')
            }

        case UPDATE_FILTERS:
            const {
                name, value
            } = action.payload;
            return {
                ...state, filters: {
                    ...state.filter,
                    [name]: value
                }
            }

        case FILTER_PRODUCTS:
            const {
                all_products
            } = state;
            const {
                text, category, color, price, company, shipping
            } = state.filters;
            let newAllProducts = [...all_products];

            if (text) {
                newAllProducts = newAllProducts.filter(product => {
                    return product.name.toLowerCase().startsWith(text);
                });
            }

            if (category !== 'all') {
                newAllProducts = newAllProducts.filter(
                    (product) => product.category === category
                )
            }

            // colors
            if (color !== 'all') {
                newAllProducts = newAllProducts.filter((product) => {
                    return product.colors.find((c) => c === color)
                })
            }

            // company
            if (company !== 'all') {
                newAllProducts = newAllProducts.filter(
                    (product) => product.company === company
                )
            }
            // price
            newAllProducts = newAllProducts.filter((product) => product.price <= price)
            // shipping
            if (shipping) {
                newAllProducts = newAllProducts.filter((product) => product.shipping === true)
            }

            return {
                ...state, filtered_products: newAllProducts
            }
//////////////////
        case CLEAR_FILTERS:
            return {
                ...state.filters,
                text: '',
                color: 'all',
                category: 'all',
                company: 'all',
                price: state.filters.max_price,
                shipping: false,
            }

            throw new Error('No Matching action type')
    }
}

export default filter_reducer;
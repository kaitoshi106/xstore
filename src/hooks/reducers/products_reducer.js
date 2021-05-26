import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
} from "../actions/actions-type";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        products_loading: true,
      };

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products_loading: false,
      };

    case GET_PRODUCTS_SUCCESS:
      const productsList = action.payload;
      const featured_products = productsList.filter (product => 
        product.featured === true
      )
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      }

    case SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: true
      }

    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSidebarOpen: false
      }
    
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false
      }

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload
      }

    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true
      }

    throw new Error('No Matching...')
  }
};

export default reducer;
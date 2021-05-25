import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
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
    
    throw new Error('No Matching')
  }
};

export default reducer;
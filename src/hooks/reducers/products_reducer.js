import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
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
    
    throw new Error('No Matching')
  }
};

export default reducer;
import { ADD_TO_CART } from "../actions/actions-type";

const cart_reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const {id, color, amount, product } = action.payload
            
        throw new Error('No Matching')
    }
}

export default cart_reducer;
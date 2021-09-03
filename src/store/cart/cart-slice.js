import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        changed: false
    },
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            }

            state.totalQuantity++;
            state.changed = true;
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

            state.totalQuantity--;
            state.changed = true;
        },
        replaceCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    }
});

const initialCartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false
};

/*const cartReducer = (state = initialCartState, action) => {
    if (action.type === 'ADD') {
        const newItem = action.payload;
        const oldState = {...state};
        const exisitingItemIdx = oldState.items.findIndex(item => item.id === newItem.id);
        const newItems = oldState.items.slice();
        if (exisitingItemIdx === -1) {
            newItems.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                name: newItem.title
            });
        } else {
            const updatedItem = {
                ...newItems[exisitingItemIdx],
                totalPrice: newItems[exisitingItemIdx].totalPrice + newItems[exisitingItemIdx].price,
                quantity: newItems[exisitingItemIdx].quantity+1
            };
            newItems[exisitingItemIdx] = updatedItem;
        }

        const updatedState = {
            ...oldState,
            items: newItems,
            totalQuantity: oldState.totalQuantity+1,
            changed: true
        };

        return updatedState;
    }
    if (action.type === 'REMOVE') {
        const id = action.payload;
        const existingItemIdx = state.items.findIndex(item => item.id === id);
        let newItems = [...state.items];
        if (newItems[existingItemIdx].quantity === 1) {
            newItems = newItems.filter(item => item.id !== id);
        } else {
            newItems[existingItemIdx] = {
                ...newItems[existingItemIdx],
                totalPrice: newItems[existingItemIdx].totalPrice - newItems[existingItemIdx].price,
                quantity: newItems[existingItemIdx].quantity--
            };
        }

        const updatedState = {
            ...state,
            items: newItems,
            totalQuantity: state.totalQuantity--,
            changed: true
        };

        return updatedState;
    }
    if (action.type === 'REPLACE') {
        const fetchedCart = action.payload;
        return {
            ...state,
            items: fetchedCart.items,
            totalQuantity: fetchedCart.totalQuantity
        };
    }

    return state;
};*/

// export default cartReducer;
export const cartActions = cartSlice.actions;
export default cartSlice;

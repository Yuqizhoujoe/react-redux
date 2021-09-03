import uiSlice from "./ui-slice";
import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cart/cart-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer
    }
});

// Without using Redux Toolkit
/*const rootReducer = combineReducers({
    cart: cartReducer,
    ui: uiSlice.reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));*/

export default store;

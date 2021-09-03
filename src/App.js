import React, {Fragment, useEffect} from "react";
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart/cart-actions";

let isInit = true;

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInit) {
            isInit = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && <Notification {...notification} />}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;

import {uiActions} from "../ui-slice";
import http from "../../shared/axios-instance";
import {cartActions} from "./cart-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data'
            })
        );
        const sendRequest = async () => {
            const res = await http.request({
                url: '/cart.json',
                method: 'put',
                data: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
            });
            const data = await res.data;
            // transform(data)
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Successfully send cart data!!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!!',
                message: 'Failed to send cart data!!'
            }));
        }
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await http.get('/cart.json');
            const data = await res.data;
            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                ...cartData,
                items: cartData.items || []
            }));
            /*dispatch(
                {
                    type: 'REPLACE',
                    payload: {
                        items: cartData.items || [],
                        totalQuantity: cartData.totalQuantity
                    }
                }
            );*/
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!!',
                message: 'Failed to send cart data!!'
            }));
        }
    };
};

import classes from './CartItem.module.css';
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart/cart-slice";

const CartItem = (props) => {
    const dispatch = useDispatch();
    const {name: title, quantity, totalPrice: total, price, id} = props.item;

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
        /*dispatch({
            type: 'REMOVE',
            payload: id
        });*/
    };

    const addItemHandler = () => {
        dispatch(cartActions.addItemToCart(props.item));
        /*dispatch({
            type: 'ADD',
            payload: {...props.item}
        })*/
    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeItemHandler}>-</button>
                    <button onClick={addItemHandler}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
import http from "../shared/axios-instance";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/ui-slice";

const useHttp = () => {
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const sendRequest = useCallback((requestConfig, applyData) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data'
            })
        );
        http
            .request({
                url: requestConfig.url ? requestConfig.url : '',
                method: requestConfig.method ? requestConfig.method : 'get',
                data: requestConfig.data ? requestConfig.data : null
            })
            .then(res => {
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Success',
                    message: 'Successfully send cart data!!'
                }));
                applyData(res.data);
            })
            .catch(error => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!!',
                    message: 'Failed to send cart data!!'
                }));
                setError(error.message);
            });
    }, [dispatch]);

    return {
        error,
        sendRequest
    };
};

export default useHttp;

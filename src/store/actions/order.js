import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

//Holds action creators for submitting an order

//Synchronous action creators
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerFail = (error) => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

//Asynchronous action creators - action we dispatch when we click order button. This has our async code which does NOT return an action.
export const purchaseBurger = (orderData) => {
    return dispatch => {
        //exec wrapped in dispatch so that Action returned to purchaseBurgerStart is dispatched to the store
        dispatch(purchaseBurgerStart())
        axios
            .post("/orders.json", orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))

            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//Order action creators
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = () => {
    //axios get get orders, but first return a functino which vgets dispatched
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(res => {
                //res.data holds the data that we get back from firebase, a JS object where keys are unique ids that firebase generates for us, values are individually data
                //we want to turn orders object into an array
                console.log(res.data)
                const fetchedOrders = [];
                for (let key in res.data) {
                    //push res.data for a given key
                    //id is the key created by firebase
                    fetchedOrders.push({ ...res.data[key], id: key })

                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
                // this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}
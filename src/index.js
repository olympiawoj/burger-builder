import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunk from "redux-thunk"

import burgerBuilderReducer from "./store/reducers/burgerBuilder"
import orderReducer from './store/reducers/order'
import authReducer from "./store/reducers/auth"

const logger = (store) => {
    return next => {
        return action => {
            console.log("Middleware Dispatching", action)
            const result = next(action);
            console.log("Middleware next state", store.getState())
            return result;
        }
    }
}

// const composeEnhancers =
//     typeof window === 'object' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//         }) : compose;


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, enhancer)

const app = (
    //Provider must wrap BrowserRouter 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById("root"));

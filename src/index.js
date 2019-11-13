import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import burgerBuilderReducer from "./store/reducers/burgerBuilder"

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

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const store = createStore(burgerBuilderReducer, enhancer)

const app = (
    //Provider must wrap BrowserRouter 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import { Provider } from "react-redux"
import { createStore } from "redux"

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

const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const app = (
    //Provider must wrap BrowserRouter 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById("root"));

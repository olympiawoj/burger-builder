import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import { Provider } from "react-redux"
import { createStore } from "redux"

import reducer from "./store/reducer"

const store = createStore(reducer)

const app = (
    //Provider must wrap BrowserRouter 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById("root"));

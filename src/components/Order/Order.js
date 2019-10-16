import React from 'react'
import classes from "./Order.module.css"


//need to receive ingredients and price via props
const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Salad ()</p>
        <p>Price<strong>USD 5.45</strong></p>
    </div>
)

export default order;
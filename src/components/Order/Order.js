import React from 'react'
import classes from "./Order.module.css"



//need to receive ingredients and price via props
const order = (props) => {

    //code to transform ingredients to array
    //returns an array of keys
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        //this is the value of the ingredient, but I want to push JS object with also amount
        //but before storing amount, also want to store name of ingredient
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px' }}>{ig.name} ({ig.amount})</span>
    })

    return (

        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price<strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>

    )
}

export default order;
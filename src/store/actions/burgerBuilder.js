//action creators for building a burger - only synchronous action creators for adding and removing ingredients
import * as actionTypes from "./actionTypes"

//place where we dispatch action, onIngredientAdded passes name of ingredient plus payload - extra ingredientName
export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}
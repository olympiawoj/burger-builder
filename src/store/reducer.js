import * as actionTypes from "./actions"

const initialState = {
    //ingredients- to add ingredients, add in ingredient object - we start w/ null b/c in CDM we actually load our starting ingredients from the internet. We'll re-add this, but for now we'll ignore the axios

    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):

            return {
                ...state,
                //ingred is a new JS object where I distribute all properties of state ingredients
                ingredients: {
                    ...state.ingredients,
                    //in ES6, use square brackets to pass variable twhich contains name you actually want to use as property name
                    //ingredientName we get as paylaod from our action, one which we receive as payload will receive a new value
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1

                }
            }

        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        default:
            return state;
    }

}

export default reducer
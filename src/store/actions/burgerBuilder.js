//action creators for building a burger - only synchronous action creators for adding and removing ingredients
import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders";

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

//Return an action I want to dispatch - synchronous action creator I eventually want to dispatch when async code is done. 
export const setIngredients = (ingredients) => {
    return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }
}

export const fetchIngredientsFailed = () => {
    return { type: actionTypes.FETCH_INGREDIENTS_FAILED }
}


//Let's fetch ingredients async - add new action creator
//Return function where I receive dispatch function which I then can use in the function body - syntax available via redux thunk
//Need second action creator above which I return an an action. 
export const initIngredients = () => {
    return dispatch => {
        axios
            .get("https://olympias-burger-app.firebaseio.com/ingredients.json")
            .then(response => {
                //here, .dispatch my setIngredients action creator
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}

    // axios
    //   .get("https://olympias-burger-app.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
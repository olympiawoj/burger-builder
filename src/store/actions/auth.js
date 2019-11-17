import axios from "axios"

//import all action times
import * as actionTypes from "./actionTypes"

//Authentication-related action creators - synchronous


//authStart sets loading state & add spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


//Async Auth action creators - and then return dispatch, a function which gets passed as an arg due to redux thunk & in there, authenticate the user
//Data we need to post can be found in docs - pass JS object which wil be transofmred to JSON by axioa tuo - which has an email, passoword, and returnSecureToken property, a boolean which idicates whehter we want to recieve a token or not
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBicRkQHAct3IYOS7NjEPSH1xEHS8EmrVQ"

        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBicRkQHAct3IYOS7NjEPSH1xEHS8EmrVQ"
        }

        axios.post(url, authData)
            .then((res) => {
                console.log(res)
                //pass on idToken and userId
                dispatch(authSuccess(res.data.idToken, res.data.localId))
            })
            .catch((err) => {
                console.log(err)
                dispatch(authFail(err))
            })

    }
}



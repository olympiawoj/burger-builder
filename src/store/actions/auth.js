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
//logout wil be a synchronous action creator, which will return an action type AUTH_LOGOUT I'll create, 
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate")
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//checkAuthTimeout, passing diff between 
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        //execute function after certain amount of time, execute function logout , call dispatch after expiration time to call logout action
        //Execute function which returns the action which is actually dispatched
        setTimeout(() => {
            dispatch(logout())
            //milliseconds to real seconds
        }, expirationTime * 1000)
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
                // * 1000 b/c JS time works in milliseconds & time we got was in seconds
                //getTime turns into a time, then to turn into an object again wrap into newDate
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem("token", res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                //pass on idToken and userId
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch((err) => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })

    }
}



//Allows us to change authRedirectPath, return action we dispatch 
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        console.log('getting th token', token)
        if (!token) {
            dispatch(logout())
        } else {
            //what we retrieve from localStorage ia s tring, newDate converts into date
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            //use both pieces of info, dispatch authsuccess action creator b/c i know we're logged in, but only want to do this if we haven't passed expiry date
            //If expiration date is smaller or equal to current date, logout
            if (expirationDate < new Date()) {
                dispatch(logout())
            } else {
                // if we're logged in, can get userId
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                //arg is amount of seconds until we should be logged, out, expiration date is the TIME we are logged out, not the amount of seconds
                //Future date in seconds minus current date in seconds , diff is the expiry date
                //Divide by 1000 gives us in seconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
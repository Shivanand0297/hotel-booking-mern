import { createContext, useEffect, useReducer } from "react";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null, // so at the time of loading user will be there in the localstorage so convert it into JSON
    loading: false, // when we click on login button it will be true
    error: null
}

export const AuthContext = createContext(initialState)


// reducer funtion for different action
export const AuthReducer = (state, action)=>{
    switch (action.type) {

        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }

        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }

        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload 
            }

        case "LOGOUT":
            return {
                user: localStorage.clear("user"),
                loading: false,
                error: null 
            }

        default:
            return state
    }
}

// context provider
export const AuthContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(AuthReducer, initialState)
    // using localstorage to save the user
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))    // only string values can be saved in the localStorage
    }, [state.user])    // whenever user state changes we want to update the localstorage

    return(
        <AuthContext.Provider 
        value={{ 
            user: state.user, 
            loading: state.loading, 
            error: state.error, 
            dispatch 
        }} 
        >
            {children}
        </AuthContext.Provider>
    )
}

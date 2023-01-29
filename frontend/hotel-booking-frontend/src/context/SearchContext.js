import { createContext, useReducer } from "react";

const initialState = {
    city: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        rooms: undefined
    }
}

export const SearchContext = createContext(initialState)


// reducer funtion for different action
export const SearchReducer = (state, action)=>{
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload   
        case "RESET_SEARCH":
            return initialState
        default:
            return state
    }
}

// context provider
export const SearchContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(SearchReducer, initialState)

    return(
        <SearchContext.Provider value={{ city: state.city, date: state.date, options: state.options, dispatch }} >
            {children}
        </SearchContext.Provider>
    )
}
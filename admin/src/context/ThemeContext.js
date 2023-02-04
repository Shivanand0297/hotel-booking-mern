import { createContext, useReducer } from "react"
import {reducer} from "./reducer"

// initial state of theme
const INITIAL_STATE = {
  darkMode: false
}

// theme context
export const ThemeContext = createContext(INITIAL_STATE)

// context provider
export const ThemeContextProvider = ({children}) =>{

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return(
    <ThemeContext.Provider value={{ darkMode: state.darkMode, dispatch}} >
      {children}
    </ThemeContext.Provider>
  )
}
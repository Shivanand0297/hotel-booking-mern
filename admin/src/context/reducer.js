import { DARK, LIGHT, TOGGLE } from "./action.type"

export const reducer = (state, action) =>{
  switch(action.type){
    case DARK: 
      return { darkMode: true }
    case LIGHT: 
      return { darkMode: false }
    case TOGGLE: 
      return { darkMode : !state.darkMode }
    default:
      return state
  }
}
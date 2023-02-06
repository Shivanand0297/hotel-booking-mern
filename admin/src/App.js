import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single"
import New from "./pages/new/New"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { hotelInputs, productInputs, roomInputs, userInputs } from "./pages/new/formSource"
import { useContext } from "react"
import { ThemeContext } from "./context/ThemeContext"
import { AuthContext } from "./context/AuthContext"
import "./theme/darkTheme.scss"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { hotelColumn, roomColumn, userColumn } from "./components/dataTable/dataTableSource"
import NewHotel from "./pages/newHotel/NewHotel"
import NewRoom from "./pages/newRoom/NewRoom"


const App = () => {
  const {darkMode} = useContext(ThemeContext)

  const {user} = useContext(AuthContext)

  // function to protect route
  const ProtectedRoutes = ({children}) =>{
    // if no admin
    if(!user){
      return <Navigate to="/login" />
    }

    return children
  }
  return (
    <div className={ darkMode ? "app dark" : "app"} >
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route path="login" element={<Login/>} />
            <Route index element={<ProtectedRoutes> <Home/> </ProtectedRoutes>} />
            <Route path="users">
              <Route index element={ <ProtectedRoutes> <List column={userColumn} item="Users" /> </ProtectedRoutes> } />  
              <Route path=":userId" element={ <ProtectedRoutes> <Single/> </ProtectedRoutes> } />  
              <Route path="new" element={<ProtectedRoutes> <New inputs={userInputs} title="Add New User" /> </ProtectedRoutes>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoutes> <List column={hotelColumn} item="Hotels" /> </ProtectedRoutes>} />  
              <Route path=":hotelID" element={ <ProtectedRoutes> <Single/> </ProtectedRoutes> } />  
              <Route path="new" element={<ProtectedRoutes> <NewHotel /> </ProtectedRoutes>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoutes> <List column={roomColumn} item="Rooms" /> </ProtectedRoutes>} />  
              <Route path=":roomID" element={ <ProtectedRoutes> <Single/> </ProtectedRoutes>  } />  
              <Route path="new" element={<ProtectedRoutes> <NewRoom /> </ProtectedRoutes>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App
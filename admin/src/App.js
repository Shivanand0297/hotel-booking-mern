// components
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import SingleUser from "./pages/singleUser/SingleUser"
import New from "./pages/new/New"
import NewHotel from "./pages/newHotel/NewHotel"
import NewRoom from "./pages/newRoom/NewRoom"
import SingleHotel from "./pages/singleHotel/SingleHotel"
import SingleRoom from "./pages/singleRoom/SingleRoom"

// data
import { hotelColumn, roomColumn, userColumn } from "./components/dataTable/dataTableSource"
import { userInputs } from "./pages/new/formSource"

// router imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// auth and theme context
import { ThemeContext } from "./context/ThemeContext"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"

// toastify container and css
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// dark theme scss
import "./theme/darkTheme.scss"


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
              <Route path=":userId" element={ <ProtectedRoutes> <SingleUser/> </ProtectedRoutes> } />  
              <Route path="new" element={<ProtectedRoutes> <New inputs={userInputs} title="Add New User" /> </ProtectedRoutes>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoutes> <List column={hotelColumn} item="Hotels" /> </ProtectedRoutes>} />  
              <Route path=":hotelID" element={ <ProtectedRoutes> <SingleHotel/> </ProtectedRoutes> } />  
              <Route path="new" element={<ProtectedRoutes> <NewHotel /> </ProtectedRoutes>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoutes> <List column={roomColumn} item="Rooms" /> </ProtectedRoutes>} />  
              <Route path=":roomID" element={ <ProtectedRoutes> <SingleRoom/> </ProtectedRoutes>  } />  
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
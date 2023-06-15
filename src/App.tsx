import React from 'react'

import Login from "./pages/Auth/Login"
import HomePage from './pages/Homepage/HomePage'
import Register from './pages/Auth/Register'
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound/NotFound"
import Posts from './components/Posts'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { loggedInUser } from './redux/features/AuthSlice'
import Emoji from './components/Emoji'
interface user {
  loggedIn ?: boolean
}
const App = () => {
  const user :user = useSelector(loggedInUser)

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={user?.loggedIn ? <HomePage/> : <Navigate to="/login"/>}/>
          <Route path='/posts' element={user?.loggedIn ? <Posts/> : <Navigate to="/login"/> }/>
          <Route path='/profile/:id' element={user?.loggedIn ? <Profile/> : <Navigate to="/login"/>}/>
          <Route path='/' element={user?.loggedIn ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
          <Route path='/emoji' element={<Emoji/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
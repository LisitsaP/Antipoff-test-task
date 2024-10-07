import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { SignIn } from './pages/SineIn/SignIn'
import UserDetails from './pages/UserPage/UserPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/> }/>
      <Route path="/sign-in" element = {<SignIn/> }/>
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  )
}

export default App

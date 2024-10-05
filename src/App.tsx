import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { SignIn } from './pages/SineIn/SignIn'

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/> }/>
      <Route path="/sign-in" element = {<SignIn/> }/>
    </Routes>
  )
}

export default App

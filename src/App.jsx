
import './App.css'

import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home.jsx";
import {Login} from "./pages/login/Login.jsx";
import {Register} from "./pages/register/Register.jsx";


function App() {

  return (
      <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/register'} element={<Register/>} />
      </Routes>
  )
}

export default App

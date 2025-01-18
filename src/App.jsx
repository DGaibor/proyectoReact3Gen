
import './App.css'

import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home.jsx";
import {Login} from "./pages/login/Login.jsx";
import {Register} from "./pages/register/Register.jsx";
import {UpdateProfile} from "./pages/profile/update/UpdateProfile.jsx";
import {FlatCreate} from "./pages/flat/create/FlatCreate.jsx";
import {FlatView} from "./pages/flat/view/FlatView.jsx";


function App() {

  return (
      <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/register'} element={<Register/>} />
          <Route path={'/profile/update/:id'} element={<UpdateProfile/>} />
          <Route path={'/profile/update'} element={<UpdateProfile/>} />
          <Route path={'/flat/create'} element={<FlatCreate/>} />
          <Route path={'/flat/:id'} element={<FlatView/>} />
      </Routes>
  )
}

export default App

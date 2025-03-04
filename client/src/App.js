
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Nav from './components/nav/nav';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userCurrent } from './JS/userSlice/userSlice';
import Profil from './components/Account/Profil';
import PrivateRoute from './Routes/PrivateRoutes';
import Accueil from './components/Accueil/Accueil';
import PrivateRoutelogin from './Routes/PrivateRouteLogin';



function App() {
  const { data: user } = useSelector((state) => state.user);
  





  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Accueil />} />
        {/* <Route path="/account/login" element={<Login />} /> */}
        {/* <Route  element={<PrivateRoutelogin />}> */}
        <Route path="/account/login" element={<Login />} />
        {/* </Route>{" "} */}
        
        {/* <Route path="/account/signup" element={<Register />} /> */}
        {/* <Route  element={<PrivateRoutelogin />}> */}
        <Route path="/account/signup" element={<Register />} />
        {/* </Route>{" "} */}
        {/* <Route  element={<PrivateRoute />}> */}
        {/* <Route path="/account/profile"  element={user ?<Profil />} /> */}
        <Route path="/account/profile" element={user ? <Profil /> : <p>Veuillez vous connecter</p>} />
        {/* </Route>{" "} */}
      </Routes>
    </div>
  );
}

export default App;

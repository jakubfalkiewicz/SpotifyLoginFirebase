import React from 'react';
import Register from './modules/HomeModule/components/Register';
import Login from './modules/HomeModule/components/Login';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './modules/HomeModule/components/Home';
import { useSelector } from "react-redux"
import { RootState } from './redux/store';

const App: React.FC = () => {
  const storedUser = sessionStorage.getItem('user');
  let user

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    const userHandler = useSelector((state: RootState) => state.userHandler);
    user = userHandler?.user;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={user.loggedIn ? <Home user={user} /> : <Navigate to='/login' />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {/* } */}
    </>
  )
}

  ;

export default App;

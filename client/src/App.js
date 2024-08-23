import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'

const Protected = () => {
  const token = sessionStorage.getItem('session')

  return token ? <Outlet /> : <Navigate to="/" />
}

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route element={<Protected />}>
        <Route exact path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

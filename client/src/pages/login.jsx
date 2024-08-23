import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Form from '../components/Form'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      navigate('/profile')
    }
  }, [])
  return (
    <div className="w-full h-full flex items-center flex-col justify-center">
      <img src={Logo} alt="smart pump logo" className="mx-auto w-32 h-32" />
      <Form />
    </div>
  )
}

export default Login

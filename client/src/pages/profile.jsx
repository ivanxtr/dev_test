import React, { useEffect, useState, useCallback } from 'react'
import Nav from '../components/Nav'
import UserData from '../components/UserData'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const navigate = useNavigate()

  const fetchUser = useCallback(async (session) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${session}`,
        { credentials: 'include' }
      )
      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem('session')
          return navigate('/')
        }
        throw new Error('Something is broken!');
      }
      const data = await response.json()
      setUser(data)
    } catch (error) {
      return error
    }
  }, [])

  useEffect(() => {
    const session = sessionStorage.getItem('session')
    fetchUser(session)
  }, [])

  return (
    <div className="w-full">
      <Nav />
      {user && (
        <div className="flex items-center w-full h-full flex-col mt-16">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user.picture}
            alt="Bonnie image"
          />
          <div className="flex mt-4 md:mt-6">
            <button
              href="#"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800 mx-2 ${isEditing ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-800'}`}
              disabled={isEditing}
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? 'Hide Balance' : 'Show Balance'}
            </button>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800 ${showBalance ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-800'}`}
              onClick={() => setIsEditing(!isEditing)}
              disabled={showBalance}
            >
              {!isEditing ? 'Edit' : 'Profile'}
            </button>
          </div>
          {!showBalance && (
            <UserData
              user={user}
              isEditing={isEditing}
              callback={setUser}
              setIsEditing={setIsEditing}
            />
          )}
          {showBalance && (
            <div className="w-full max-w-sm bg-white border-gray-200 rounded-lg dark:bg-white dark:border-white md:mt-6">
              <div className="flex flex-col items-center pb-10">
                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-black flex items-center">
                  {' '}
                  Your Balance is:
                </h5>
                <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-black flex items-center">
                  {user.balance}
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile

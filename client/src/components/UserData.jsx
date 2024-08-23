import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const UserData = ({ user, isEditing, callback, setIsEditing }) => {
  const formRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const session = sessionStorage.getItem('session')
    const first = formRef.current.first.value
    const last = formRef.current.last.value
    const address = formRef.current.address.value
    const email = formRef.current.email.value
    const phone = formRef.current.phone.value
    const company = formRef.current.company.value

    const body = {
      name: { first, last },
      address,
      email,
      phone,
      company,
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${session}`,
        {
          credentials: 'include',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem('session')
          return navigate('/')
        }
        throw new Error('Something is broken!');
      }
      const data = await response.json()
      callback(data)
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full max-w-sm bg-white border-gray-200 rounded-lg dark:bg-white dark:border-white mt-6">
      <div className="flex flex-col items-center pb-10">
        {!isEditing && (
          <>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black flex items-center">
              <span className="inline-flex items-center font-medium px-1 mb-1 rounded-full">
                <span
                  className={`w-2 h-2 me-1 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </span>
              {`${user.name.first} ${user.name.last}`}, {user.age}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.address}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.phone}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.company}
            </span>
          </>
        )}
        {isEditing && (
          <>
            <form ref={formRef}>
              <input
                type="text"
                name="first"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Name"
                defaultValue={user.name.first}
              />
              <input
                type="text"
                name="last"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Name"
                defaultValue={user.name.last}
              />
              <input
                type="text"
                name="address"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Address"
                defaultValue={user.address}
              />
              <input
                type="text"
                name="email"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Email"
                defaultValue={user.email}
              />
              <input
                type="text"
                name="phone"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Phone"
                defaultValue={user.phone}
              />
              <input
                type="text"
                name="company"
                className="w-full px-3 py-2 mt-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="Company"
                defaultValue={user.company}
              />
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default UserData

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getCurrentUserDetails } from "../lib/supabase";
import { Alert } from 'react-native'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { user, error } = await getCurrentUser()
      if (error) {
        alert(error, [{text: "Ok"}])
      }
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
        const { data, error } = await getCurrentUserDetails(user)
        if (data) {
          const { username } = data
          setUsername(username)
        }
      }
      else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })();
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        username,
        setUsername
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
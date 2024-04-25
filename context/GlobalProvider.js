import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/supabase";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(({ data, error }) => {
        if (error) { console.log(res.error) }
        else {
          if (data) {
            setUser(data)
            setIsLoggedIn(true)
          }
          else {
            isLoggedIn(false)
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
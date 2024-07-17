import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getCurrentUserDetails } from "../lib/supabase";
import { Alert } from 'react-native'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

// TODO: Add a way to store whether user has joined a hunt
export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [userJoinedHuntId, setUserJoinedHuntId] = useState(null)
  const [userJoinedHuntTeamId, setUserJoinedHuntTeamId] = useState(null)
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
          const { username, huntId, teamId } = data
          setUsername(username)
          if (huntId) setUserJoinedHuntId(huntId)
          if (teamId) setUserJoinedHuntTeamId(teamId)
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
        setUsername,
        userJoinedHuntId,
        setUserJoinedHuntId,
        userJoinedHuntTeamId,
        setUserJoinedHuntTeamId
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
import { createContext } from "react"
import { useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username:	 JSON.parse(localStorage.getItem("currentUser")).username,
    name:	 JSON.parse(localStorage.getItem("currentUser")).name,
    avatar_url:	 JSON.parse(localStorage.getItem("currentUser")).avatar_url
  })

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}
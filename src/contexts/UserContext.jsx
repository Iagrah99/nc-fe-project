import { createContext } from "react"
import { useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username:	"tickle122",
    name:	"Tom Tickle",
    avatar_url:	"https://res.cloudinary.com/dafsdsmus/image/upload/v1745597600/tomtickle_l7hyac_gq6mrf.png"
  })

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}
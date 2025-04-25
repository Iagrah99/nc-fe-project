import { createContext } from "react"
import { useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username:	"guest",
    name:	"Guy Guest",
    avatar_url:	"https://res-console.cloudinary.com/dafsdsmus/thumbnails/v1/image/upload/v1745620542/R3Vlc3RfVXNlcl9ha3lkdTQ=/drilldown"
  })

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}
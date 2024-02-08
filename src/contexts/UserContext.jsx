import { createContext } from "react"
import { useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username:	"tickle122",
    name:	"Tom Tickle",
    avatar_url:	"https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
  })

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}
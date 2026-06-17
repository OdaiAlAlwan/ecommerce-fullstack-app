import { createContext,  } from "react";
import { useSelector } from "react-redux";


export const User = createContext({})


export default function UserProvider({children}) {
    const { role } = useSelector(state=>state.auth)
    return (
        <User.Provider value={{ role }}>{children}</User.Provider>
    ) 
}

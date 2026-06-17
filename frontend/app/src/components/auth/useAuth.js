import { useContext } from 'react'
import { User } from './ContextUser'


const useAuth = () => {
    return useContext(User)
}
export default useAuth;
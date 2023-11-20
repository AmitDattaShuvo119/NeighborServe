import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import axios from "axios";

const useUser = () => {
    const {user, loading} = useAuth();
 
    const {data: isUser, isLoading: isUserLoading} = useQuery({
        queryKey: ['isUser', user?.email],
         enabled: loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/user/${user?.email}`)
            
            return res.data.User;
           
        }
        
    })
    return [isUser,isUserLoading]
};

export default useUser;
import axios from 'axios';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useProvider = () => {
    const {user, loading} = useAuth();
   
    const {data: isProvider, isLoading: isProviderLoading} = useQuery({
        queryKey: ['isProvider', user?.email],
        // enabled: loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/provider/${user?.email}`);
                
            return res.data.provider;
        }
    })
    return [isProvider, isProviderLoading]
};

export default useProvider;
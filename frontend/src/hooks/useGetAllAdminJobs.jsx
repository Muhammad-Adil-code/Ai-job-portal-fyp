import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const fetchAllAdminJobs = async (dispatch) => {
    try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
        if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs));
        }
    } catch (error) {
        console.log(error);
    }
}

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        fetchAllAdminJobs(dispatch);
    },[dispatch])
}

export default useGetAllAdminJobs
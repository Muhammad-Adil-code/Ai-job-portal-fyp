import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, PREDICTION_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [predictionLoading, setPredictionLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionError, setPredictionError] = useState(null);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        stream: '',
        internships: '',
        cgpa: '',
        backlogs: ''
    });

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePredictionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handlePredictionSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyButtonClick = () => {
        if (!user) {
            toast.error('You must be logged in to apply for a job.');
            setTimeout(() => navigate('/login'), 1000);
            return;
        }
        if (!isApplied) setShowModal(true);
    };

    const handleApplyWithPrediction = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('You must be logged in to apply for a job.');
            return;
        }
        setLoading(true);
        setPredictionError(null);
        try {
            // Map formData to what the prediction API expects
            const genderMap = { male: 'Male', female: 'Female' };
            const streamMap = {
                'computer-science': 'Computer Science',
                'electrical': 'Electrical',
                'mechanical': 'Mechanical',
                'civil': 'Civil',
                'chemical': 'Chemical',
            };
            const predictionPayload = {
                age: Number(formData.age),
                gender: genderMap[formData.gender],
                stream: streamMap[formData.stream],
                internships: Number(formData.internships),
                cgpa: Number(formData.cgpa),
                history_of_backlogs: formData.backlogs === 'yes' ? 1 : 0,
            };
            // Call prediction API
            const predictionRes = await axios.post(PREDICTION_API_END_POINT, predictionPayload);
            const predictionResult = predictionRes.data;
            if (!predictionResult.success) {
                setPredictionError(predictionResult.error || 'Prediction failed');
                setLoading(false);
                return;
            }
            // Submit application with prediction data
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                ...formData,
                prediction: {
                    probability: predictionResult.probability,
                    confidence: predictionResult.probability, // or use another field if available
                }
            }, { withCredentials: true });
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success('Application submitted with prediction!');
                setShowModal(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            setPredictionError(error.response?.data?.error || error.response?.data?.message || error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={handleApplyButtonClick}
                            disabled={isApplied}
                            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Placement Prediction & Application</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleApplyWithPrediction} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input type="number" name="age" placeholder="Age (18-28)" value={formData.age} onChange={handlePredictionChange} min="18" max="28" required className="bg-gray-900/50 border-purple-500/20 text-white" />
                                <Select onValueChange={v => handlePredictionSelect('gender', v)} required>
                                    <SelectTrigger className="bg-gray-900/50 border-purple-500/20 text-white">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-purple-500/20">
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={v => handlePredictionSelect('stream', v)} required>
                                    <SelectTrigger className="bg-gray-900/50 border-purple-500/20 text-white">
                                        <SelectValue placeholder="Select Stream" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-purple-500/20">
                                        <SelectItem value="computer-science">Computer Science</SelectItem>
                                        <SelectItem value="electrical">Electrical</SelectItem>
                                        <SelectItem value="mechanical">Mechanical</SelectItem>
                                        <SelectItem value="civil">Civil</SelectItem>
                                        <SelectItem value="chemical">Chemical</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input type="number" name="internships" placeholder="Internships (0-3)" value={formData.internships} onChange={handlePredictionChange} min="0" max="3" required className="bg-gray-900/50 border-purple-500/20 text-white" />
                                <Input type="number" name="cgpa" placeholder="CGPA (0-4)" value={formData.cgpa} onChange={handlePredictionChange} min="0" max="4" step="0.01" required className="bg-gray-900/50 border-purple-500/20 text-white" />
                                <Select onValueChange={v => handlePredictionSelect('backlogs', v)} required>
                                    <SelectTrigger className="bg-gray-900/50 border-purple-500/20 text-white">
                                        <SelectValue placeholder="Any Backlogs?" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-purple-500/20">
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Apply'}
                            </Button>
                        </form>
                        {predictionError && <div className="text-red-500 mt-2">{predictionError}</div>}
                    </DialogContent>
                </Dialog>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
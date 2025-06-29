import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Loader2, User2, Mail, Phone, Building2, Briefcase, GraduationCap, MapPin, Upload, Edit2, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        role: '',
        stream: '',
        company: '',
        location: ''
    });
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                role: user.role || '',
                stream: user.stream || '',
                company: user.company || '',
                location: user.location || ''
            });
        }
    }, [user]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phoneNumber', input.phoneNumber);
            formData.append('role', input.role);
            formData.append('stream', input.stream);
            formData.append('company', input.company);
            formData.append('location', input.location);
            if (file) {
                formData.append('file', file);
            }

            const res = await fetch(`${USER_API_END_POINT}/update`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setUser(data.user));
                toast.success(data.message);
                setEditMode(false);
                useGetAppliedJobs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-black">
            <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center space-x-4">
                                    <div className="relative group">
                                        <Avatar className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                                            <AvatarImage src={user?.profile?.profilePhoto || user?.avatar} alt={user.fullname} />
                                        </Avatar>
                                        {editMode && (
                                            <label className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-colors">
                                                <Upload className="w-4 h-4 text-white" />
                                                <input
                                                    type="file"
                                                    onChange={changeFileHandler}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{user.fullname}</h2>
                                        <p className="text-purple-400">{user.role}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setEditMode(!editMode)}
                                    className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                >
                                    {editMode ? (
                                        <>
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </>
                                    )}
                                </Button>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                            <Input
                                                type="text"
                                                name="fullname"
                                                value={input.fullname}
                                                onChange={changeEventHandler}
                                                disabled={!editMode}
                                                className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={input.email}
                                                onChange={changeEventHandler}
                                                disabled={!editMode}
                                                className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                            <Input
                                                type="tel"
                                                name="phoneNumber"
                                                value={input.phoneNumber}
                                                onChange={changeEventHandler}
                                                disabled={!editMode}
                                                className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    {user.role === 'student' ? (
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Stream</label>
                                                <Input
                                                    type="text"
                                                    name="stream"
                                                    value={input.stream}
                                                    onChange={changeEventHandler}
                                                    disabled={!editMode}
                                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                                                <Input
                                                    type="text"
                                                    name="company"
                                                    value={input.company}
                                                    onChange={changeEventHandler}
                                                    disabled={!editMode}
                                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                                            <Input
                                                type="text"
                                                name="location"
                                                value={input.location}
                                                onChange={changeEventHandler}
                                                disabled={!editMode}
                                                className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {editMode && (
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-[5px]'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog />
        </div>
    );
};

export default Profile;
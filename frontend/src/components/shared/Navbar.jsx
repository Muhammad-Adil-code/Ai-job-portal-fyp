import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-gray-900 border-b border-purple-500/20">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF4E50] to-[#F9D423] text-transparent bg-clip-text">
                        Verto
                    </h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="text-gray-300 hover:text-purple-400 transition-colors">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="text-gray-300 hover:text-purple-400 transition-colors">Jobs</Link>
                                </li>
                            </>
                        ) : user && user.role === 'student' ? (
                            <>
                                <li>
                                    <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="text-gray-300 hover:text-purple-400 transition-colors">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="text-gray-300 hover:text-purple-400 transition-colors">Browse</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="text-gray-300 hover:text-purple-400 transition-colors">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="text-gray-300 hover:text-purple-400 transition-colors">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-purple-500">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-gray-800 border-purple-500/20">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer border-2 border-purple-500">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium text-white">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-300">
                                        {user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
                                                <User2 />
                                                <Button variant="link" className="text-gray-300 hover:text-purple-400">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link" className="text-gray-300 hover:text-purple-400">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

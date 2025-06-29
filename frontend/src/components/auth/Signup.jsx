import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { UserPlus, User2, Building2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'student',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phoneNumber', input.phoneNumber);
            formData.append('password', input.password);
            formData.append('role', input.role);
            formData.append('file', input.file);

            const res = await fetch(`${USER_API_END_POINT}/register`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="relative group w-full max-w-md">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <UserPlus className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-white mb-8">Create Account</h2>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label className="relative group flex-1">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="peer sr-only"
                                />
                                <div className="relative bg-gray-900/50 border border-purple-500/20 rounded-lg p-4 text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-500/10 transition-all duration-300">
                                    <User2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <span className="text-white">Student</span>
                                </div>
                            </label>

                            <label className="relative group flex-1">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="peer sr-only"
                                />
                                <div className="relative bg-gray-900/50 border border-purple-500/20 rounded-lg p-4 text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-500/10 transition-all duration-300">
                                    <Building2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <span className="text-white">Recruiter</span>
                                </div>
                            </label>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <label className="flex items-center justify-center w-full h-12 bg-gray-900/50 border border-purple-500/20 rounded-lg cursor-pointer hover:border-purple-500/40 transition-all duration-300">
                                    <div className="flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-purple-500 mr-2" />
                                        <span className="text-white">Upload Profile Photo</span>
                                    </div>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <p className="text-center text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
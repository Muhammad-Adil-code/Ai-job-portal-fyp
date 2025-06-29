import React, { useState } from 'react';
import { PREDICTION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Brain, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const JobPrediction = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        stream: '',
        internships: '',
        cgpa: '',
        backlogs: ''
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post(PREDICTION_API_END_POINT, formData);
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <Brain className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-white mb-8">AI Job Placement Predictor</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        name="age"
                                        placeholder="Age (18-28)"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="18"
                                        max="28"
                                        required
                                        className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                                        <SelectTrigger className="w-full bg-gray-900/50 border-purple-500/20 text-white">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-purple-500/20">
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Select onValueChange={(value) => handleSelectChange('stream', value)}>
                                        <SelectTrigger className="w-full bg-gray-900/50 border-purple-500/20 text-white">
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
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        name="internships"
                                        placeholder="Number of Internships (0-3)"
                                        value={formData.internships}
                                        onChange={handleChange}
                                        min="0"
                                        max="3"
                                        required
                                        className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        name="cgpa"
                                        placeholder="CGPA (0-4)"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        min="0"
                                        max="4"
                                        step="0.01"
                                        required
                                        className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative">
                                    <Select onValueChange={(value) => handleSelectChange('backlogs', value)}>
                                        <SelectTrigger className="w-full bg-gray-900/50 border-purple-500/20 text-white">
                                            <SelectValue placeholder="Any Backlogs?" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-purple-500/20">
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Predict Placement'
                            )}
                        </Button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-6 p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Prediction Result</h3>
                            <p className="text-gray-300 mb-2">
                                Placement Probability: <span className="text-purple-400 font-semibold">{result.probability}%</span>
                            </p>
                            <p className="text-gray-300">
                                Confidence Score: <span className="text-purple-400 font-semibold">{result.confidence}%</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobPrediction; 
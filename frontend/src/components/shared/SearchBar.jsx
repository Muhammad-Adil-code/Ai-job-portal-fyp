import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStream, setSelectedStream] = useState('');

    const handleSearch = () => {
        onSearch({ query: searchQuery, stream: selectedStream });
    };

    return (
        <div className="w-full max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
            <div className="bg-gray-800 backdrop-blur-sm rounded-xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                        </div>
                    </div>
                    
                    <div className="w-full md:w-48 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative">
                            <Select onValueChange={setSelectedStream}>
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

                    <Button 
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar; 
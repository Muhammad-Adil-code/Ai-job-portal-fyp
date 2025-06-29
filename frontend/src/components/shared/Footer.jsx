import React from 'react';
import { Star, Users, Briefcase, Award } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer",
        company: "TechCorp",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "AmritaHire helped me find my dream job! The AI prediction feature gave me valuable insights into my career path."
    },
    {
        name: "Michael Chen",
        role: "Data Scientist",
        company: "DataFlow",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        text: "The platform's intuitive interface and smart matching made my job search efficient and successful."
    },
    {
        name: "Priya Sharma",
        role: "Product Manager",
        company: "InnovateX",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "As a recruiter, I've found exceptional talent through AmritaHire. The AI-powered matching is impressive!"
    }
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Testimonials Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                    Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-purple-400">{testimonial.role} at {testimonial.company}</p>
                                </div>
                            </div>
                            <p className="text-gray-400">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recruiter Section */}
            <div className="bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            Find Your Perfect Match
                        </h2>
                        <p className="text-lg mb-8 text-gray-400">
                            Join thousands of companies who trust AmritaHire to find their next great hire. Our AI-powered platform helps you connect with qualified candidates faster.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="flex flex-col items-center">
                                <Users className="w-12 h-12 text-purple-500 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Large Talent Pool</h3>
                                <p className="text-gray-400">Access thousands of qualified candidates</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Briefcase className="w-12 h-12 text-purple-500 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
                                <p className="text-gray-400">AI-powered candidate matching</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Award className="w-12 h-12 text-purple-500 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Quality Hires</h3>
                                <p className="text-gray-400">Verified profiles and skills</p>
                            </div>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors">
                            Post a Job Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="container mx-auto px-4 py-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-white">AmritaHire</h2>
                        <p className="text-sm text-gray-400">© AIE22037 AIE22041 AIE22031. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Twitter">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="LinkedIn">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
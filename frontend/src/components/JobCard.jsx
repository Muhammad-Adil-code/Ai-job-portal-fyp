import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Briefcase, Clock, GraduationCap, Star } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';

const JobCard = ({ job }) => {
    const [hovered, setHovered] = useState(false);
    const [saved, setSaved] = useState(false);
    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.15}
            scale={1.04}
            transitionSpeed={900}
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            className="w-full"
        >
            <motion.div
                className="group relative cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                initial={{ boxShadow: '0 2px 16px 0 rgba(30,40,90,0.10)' }}
                animate={{ boxShadow: hovered ? '0 8px 32px 0 rgba(30,40,90,0.18)' : '0 2px 16px 0 rgba(30,40,90,0.10)' }}
                transition={{ duration: 0.3 }}
            >
                {/* Glassmorphism background */}
                <div className="absolute -inset-0.5 rounded-2xl bg-white/10 backdrop-blur-md border border-blue-400/20 shadow-xl z-0" />
                <div className="relative z-10 rounded-2xl p-6 min-h-[320px] flex flex-col justify-between overflow-hidden">
                    {/* Save Icon */}
                    <motion.button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-yellow-400/80 transition-colors border border-blue-200 shadow"
                        onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
                        whileTap={{ scale: 1.2 }}
                        aria-label="Save Job"
                    >
                        <motion.span
                            initial={false}
                            animate={saved ? { scale: [1, 1.4, 1], color: '#FFD600' } : { scale: 1, color: '#2a3553' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <Star className="w-5 h-5" fill={saved ? '#FFD600' : 'none'} />
                        </motion.span>
                        {/* Burst effect */}
                        <AnimatePresence>
                            {saved && (
                                <motion.span
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    initial={{ opacity: 1, scale: 0.7 }}
                                    animate={{ opacity: 0, scale: 2.2 }}
                                    exit={{ opacity: 0 }}
                                    style={{ zIndex: 1 }}
                                >
                                    <span className="block w-6 h-6 rounded-full bg-yellow-300/60 blur-sm" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                    {/* Company Logo or Icon */}
                    <div className="flex items-center space-x-4 mb-4">
                        {job.logo ? (
                            <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-contain border border-blue-200 bg-white/40" />
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-blue-900/40 border border-blue-200 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-blue-400" />
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-bold text-blue-900 group-hover:text-blue-700 transition-colors font-[Montserrat,Arial,sans-serif]">
                                {job.title}
                            </h3>
                            <p className="text-blue-500 font-medium">{job.company}</p>
                        </div>
                    </div>
                    {/* Info Reveal Animation */}
                    <div className="flex-1">
                        <AnimatePresence initial={false}>
                            {!hovered ? (
                                <motion.div
                                    key="main-info"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-blue-700">
                                            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center text-blue-700">
                                            <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>{job.experience} years</span>
                                        </div>
                                        <div className="flex items-center text-blue-700">
                                            <GraduationCap className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>{job.stream}</span>
                                        </div>
                                        <div className="flex items-center text-blue-700">
                                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {job.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 border border-blue-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="hover-info"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="mb-4">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-blue-900 font-bold text-lg">Salary:</span>
                                            <span className="text-blue-700 font-semibold">{job.salary} LPA</span>
                                        </div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-blue-900 font-bold text-lg">Experience:</span>
                                            <span className="text-blue-700 font-semibold">{job.experience} years</span>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="flex justify-end"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                                    >
                                        <Link
                                            to={`/description/${job._id}`}
                                            className="inline-flex items-center px-5 py-2 text-base font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg shadow-lg hover:from-yellow-300 hover:to-yellow-200 transform hover:scale-105 transition-all duration-300 animate-pulse"
                                        >
                                            Apply Now
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </Tilt>
    );
};

export default JobCard;

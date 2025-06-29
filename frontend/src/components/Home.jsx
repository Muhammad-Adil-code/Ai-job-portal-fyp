import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Search, Briefcase, Users, Brain, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Job with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                AI-Powered Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with top companies, get personalized job recommendations, and predict your placement success with our advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300">
                  <Brain className="w-5 h-5 mr-2" />
                  With AI Prediction
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Job Search</h3>
              <p className="text-gray-400">Find the perfect job match with our AI-powered recommendation system.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Prediction</h3>
              <p className="text-gray-400">Get insights into your placement probability with our advanced AI model.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Top Companies</h3>
              <p className="text-gray-400">Connect with leading companies and explore exciting career opportunities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-800 backdrop-blur-sm rounded-lg p-12 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Career Journey?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students who have found their dream jobs through AmritaHire.
              </p>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto bg-[#181c2a] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-12 border border-blue-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 font-[Montserrat,Arial,sans-serif]">Contact Us</h2>
          <p className="text-blue-100 mb-6 text-sm sm:text-base">Have questions, feedback, or want to partner with us? Fill out the form below and our team will get back to you soon.</p>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Your Name" className="flex-1 px-4 py-2 rounded-lg border border-blue-700 bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input type="email" placeholder="Your Email" className="flex-1 px-4 py-2 rounded-lg border border-blue-700 bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
            <textarea placeholder="Your Message" className="w-full px-4 py-2 rounded-lg border border-blue-700 bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" rows={4} required />
            <button type="submit" className="w-full sm:w-auto bg-yellow-400 text-blue-900 font-bold px-8 py-2 rounded-lg shadow hover:bg-yellow-300 transition-colors">Send Message</button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#101a2b] text-white py-10 md:py-12 border-t border-blue-900">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 px-4">
          {/* Brand/About */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF4E50] to-[#F9D423] text-transparent bg-clip-text mb-2">Verto</h2>
            <p className="text-blue-200 mb-4 text-sm">Empowering your career journey with AI. Discover jobs, predict your placement, and connect with top companies.</p>
            <div className="flex gap-4 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-yellow-400 transition-colors">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.768 1.197-1.768 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.563 2.841-1.563 3.04 0 3.601 2.002 3.601 4.604v4.726z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-400 transition-colors">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636a9.936 9.936 0 0 0 2.457-2.548l-.047-.02z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-yellow-400 transition-colors">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/jobs" className="hover:text-yellow-400 transition-colors">Jobs</a></li>
              <li><a href="/browse" className="hover:text-yellow-400 transition-colors">Browse</a></li>
              <li><a href="/admin/jobs" className="hover:text-yellow-400 transition-colors">Recruiter Dashboard</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Email: <a href="mailto:info@verto.com" className="hover:text-yellow-400 transition-colors">info@verto.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-yellow-400 transition-colors">+1 234 567 890</a></li>
            </ul>
          </div>
          {/* About/Legal */}
          <div>
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-blue-200 mb-2 text-sm">Verto is an AI-powered job portal helping students and recruiters connect, predict, and succeed.</p>
            <p className="text-xs text-blue-400">&copy; {new Date().getFullYear()} Verto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
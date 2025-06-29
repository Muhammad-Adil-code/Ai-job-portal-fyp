import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobPrediction from './components/JobPrediction';
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
// import './3dBackground.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto py-8" style={{ backgroundColor: '#311855' }}>
        <div className="min-h-screen">
          <div className="relative overflow-hidden">
            {/* 3D/CSS Animated Background */}
            <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-[#2193b0] via-[#6dd5ed] to-[#FF4E50] opacity-60" />
            <Navbar />
            <div className="container mx-auto py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/description/:id" element={<JobDescription />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
                <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
                <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
                <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
                <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
                <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

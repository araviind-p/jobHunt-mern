import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoteModal from './NoteModal';
import JobCard from './JobCard';  // Import the JobCard component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState('createdAt'); // Default sort field
  const navigate = useNavigate();

  const handleNewJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
    console.log('Job added:', newJob);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://jobhunt-mern.onrender.com/profile', { withCredentials: true });
        setUser(response.data);
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate, handleNewJob]);

  // Sort jobs based on the selected field
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortField === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt); // Date comparison
    }
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });

  const handleDeleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    toast.success("Job deleted");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('https://jobhunt-mern.onrender.com/auth/logout', { withCredentials: true });
      if (response.status === 200) {
        toast.success("Logout success");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="w-full bg-white dark:bg-gray-900 shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Job Hunt
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Job
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* To offset the content below the fixed navbar */}
      <div className="w-full pt-20 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-5xl mt-6">
        {user ? (
          <>
            <div className="mt-4 text-center">
              <img src={user.image} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto" />
              <h2 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-gray-100">
                {user.displayName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {user.email}
              </p>
            </div>

            <div className="mt-6">
              {
                jobs.length > 0 && (
                  <div className='flex justify-center mb-4'>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-green-500">YOUR JOBS</h2>
                  </div>
                )
              }

              {/* Sort Dropdown */}
              {
                jobs.length > 0 && (

                  <div className="flex justify-end mb-4">
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                      className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md"
                    >
                      <option value="companyName">Company Name</option>
                      <option value="jobRole">Job Role</option>
                      <option value="jobStatus">Job Status</option>
                      <option value="notes">Notes</option>
                      <option value="createdAt">Created At</option> {/* New option for createdAt */}
                    </select>
                  </div>
                )
              }

              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {sortedJobs.map((job, index) => (
                    <JobCard key={index} job={job} onDelete={handleDeleteJob} />
                  ))}
                </div>
              ) : (
                <div className='flex justify-center'>

                  <p className="mt-4 cursor-pointer text-gray-900 dark:text-gray-100 w-2/5 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 bg-blue-600 dark:bg-blue-700 flex justify-center p-4 rounded-md" onClick={() => setIsModalOpen(true)}>
                    Add some jobs
                  </p>

                </div>
              )}

            </div>
          </>
        ) : (
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading user data...</p>
        )}

        {isModalOpen && (
          <NoteModal setIsModalOpen={setIsModalOpen} onSave={handleNewJob} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;

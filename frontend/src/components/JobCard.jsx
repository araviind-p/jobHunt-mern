import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon
import EditJobModal from './EditJobModal';
import { toast } from 'react-toastify';

const JobCard = ({ job, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800  p-2 rounded-md';
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800 p-2 rounded-md';
      case 'offered':
        return 'bg-green-100 text-green-800 p-2 rounded-md';
      case 'rejected':
        return 'bg-red-100 text-red-800 p-2 rounded-md';
      default:
        return 'bg-gray-100 text-gray-800 p-2 rounded-md';
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jobhunt-mern.onrender.com/deleteJob/${job._id}`, { withCredentials: true });
      if (onDelete) onDelete(job._id); // Notify parent component about the deletion
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('Failed to delete job');
    }
  };

  // Format the createdAt date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm relative">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {job.companyName}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">Role: {job.jobRole}</p>
      <p className="text-gray-600 dark:text-gray-300">
        URL: <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{job.url}</a>
      </p>
      <p className="text-gray-600 dark:text-gray-300">Notes: {job.notes}</p>
      <p className="px-2 py-1 my-2 w-fit rounded-md text-sm font-medium text-gray-300">
        Status: <span className={getStatusClasses(job.jobStatus)}>{job.jobStatus}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-300">Created At: {

        formatDate(job.createdAt)}</p> {/* Display createdAt */}
      <button
        onClick={() => setIsEditing(true)}
        className="mt-2 px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <FaTrash size={20} />
      </button>
      {isEditing && (
        <EditJobModal job={job} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default JobCard;

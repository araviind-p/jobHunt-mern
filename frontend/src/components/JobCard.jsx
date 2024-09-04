// JobCard.js
import React from 'react';

const JobCard = ({ job }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {job.companyName}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">Role: {job.jobRole}</p>
      <p className="text-gray-600 dark:text-gray-300">
        URL: <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{job.url}</a>
      </p>
      <p className="text-gray-600 dark:text-gray-300">Notes: {job.notes}</p>
      <p className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusClasses(job.jobStatus)}`}>
        Status: {job.jobStatus}
      </p>
    </div>
  );
};

export default JobCard;

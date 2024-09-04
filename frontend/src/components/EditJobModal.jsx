// EditJobModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditJobModal = ({ job, setIsEditing }) => {
    const [companyName, setCompanyName] = useState(job.companyName);
    const [jobRole, setJobRole] = useState(job.jobRole);
    const [url, setUrl] = useState(job.url);
    const [notes, setNotes] = useState(job.notes);
    const [jobStatus, setJobStatus] = useState(job.jobStatus);

    const handleUpdateJob = async () => {
        const updatedJob = {
            companyName,
            jobRole,
            url,
            notes,
            jobStatus,
        };

        try {
            const response = await axios.put(`http://localhost:5000/updateJob/${job._id}`, updatedJob, { withCredentials: true });
            console.log(response.data);
            toast.success("Updated job details")
            setTimeout(()=>{
                setIsEditing(false); // Close the modal after saving
            },1000)
        } catch (error) {
            console.error('Failed to update job:', error);
            toast.error(error.message)
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Edit Job
                </h2>

                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                />

                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="Job Role"
                />

                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Job URL"
                />

                <textarea
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes"
                />

                <select
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                >
                    <option value="" disabled>Select Job Status</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                </select>

                <div className="flex justify-end">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateJob}
                        className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditJobModal;

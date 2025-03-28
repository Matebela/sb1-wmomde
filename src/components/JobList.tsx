import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { JobCard } from './JobCard';
import { JobModal } from './JobModal';
import { Job } from '../types';

export const JobList = () => {
  const { jobs, loading, error } = useJobStore();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No jobs found. Try a different search.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.job_id}
            job={job}
            onViewDetails={setSelectedJob}
          />
        ))}
      </div>
      
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
};
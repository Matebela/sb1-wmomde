import React from 'react';
import { Building, MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

export const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {job.employer_logo ? (
          <img
            src={job.employer_logo}
            alt={job.employer_name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
            }}
          />
        ) : (
          <Building className="w-12 h-12 text-gray-400" />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{job.job_title}</h3>
          <p className="text-gray-600">{job.employer_name}</p>
          
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>
                {job.job_city}
                {job.job_state && `, ${job.job_state}`}
                {job.job_country && `, ${job.job_country}`}
              </span>
            </div>
            {job.job_employment_type && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{job.job_employment_type}</span>
              </div>
            )}
            {(job.job_min_salary || job.job_max_salary) && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>
                  {job.job_min_salary && `${job.job_min_salary.toLocaleString()}`}
                  {job.job_min_salary && job.job_max_salary && ' - '}
                  {job.job_max_salary && `${job.job_max_salary.toLocaleString()}`}
                  {job.job_salary_currency && ` ${job.job_salary_currency}`}
                  {job.job_salary_period && `/${job.job_salary_period}`}
                </span>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-gray-600 line-clamp-3">{job.job_description}</p>
          
          <button
            onClick={() => onViewDetails(job)}
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
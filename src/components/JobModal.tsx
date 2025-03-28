import React, { useState } from 'react';
import { X, Building, MapPin, Clock, DollarSign, Briefcase, Calendar, FileText } from 'lucide-react';
import { Job } from '../types';
import { CoverLetterModal } from './CoverLetterModal';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export const JobModal = ({ job, onClose }: JobModalProps) => {
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.job_title}</h2>
                <p className="text-gray-600">{job.employer_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
              {job.job_posted_at_timestamp && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Posted {new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {(job.job_min_salary || job.job_max_salary) && (
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">
                  {job.job_min_salary && `${job.job_min_salary.toLocaleString()}`}
                  {job.job_min_salary && job.job_max_salary && ' - '}
                  {job.job_max_salary && `${job.job_max_salary.toLocaleString()}`}
                  {job.job_salary_currency && ` ${job.job_salary_currency}`}
                  {job.job_salary_period && `/${job.job_salary_period}`}
                </span>
              </div>
            )}

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <div dangerouslySetInnerHTML={{ __html: job.job_description }} />
            </div>

            {job.job_highlights && (
              <div className="space-y-4">
                {job.job_highlights.Qualifications && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Qualifications.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.job_highlights.Responsibilities && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.job_highlights.Benefits && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-4">
            <button
              onClick={() => setShowCoverLetter(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Create Cover Letter
            </button>
            {job.job_apply_link && (
              <a
                href={job.job_apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Apply Now
              </a>
            )}
          </div>
        </div>
      </div>
      
      {showCoverLetter && (
        <CoverLetterModal
          jobDescription={`${job.job_title}\n\n${job.job_description}`}
          onClose={() => setShowCoverLetter(false)}
        />
      )}
    </>
  );
};
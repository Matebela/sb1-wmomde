import React from 'react';
import { Filter } from 'lucide-react';
import { useJobStore } from '../store/jobStore';

const dateOptions = [
  { value: 'all', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: '3days', label: 'Last 3 days' },
  { value: 'week', label: 'Last week' },
  { value: 'month', label: 'Last month' },
];

const employmentTypes = [
  { value: 'FULLTIME', label: 'Full-time' },
  { value: 'PARTTIME', label: 'Part-time' },
  { value: 'CONTRACTOR', label: 'Contract' },
  { value: 'INTERN', label: 'Internship' },
];

const experienceRequirements = [
  { value: 'no_experience', label: 'No experience' },
  { value: 'under_3_years_experience', label: 'Under 3 years' },
  { value: 'more_than_3_years_experience', label: 'Over 3 years' },
  { value: 'no_degree', label: 'No degree required' },
];

export const SearchFilters = () => {
  const { searchParams, setSearchParams } = useJobStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Posted
            </label>
            <select
              value={searchParams.date_posted || 'all'}
              onChange={(e) => setSearchParams({ date_posted: e.target.value as any })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              value={searchParams.employment_types?.[0] || ''}
              onChange={(e) => setSearchParams({ employment_types: e.target.value ? [e.target.value] : [] })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any type</option>
              {employmentTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              value={searchParams.job_requirements?.[0] || ''}
              onChange={(e) => setSearchParams({ job_requirements: e.target.value ? [e.target.value] : [] })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any level</option>
              {experienceRequirements.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remote Only
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={searchParams.remote_jobs_only || false}
                onChange={(e) => setSearchParams({ remote_jobs_only: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remote jobs only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
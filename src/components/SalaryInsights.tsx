import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Loader2, AlertCircle, Building } from 'lucide-react';
import { getEstimatedSalary } from '../services/api';
import { useJobStore } from '../store/jobStore';

interface SalaryData {
  location: string;
  job_title: string;
  publisher_name: string;
  publisher_link: string;
  min_salary: number;
  max_salary: number;
  median_salary: number;
  salary_period: string;
  salary_currency: string;
}

export const SalaryInsights = () => {
  const { searchParams } = useJobStore();
  const [loading, setLoading] = useState(false);
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalaryData = async () => {
      if (!searchParams.query || !searchParams.location) return;

      setLoading(true);
      setError(null);
      setSalaryData([]);

      try {
        // Extract job title from query (remove location if present)
        const jobTitle = searchParams.query.split(' in ')[0].trim();
        
        const response = await getEstimatedSalary({
          job_title: jobTitle,
          location: searchParams.location,
          radius: 100
        });

        setSalaryData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch salary data');
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.query && searchParams.location) {
      fetchSalaryData();
    }
  }, [searchParams.query, searchParams.location]);

  if (!searchParams.query || !searchParams.location) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Salary Insights
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-600 py-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        ) : salaryData.length > 0 ? (
          <div className="space-y-6">
            {salaryData.map((data, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{data.job_title}</h3>
                    <p className="text-sm text-gray-500">{data.location}</p>
                  </div>
                  <a
                    href={data.publisher_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Building className="w-4 h-4" />
                    {data.publisher_name}
                  </a>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Median Salary</div>
                    <div className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {data.median_salary.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Range</div>
                    <div className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {data.min_salary.toLocaleString()} - {data.max_salary.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Period</div>
                    <div className="text-lg font-medium text-gray-900">
                      {data.salary_currency}/{data.salary_period.toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No salary data available for this position and location
          </div>
        )}
      </div>
    </div>
  );
};
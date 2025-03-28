import axios from 'axios';
import { JobSearchParams } from '../types';

const api = axios.create({
  baseURL: 'https://jsearch.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
});

export const searchJobs = async (params: JobSearchParams) => {
  const searchParams = {
    query: `${params.query} in ${params.location}`,
    page: params.page.toString(),
    num_pages: params.num_pages.toString(),
    date_posted: params.date_posted,
    remote_jobs_only: params.remote_jobs_only,
    employment_types: params.employment_types?.join(','),
    job_requirements: params.job_requirements?.join(','),
    radius: params.radius?.toString(),
    country: params.country,
  };

  const response = await api.get('/search', { params: searchParams });
  return response.data;
};

export const getJobDetails = async (jobId: string) => {
  const response = await api.get('/job-details', {
    params: { job_id: jobId },
  });
  return response.data;
};
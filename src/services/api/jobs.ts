import axios from 'axios';
import { JobSearchParams } from '../../types';
import { jsearchApi } from './config';

export const searchJobs = async (params: JobSearchParams) => {
  try {
    const searchParams = new URLSearchParams({
      query: `${params.query} in ${params.location}`,
      page: params.page.toString(),
      num_pages: params.num_pages.toString(),
      ...(params.date_posted && { date_posted: params.date_posted }),
      ...(params.remote_jobs_only && { remote_jobs_only: params.remote_jobs_only.toString() }),
      ...(params.employment_types?.length && { employment_types: params.employment_types.join(',') }),
      ...(params.job_requirements?.length && { job_requirements: params.job_requirements.join(',') }),
      ...(params.radius && { radius: params.radius.toString() }),
      ...(params.country && { country: params.country }),
    });

    const response = await jsearchApi.get('/search', { params: searchParams });
    
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format from API');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('Invalid API key. Please check your RapidAPI key configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch jobs. Please try again.');
  }
};

export const getJobDetails = async (jobId: string) => {
  try {
    const response = await jsearchApi.get('/job-details', {
      params: { job_id: jobId },
    });

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format from API');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('Invalid API key. Please check your RapidAPI key configuration.');
      }
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch job details. Please try again.');
  }
};
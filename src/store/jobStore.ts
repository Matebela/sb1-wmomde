import { create } from 'zustand';
import { Job, JobSearchParams } from '../types';
import { searchJobs } from '../services/api/jobs';

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  searchParams: JobSearchParams;
  setSearchParams: (params: Partial<JobSearchParams>) => void;
  fetchJobs: () => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,
  searchParams: {
    query: '',
    location: '',
    page: 1,
    num_pages: 1,
  },
  setSearchParams: (params) => {
    set((state) => ({
      searchParams: { ...state.searchParams, ...params },
    }));
  },
  fetchJobs: async () => {
    const { searchParams } = get();
    
    if (!searchParams.query || !searchParams.location) {
      set({ error: 'Please enter both job title and location', loading: false });
      return;
    }

    set({ loading: true, error: null });
    
    try {
      const data = await searchJobs(searchParams);
      set({ jobs: data.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch jobs', 
        loading: false,
        jobs: []
      });
    }
  },
}));
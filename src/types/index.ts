export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface JobSearchParams {
  query: string;
  location: string;
  page: number;
  num_pages: number;
  date_posted?: 'all' | 'today' | '3days' | 'week' | 'month';
  remote_jobs_only?: boolean;
  employment_types?: string[];
  job_requirements?: string[];
  radius?: number;
  country?: string;
}

export interface Job {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_description: string;
  job_country: string;
  job_employment_type: string;
  job_city: string;
  job_state?: string;
  job_posting_url: string;
  employer_logo?: string;
  job_salary_currency?: string;
  job_salary_period?: string;
  job_min_salary?: number;
  job_max_salary?: number;
  job_required_experience?: string;
  job_required_skills?: string[];
  job_posted_at_timestamp?: number;
  job_publisher?: string;
  job_apply_link?: string;
  job_highlights?: {
    Qualifications?: string[];
    Responsibilities?: string[];
    Benefits?: string[];
  };
}
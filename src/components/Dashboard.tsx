import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { CVAnalysis } from './CVAnalysis';
import { SearchBar } from './SearchBar';
import { SearchFilters } from './SearchFilters';
import { JobList } from './JobList';
import { CoverLetterHistory } from './CoverLetterHistory';

export const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Search Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </header>
      
      <main className="py-8">
        <CVAnalysis />
        <SearchBar />
        <SearchFilters />
        <JobList />
        <CoverLetterHistory />
      </main>
    </div>
  );
};
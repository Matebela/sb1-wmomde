import React, { useState } from 'react';
import { X, FileText, Copy, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateCoverLetter } from '../services/openRouter';
import { useCoverLetterStore } from '../store/coverLetterStore';

interface CoverLetterModalProps {
  jobDescription: string;
  onClose: () => void;
}

export const CoverLetterModal = ({ jobDescription, onClose }: CoverLetterModalProps) => {
  const [cv, setCV] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const addCoverLetter = useCoverLetterStore((state) => state.addCoverLetter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv.trim()) {
      toast.error('Please paste your CV');
      return;
    }

    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      toast.error('OpenRouter API key is not configured. Please check the environment variables.');
      return;
    }

    setLoading(true);
    try {
      const generatedLetter = await generateCoverLetter(jobDescription, cv);
      setCoverLetter(generatedLetter);
      // Store the cover letter in history
      const jobTitle = jobDescription.split('\n')[0]; // First line contains the job title
      addCoverLetter(jobTitle, generatedLetter);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success('Cover letter copied to clipboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Create Cover Letter</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!coverLetter ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paste your CV
                </label>
                <textarea
                  value={cv}
                  onChange={(e) => setCV(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Paste your CV here..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Cover Letter'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{coverLetter}</div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
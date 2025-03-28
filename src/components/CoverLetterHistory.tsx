import React from 'react';
import { FileText, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCoverLetterStore } from '../store/coverLetterStore';

export const CoverLetterHistory = () => {
  const coverLetters = useCoverLetterStore((state) => state.coverLetters);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Cover letter copied to clipboard');
  };

  if (coverLetters.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Generated Cover Letters
        </h2>

        <div className="space-y-4">
          {coverLetters.map((letter, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-900">{letter.jobTitle}</div>
                <button
                  onClick={() => handleCopy(letter.content)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <div className="text-gray-600 text-sm mb-2">
                Generated on {new Date(letter.timestamp).toLocaleDateString()}
              </div>
              <div className="whitespace-pre-wrap text-gray-800">{letter.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
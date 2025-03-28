import React, { useState } from 'react';
import { FileText, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyzeCVStrengths, enhanceCV } from '../services/openRouter';

export const CVAnalysis = () => {
  const [cv, setCV] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [enhancedCV, setEnhancedCV] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!cv.trim()) {
      toast.error('Please paste your CV');
      return;
    }

    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      toast.error('OpenRouter API key is not configured');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const [analysisResult, rewrittenCV] = await Promise.all([
        analyzeCVStrengths(cv),
        enhanceCV(cv)
      ]);
      
      setAnalysis(analysisResult);
      setEnhancedCV(rewrittenCV);
      toast.success('CV analyzed and enhanced successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze CV';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCV('');
    setAnalysis('');
    setEnhancedCV('');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          CV Analysis & Enhancement
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {!analysis ? (
          <div className="space-y-4">
            <textarea
              value={cv}
              onChange={(e) => setCV(e.target.value)}
              placeholder="Paste your CV here for professional analysis and enhancement..."
              className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Analyze & Enhance CV
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {analysis}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Enhanced CV</h3>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {enhancedCV}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(enhancedCV);
                  toast.success('Enhanced CV copied to clipboard');
                }}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Copy Enhanced CV
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Analyze Another CV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
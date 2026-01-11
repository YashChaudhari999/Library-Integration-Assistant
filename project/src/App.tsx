import React, { useState } from 'react';
import { PackageSearch, Code2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface IntegrationResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  code?: string;
  error?: string;
}

function App() {
  const [npmPackage, setNpmPackage] = useState('');
  const [codebase, setCodebase] = useState('// Paste your existing code here...');
  const [result, setResult] = useState<IntegrationResult>({ status: 'idle' });

  const handleIntegration = async () => {
    if (!npmPackage.trim() || !codebase.trim()) return;

    setResult({ status: 'loading' });
    
    // Simulate API call to AI service
    setTimeout(() => {
      try {
        // This is a mock response - in a real app, this would come from an AI service
        const integratedCode = `
import ${npmPackage.split('/').pop()} from '${npmPackage}';

${codebase}

// Integrated code example:
function enhancedComponent() {
  const result = ${npmPackage.split('/').pop()}();
  // Integration logic here
  return result;
}`;

        setResult({
          status: 'success',
          code: integratedCode
        });
      } catch (error) {
        setResult({
          status: 'error',
          error: 'Failed to integrate library. Please check the package name and try again.'
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <PackageSearch className="w-10 h-10" />
            Library Integration Assistant
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Simplify your library integration process with AI. Input an NPM package
            and your existing code to receive intelligent integration suggestions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">NPM Package</label>
              <input
                type="text"
                value={npmPackage}
                onChange={(e) => setNpmPackage(e.target.value)}
                placeholder="e.g., lodash, axios, react-query"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Codebase</label>
              <textarea
                value={codebase}
                onChange={(e) => setCodebase(e.target.value)}
                className="w-full h-64 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-mono text-sm"
              />
            </div>

            <button
              onClick={handleIntegration}
              disabled={result.status === 'loading'}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {result.status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Code2 className="w-5 h-5" />
                  Integrate Library
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {result.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              Integration Result
            </h2>
            {result.status === 'idle' && (
              <div className="text-gray-400">
                Integration result will appear here...
              </div>
            )}
            {result.status === 'loading' && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            )}
            {result.status === 'success' && (
              <pre className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-64 text-sm">
                <code>{result.code}</code>
              </pre>
            )}
            {result.status === 'error' && (
              <div className="text-red-400">{result.error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
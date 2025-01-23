import React, { useState } from 'react';
import axios from 'axios';
import FileExplorer from '../components/Documentation/FileExplorer';

const API_BASE_URL = 'http://localhost:5000';

const Documentation = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [documentation, setDocumentation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [expandingFolder, setExpandingFolder] = useState(false);

  const extractRepoInfo = (url) => {
    const parts = url
      .replace('https://github.com/', '')
      .replace('http://github.com/', '')
      .split('/');
    return { owner: parts[0], repo: parts[1] };
  };

  const fetchRepository = async () => {
    try {
      setLoading(true);
      setError(null);
      setFiles([]);
      setSelectedFiles([]);
      setFileContent(null);
      
      if (!repoUrl.includes('github.com')) {
        throw new Error('Please enter a valid GitHub repository URL');
      }

      const response = await axios.post(`${API_BASE_URL}/api/documentation/fetch-repo`, {
        repoUrl: repoUrl.trim()
      });

      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching repository:', error);
      setError(error.response?.data?.message || error.message || 'Failed to fetch repository');
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (file) => {
    try {
      setLoading(true);
      const { owner, repo } = extractRepoInfo(repoUrl);
      
      const response = await axios.post(`${API_BASE_URL}/api/documentation/fetch-file`, {
        owner,
        repo,
        path: file.path
      });

      setFileContent({
        path: file.path,
        content: response.data.content
      });
    } catch (error) {
      console.error('Error fetching file content:', error);
      setError(error.response?.data?.message || error.message || 'Failed to fetch file content');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFiles(prev => {
      if (prev.includes(file.path)) {
        return prev.filter(p => p !== file.path);
      }
      return [...prev, file.path];
    });
  };

  const generateDocumentation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Only include selected files in documentation generation
      const selectedFileData = files.filter(file => 
        selectedFiles.includes(file.path)
      );

      const response = await axios.post(`${API_BASE_URL}/api/documentation/generate`, {
        repoUrl,
        files: selectedFileData
      });
      
      setDocumentation(response.data.documentation);
    } catch (error) {
      console.error('Error generating documentation:', error);
      setError(error.response?.data?.message || error.message || 'Failed to generate documentation');
    } finally {
      setLoading(false);
    }
  };

  // Add the missing downloadDocumentation function
  const downloadDocumentation = () => {
    try {
      // Create a blob with the documentation content
      const blob = new Blob([documentation], { type: 'text/markdown' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = `documentation-${new Date().toISOString().split('T')[0]}.md`;
      
      // Trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading documentation:', error);
      setError('Failed to download documentation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={fetchRepository}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading || !repoUrl.trim()}
          >
            {loading ? 'Fetching...' : 'Fetch Repository'}
          </button>
          
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="flex gap-4">
            <div className="w-[30%] relative">
              {expandingFolder && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
              <FileExplorer 
                files={files}
                onFileSelect={handleFileSelect}
                selectedFiles={selectedFiles}
                onFileContent={fetchFileContent}
              />
            </div>

            <div className="w-[70%]">
              <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex justify-between mb-4">
                  <button
                    onClick={generateDocumentation}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
                    disabled={loading || selectedFiles.length === 0}
                  >
                    {loading ? 'Generating...' : `Generate Documentation (${selectedFiles.length} files selected)`}
                  </button>
                  {documentation && (
                    <button
                      onClick={downloadDocumentation}
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Download Documentation
                    </button>
                  )}
                </div>

                {/* File Content Preview */}
                {fileContent && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">File Preview: {fileContent.path}</h3>
                    <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                      <code>{fileContent.content}</code>
                    </pre>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
                
                {documentation && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: documentation }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;
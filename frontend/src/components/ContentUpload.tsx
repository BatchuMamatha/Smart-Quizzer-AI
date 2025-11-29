import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ContentUploadProps {
  onContentProcessed: (content: string, metadata: any) => void;
  onError: (error: string) => void;
  className?: string;
}

interface ProcessingResult {
  success: boolean;
  content: string;
  metadata: any;
  summary: any;
  error?: string;
}

const ContentUpload: React.FC<ContentUploadProps> = ({ onContentProcessed, onError, className = '' }) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'text'>('text');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    await uploadFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/json': ['.json'],
      'text/csv': ['.csv']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const uploadFile = async (file: File) => {
    setProcessing(true);
    setProcessingResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = sessionStorage.getItem('access_token');
      const response = await fetch('http://localhost:5000/api/content/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setProcessingResult(result);
      onContentProcessed(result.content, result.metadata);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const processUrl = async () => {
    if (!urlInput.trim()) {
      onError('Please enter a valid URL');
      return;
    }

    setProcessing(true);
    setProcessingResult(null);

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('http://localhost:5000/api/content/process-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url: urlInput })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'URL processing failed');
      }

      setProcessingResult(result);
      onContentProcessed(result.content, result.metadata);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'URL processing failed';
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const analyzeText = async () => {
    const trimmedText = textInput.trim();
    
    if (!trimmedText || trimmedText.length < 10) {
      onError('Please enter at least 10 characters of text content');
      return;
    }
    
    // Check if text is only whitespace
    if (trimmedText.replace(/\s/g, '').length === 0) {
      onError('Content cannot contain only whitespace');
      return;
    }

    setProcessing(true);
    setProcessingResult(null);

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('http://localhost:5000/api/content/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: textInput })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Text analysis failed');
      }

      setProcessingResult(result);
      onContentProcessed(result.content, result.metadata);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Text analysis failed';
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 ${className}`}>
      {/* Method Selection */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2 text-xl">📁</span>
          Custom Content Upload
        </h3>
        
        <div className="flex space-x-2">
          {[
            { key: 'text', label: 'Text Input', icon: '✍️' },
            { key: 'file', label: 'File Upload', icon: '📄' },
            { key: 'url', label: 'Web URL', icon: '🌐' }
          ].map((method) => (
            <button
              key={method.key}
              onClick={() => setUploadMethod(method.key as 'file' | 'url' | 'text')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                uploadMethod === method.key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="mr-2">{method.icon}</span>
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Input Area */}
      <div className="p-6">
        {uploadMethod === 'text' && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              📝 Enter your content for quiz generation:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste or type any educational content here. Our AI will analyze it and generate personalized quiz questions..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                💡 Minimum 10 characters required. Longer content generates better questions.
              </p>
              <span className="text-xs text-gray-400">
                {textInput.length} characters
              </span>
            </div>
            <button
              onClick={analyzeText}
              disabled={processing || textInput.trim().length < 10}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                  Analyzing Content...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2">🔍</span>
                  Analyze & Process Text
                </div>
              )}
            </button>
          </div>
        )}

        {uploadMethod === 'file' && (
          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-4xl mb-4">
                {isDragActive ? '⬇️' : '📁'}
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isDragActive ? 'Drop the file here...' : 'Drag & drop a file here'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or <span className="text-blue-500 font-medium">click to browse</span>
              </p>
              <div className="text-xs text-gray-400">
                Supported: PDF, DOCX, TXT, JSON, CSV (max 10MB)
              </div>
            </div>
            
            {processing && (
              <div className="text-center py-4">
                <div className="inline-flex items-center">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
                  <span className="text-blue-600 font-medium">Processing file...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {uploadMethod === 'url' && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              🌐 Enter web URL to extract content:
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/article"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <button
                onClick={processUrl}
                disabled={processing || !urlInput.trim()}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">🔍</span>
                    Extract
                  </div>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              💡 We'll extract text content from the webpage for quiz generation
            </p>
          </div>
        )}
      </div>

      {/* Processing Results */}
      {processingResult && (
        <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <span className="text-green-500 text-xl mr-3 mt-1">✅</span>
            <div className="flex-1">
              <h4 className="font-semibold text-green-800 mb-2">Content Processed Successfully!</h4>
              
              {processingResult.summary && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-green-600 font-medium">Words:</span>
                    <p className="text-green-800">{processingResult.summary.word_count}</p>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Reading Time:</span>
                    <p className="text-green-800">{processingResult.summary.estimated_reading_time} min</p>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Content Hash:</span>
                    <p className="text-green-800 font-mono text-xs">
                      {processingResult.metadata.content_hash?.substring(0, 8)}...
                    </p>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Processed:</span>
                    <p className="text-green-800 text-xs">
                      {new Date(processingResult.metadata.processed_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )}
              
              {processingResult.summary?.content_preview && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-600 mb-1">Content Preview:</p>
                  <p className="text-sm text-gray-800">{processingResult.summary.content_preview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentUpload;
import React, { useState, useEffect } from 'react';
import { QuizBookmarksManager, QuizBookmark } from '../lib/quizBookmarks';
import { Button } from './Button';
import { toast } from '../lib/toast';

const quizBookmarksManager = QuizBookmarksManager.getInstance();

interface QuizBookmarksProps {
  onStartQuiz: (bookmark: QuizBookmark) => void;
}

/**
 * QuizBookmarks Component
 * 
 * Displays saved quiz bookmarks with filtering, search, and management capabilities.
 * Allows users to quickly start a quiz from saved configurations.
 */
const QuizBookmarks: React.FC<QuizBookmarksProps> = ({ onStartQuiz }) => {
  const [bookmarks, setBookmarks] = useState<QuizBookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkillLevel, setFilterSkillLevel] = useState<string>('');
  const [showImportExport, setShowImportExport] = useState(false);

  useEffect(() => {
    loadBookmarks();
  }, [searchQuery, filterSkillLevel]);

  const loadBookmarks = () => {
    let results = quizBookmarksManager.getBookmarks();

    if (searchQuery) {
      results = quizBookmarksManager.search(searchQuery);
    }

    if (filterSkillLevel) {
      results = quizBookmarksManager.getBySkillLevel(filterSkillLevel as 'Beginner' | 'Intermediate' | 'Advanced');
    }

    setBookmarks(results);
  };

  const handleRemove = (id: string) => {
    // Using a simple approach - you can enhance this with a modal later
    const shouldDelete = window.confirm('Are you sure you want to remove this bookmark?');
    if (shouldDelete) {
      quizBookmarksManager.removeBookmark(id);
      loadBookmarks();
      toast.success('Bookmark Removed', 'Quiz bookmark removed successfully');
    }
  };

  const handleExport = () => {
    const data = quizBookmarksManager.exportBookmarks();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        quizBookmarksManager.importBookmarks(data);
        loadBookmarks();
        alert('Bookmarks imported successfully!');
      } catch (error) {
        alert('Failed to import bookmarks. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (bookmarks.length === 0 && !searchQuery && !filterSkillLevel) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Saved Quizzes Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Bookmark your favorite quiz configurations for quick access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <select
            value={filterSkillLevel}
            onChange={(e) => setFilterSkillLevel(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => setShowImportExport(!showImportExport)}
          >
            {showImportExport ? 'Hide' : 'Import/Export'}
          </Button>
        </div>
      </div>

      {/* Import/Export Section */}
      {showImportExport && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Import Bookmarks
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="w-full text-sm text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <Button variant="primary" onClick={handleExport}>
                Export Bookmarks
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No bookmarks found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate flex-1">
                  {bookmark.topic}
                </h3>
                <button
                  onClick={() => handleRemove(bookmark.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Questions:</span>
                  <span>{bookmark.questionCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(bookmark.skillLevel)}`}>
                    {bookmark.skillLevel}
                  </span>
                </div>

                {bookmark.tags && bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {bookmark.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Created: {new Date(bookmark.createdAt).toLocaleDateString()}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onStartQuiz(bookmark)}
                className="w-full"
              >
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Bookmark Count */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} 
        {searchQuery || filterSkillLevel ? ' (filtered)' : ''} 
        · Max 20 bookmarks allowed
      </div>
    </div>
  );
};

export default QuizBookmarks;

/**
 * Quiz Bookmarks Manager
 * Manages saved quiz configurations and favorites
 */

export interface QuizBookmark {
  id: string;
  topic: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  tags?: string[];
  createdAt: string;
  lastUsed?: string;
}

const STORAGE_KEY = 'quiz_bookmarks';
const MAX_BOOKMARKS = 20;

export class QuizBookmarksManager {
  private static instance: QuizBookmarksManager;

  private constructor() {}

  public static getInstance(): QuizBookmarksManager {
    if (!QuizBookmarksManager.instance) {
      QuizBookmarksManager.instance = new QuizBookmarksManager();
    }
    return QuizBookmarksManager.instance;
  }

  /**
   * Get all bookmarks
   */
  public getBookmarks(): QuizBookmark[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const bookmarks: QuizBookmark[] = JSON.parse(stored);
      // Sort by last used, then created date
      return bookmarks.sort((a, b) => {
        const aDate = new Date(a.lastUsed || a.createdAt).getTime();
        const bDate = new Date(b.lastUsed || b.createdAt).getTime();
        return bDate - aDate;
      });
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  }

  /**
   * Add a new bookmark
   */
  public addBookmark(
    topic: string,
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced',
    questionCount: number,
    tags?: string[]
  ): QuizBookmark {
    const bookmarks = this.getBookmarks();

    // Check if already bookmarked
    const existing = bookmarks.find(
      b => b.topic.toLowerCase() === topic.toLowerCase() && 
           b.skillLevel === skillLevel && 
           b.questionCount === questionCount
    );

    if (existing) {
      // Update last used
      existing.lastUsed = new Date().toISOString();
      this.saveBookmarks(bookmarks);
      return existing;
    }

    // Create new bookmark
    const bookmark: QuizBookmark = {
      id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic,
      skillLevel,
      questionCount,
      tags,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    // Add to beginning
    bookmarks.unshift(bookmark);

    // Limit to MAX_BOOKMARKS
    if (bookmarks.length > MAX_BOOKMARKS) {
      bookmarks.splice(MAX_BOOKMARKS);
    }

    this.saveBookmarks(bookmarks);
    return bookmark;
  }

  /**
   * Remove a bookmark
   */
  public removeBookmark(id: string): void {
    const bookmarks = this.getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== id);
    this.saveBookmarks(filtered);
  }

  /**
   * Check if configuration is bookmarked
   */
  public isBookmarked(
    topic: string,
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced',
    questionCount: number
  ): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(
      b => b.topic.toLowerCase() === topic.toLowerCase() && 
           b.skillLevel === skillLevel && 
           b.questionCount === questionCount
    );
  }

  /**
   * Get bookmark by ID
   */
  public getBookmark(id: string): QuizBookmark | null {
    const bookmarks = this.getBookmarks();
    return bookmarks.find(b => b.id === id) || null;
  }

  /**
   * Update last used timestamp
   */
  public updateLastUsed(id: string): void {
    const bookmarks = this.getBookmarks();
    const bookmark = bookmarks.find(b => b.id === id);
    if (bookmark) {
      bookmark.lastUsed = new Date().toISOString();
      this.saveBookmarks(bookmarks);
    }
  }

  /**
   * Clear all bookmarks
   */
  public clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Get bookmarks count
   */
  public getCount(): number {
    return this.getBookmarks().length;
  }

  /**
   * Search bookmarks
   */
  public search(query: string): QuizBookmark[] {
    const bookmarks = this.getBookmarks();
    const lowercaseQuery = query.toLowerCase();
    
    return bookmarks.filter(b => 
      b.topic.toLowerCase().includes(lowercaseQuery) ||
      b.skillLevel.toLowerCase().includes(lowercaseQuery) ||
      b.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get bookmarks by skill level
   */
  public getBySkillLevel(skillLevel: 'Beginner' | 'Intermediate' | 'Advanced'): QuizBookmark[] {
    const bookmarks = this.getBookmarks();
    return bookmarks.filter(b => b.skillLevel === skillLevel);
  }

  /**
   * Export bookmarks as JSON
   */
  public exportBookmarks(): string {
    const bookmarks = this.getBookmarks();
    return JSON.stringify(bookmarks, null, 2);
  }

  /**
   * Import bookmarks from JSON
   */
  public importBookmarks(jsonString: string): number {
    try {
      const imported: QuizBookmark[] = JSON.parse(jsonString);
      const current = this.getBookmarks();
      
      // Merge and deduplicate
      const merged = [...current];
      let addedCount = 0;
      
      for (const bookmark of imported) {
        const exists = merged.some(b => 
          b.topic === bookmark.topic && 
          b.skillLevel === bookmark.skillLevel && 
          b.questionCount === bookmark.questionCount
        );
        
        if (!exists && merged.length < MAX_BOOKMARKS) {
          merged.push(bookmark);
          addedCount++;
        }
      }
      
      this.saveBookmarks(merged);
      return addedCount;
    } catch (error) {
      console.error('Error importing bookmarks:', error);
      return 0;
    }
  }

  /**
   * Save bookmarks to localStorage
   */
  private saveBookmarks(bookmarks: QuizBookmark[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }
}

// Export singleton instance
export const quizBookmarks = QuizBookmarksManager.getInstance();

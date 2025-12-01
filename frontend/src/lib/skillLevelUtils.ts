/**
 * Skill Level Utilities
 * Standardizes skill level emojis and display across the application
 */

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Standard emoji mapping for skill levels
 * 🌱 Beginner - Just starting out (seedling - growth)
 * 🚀 Intermediate - Building momentum (rocket - progress)
 * 🏆 Advanced - Expert level (trophy - mastery)
 */
export const SKILL_LEVEL_EMOJIS: Record<SkillLevel, string> = {
  Beginner: '🌱',
  Intermediate: '🚀',
  Advanced: '🏆'
};

/**
 * Standard descriptions for skill levels
 */
export const SKILL_LEVEL_DESCRIPTIONS: Record<SkillLevel, string> = {
  Beginner: 'Just starting out',
  Intermediate: 'Some experience',
  Advanced: 'Expert level'
};

/**
 * Get emoji for a skill level
 * @param level - The skill level
 * @returns The corresponding emoji
 */
export function getSkillLevelEmoji(level: string | undefined | null): string {
  if (!level) return '🎯';
  const normalized = level as SkillLevel;
  return SKILL_LEVEL_EMOJIS[normalized] || '🎯';
}

/**
 * Get description for a skill level
 * @param level - The skill level
 * @returns The corresponding description
 */
export function getSkillLevelDescription(level: string | undefined | null): string {
  if (!level) return 'Not specified';
  const normalized = level as SkillLevel;
  return SKILL_LEVEL_DESCRIPTIONS[normalized] || 'Not specified';
}

/**
 * Get formatted skill level with emoji
 * @param level - The skill level
 * @returns Formatted string with emoji and level name
 */
export function getSkillLevelDisplay(level: string | undefined | null): string {
  if (!level) return '🎯 Not specified';
  const normalized = level as SkillLevel;
  const emoji = SKILL_LEVEL_EMOJIS[normalized] || '🎯';
  return `${emoji} ${level}`;
}

/**
 * Get full skill level display with emoji and description
 * @param level - The skill level
 * @returns Formatted string with emoji, level name, and description
 */
export function getSkillLevelFullDisplay(level: string | undefined | null): string {
  if (!level) return '🎯 Not specified';
  const normalized = level as SkillLevel;
  const emoji = SKILL_LEVEL_EMOJIS[normalized] || '🎯';
  const description = SKILL_LEVEL_DESCRIPTIONS[normalized] || '';
  return `${emoji} ${level}${description ? ' - ' + description : ''}`;
}

/**
 * All skill levels for select/dropdown options
 */
export const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

/**
 * Get color class for skill level badges
 */
export function getSkillLevelColorClass(level: string | undefined | null): string {
  if (!level) return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Advanced':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
}

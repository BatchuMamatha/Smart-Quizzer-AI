import React, { useEffect, useState } from 'react';
import { badgeAPI, UserBadge, Badge } from '../lib/api';

const BadgeShowcase: React.FC = () => {
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setLoading(true);
      const [earned, available] = await Promise.all([
        badgeAPI.getUserBadges(),
        badgeAPI.getAvailableBadges(),
      ]);

      setUserBadges(earned.badges);
      setAllBadges(available.badges);
      setTotalPoints(earned.total_points);
    } catch (error) {
      console.error('Failed to load badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-yellow-500 shadow-yellow-500/50';
      case 'epic':
        return 'border-purple-500 shadow-purple-500/50';
      case 'rare':
        return 'border-blue-500 shadow-blue-500/50';
      default:
        return 'border-gray-400';
    }
  };

  const categories = [
    { value: 'all', label: 'All Badges' },
    { value: 'milestone', label: 'Milestones' },
    { value: 'special', label: 'Special' },
  ];

  const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badge_id));

  const filteredBadges = allBadges.filter(
    (badge) => selectedCategory === 'all' || badge.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">🏆 Badge Collection</h2>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-indigo-100">Badges Earned</p>
            <p className="text-4xl font-bold">{userBadges.length}</p>
          </div>
          <div className="h-12 w-px bg-white/30"></div>
          <div>
            <p className="text-indigo-100">Total Points</p>
            <p className="text-4xl font-bold">{totalPoints}</p>
          </div>
          <div className="h-12 w-px bg-white/30"></div>
          <div>
            <p className="text-indigo-100">Completion</p>
            <p className="text-4xl font-bold">
              {Math.round((userBadges.length / allBadges.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredBadges.map((badge) => {
          const isEarned = earnedBadgeIds.has(badge.id);
          const userBadge = userBadges.find((ub) => ub.badge_id === badge.id);

          return (
            <div
              key={badge.id}
              className={`relative group rounded-lg border-2 p-4 transition-all duration-300 ${
                isEarned
                  ? `${getRarityBorder(badge.rarity)} shadow-lg hover:shadow-xl`
                  : 'border-gray-300 bg-gray-50 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Rarity indicator */}
              {isEarned && (
                <div
                  className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br ${getRarityColor(
                    badge.rarity
                  )}`}
                ></div>
              )}

              {/* Badge Icon */}
              <div className="text-center mb-3">
                <div
                  className={`text-5xl mb-2 ${
                    !isEarned && 'filter grayscale'
                  }`}
                >
                  {badge.icon}
                </div>
                <h3
                  className={`font-bold text-sm ${
                    isEarned ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {badge.name}
                </h3>
              </div>

              {/* Badge Info */}
              <div className="space-y-1">
                <p
                  className={`text-xs ${
                    isEarned ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {badge.description}
                </p>

                {isEarned && userBadge && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-indigo-600 font-medium">
                      ⭐ {badge.points} points
                    </p>
                    <p className="text-xs text-gray-500">
                      Earned {new Date(userBadge.earned_at).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {!isEarned && (
                  <div className="pt-2">
                    <p className="text-xs text-gray-400">
                      🔒 Not earned yet
                    </p>
                  </div>
                )}
              </div>

              {/* Rarity label */}
              <div className="absolute bottom-2 left-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                    isEarned
                      ? `bg-gradient-to-r ${getRarityColor(
                          badge.rarity
                        )} text-white`
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {badge.rarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No badges found in this category
        </div>
      )}
    </div>
  );
};

export default BadgeShowcase;

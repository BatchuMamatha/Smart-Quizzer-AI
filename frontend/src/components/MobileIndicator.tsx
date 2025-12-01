/**
 * Mobile Responsiveness Indicator
 * Development tool to show current breakpoint
 */

import React, { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointInfo {
  name: Breakpoint;
  minWidth: number;
  color: string;
  icon: string;
}

const breakpoints: BreakpointInfo[] = [
  { name: 'xs', minWidth: 0, color: 'bg-red-500', icon: '📱' },
  { name: 'sm', minWidth: 640, color: 'bg-orange-500', icon: '📱' },
  { name: 'md', minWidth: 768, color: 'bg-yellow-500', icon: '💻' },
  { name: 'lg', minWidth: 1024, color: 'bg-green-500', icon: '💻' },
  { name: 'xl', minWidth: 1280, color: 'bg-blue-500', icon: '🖥️' },
  { name: '2xl', minWidth: 1536, color: 'bg-purple-500', icon: '🖥️' }
];

interface MobileIndicatorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * MobileIndicator - Shows current responsive breakpoint
 * Only visible in development mode
 * 
 * @example
 * // Add to App.tsx or layout component
 * {process.env.NODE_ENV === 'development' && <MobileIndicator />}
 */
export const MobileIndicator: React.FC<MobileIndicatorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right'
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointInfo>(breakpoints[0]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Find current breakpoint
      const current = [...breakpoints]
        .reverse()
        .find(bp => width >= bp.minWidth) || breakpoints[0];
      
      setCurrentBreakpoint(current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [enabled]);

  if (!enabled) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[9999] transition-all duration-200`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`
        ${currentBreakpoint.color}
        text-white
        rounded-lg
        shadow-2xl
        border-2
        border-white
        font-mono
        text-xs
        transition-all
        duration-200
        ${isExpanded ? 'px-4 py-3' : 'px-3 py-2'}
      `}>
        <div className="flex items-center gap-2">
          <span className="text-base">{currentBreakpoint.icon}</span>
          <div>
            <div className="font-bold uppercase">
              {currentBreakpoint.name}
            </div>
            {isExpanded && (
              <>
                <div className="text-[10px] opacity-90 mt-1">
                  {windowSize.width} × {windowSize.height}px
                </div>
                <div className="text-[10px] opacity-75 mt-0.5">
                  {currentBreakpoint.name === 'xs' && '< 640px'}
                  {currentBreakpoint.name === 'sm' && '≥ 640px'}
                  {currentBreakpoint.name === 'md' && '≥ 768px'}
                  {currentBreakpoint.name === 'lg' && '≥ 1024px'}
                  {currentBreakpoint.name === 'xl' && '≥ 1280px'}
                  {currentBreakpoint.name === '2xl' && '≥ 1536px'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2 bg-black bg-opacity-90 text-white rounded-lg p-3 text-[10px] font-mono backdrop-blur-sm">
          <div className="font-bold mb-2">Tailwind Breakpoints</div>
          <div className="space-y-1">
            {breakpoints.map(bp => (
              <div
                key={bp.name}
                className={`flex items-center gap-2 ${
                  bp.name === currentBreakpoint.name ? 'font-bold' : 'opacity-60'
                }`}
              >
                <div className={`w-2 h-2 ${bp.color} rounded-full`}></div>
                <span className="uppercase w-8">{bp.name}:</span>
                <span>
                  {bp.name === 'xs' ? '< 640px' : `≥ ${bp.minWidth}px`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileIndicator;

import React, { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTick?: (remainingSeconds: number) => void;
  isPaused?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onTimeUp,
  onTick,
  isPaused = false,
  onPause,
  onResume,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate time remaining percentage for progress bar
  const timePercentage = (remainingSeconds / initialSeconds) * 100;

  // Determine color based on remaining time
  const getTimerColor = () => {
    if (timePercentage > 50) return 'from-green-400 to-blue-500';
    if (timePercentage > 25) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  // Determine text color
  const getTextColor = () => {
    if (timePercentage > 50) return 'text-green-600';
    if (timePercentage > 25) return 'text-orange-600';
    return 'text-red-600';
  };

  // Timer effect
  useEffect(() => {
    if (!isActive || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          setIsActive(false);
          onTimeUp();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        if (onTick) {
          onTick(newTime);
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, onTimeUp, onTick]);

  // Handle pause button
  const handlePause = () => {
    setIsActive(false);
    if (onPause) {
      onPause();
    }
  };

  // Handle resume button
  const handleResume = () => {
    setIsActive(true);
    if (onResume) {
      onResume();
    }
  };

  // Audio alert when time is running out (last 10 seconds)
  useEffect(() => {
    if (remainingSeconds === 10 && isActive && !isPaused) {
      // Play a subtle sound notification
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    }
  }, [remainingSeconds, isActive, isPaused]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Timer Display */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Circular Background */}
        <svg className="absolute w-full h-full" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke={`url(#timerGradient)`}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 95 * (remainingSeconds / initialSeconds)} ${2 * Math.PI * 95}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            className="transition-all duration-300"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="timerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              className={`bg-gradient-to-br ${getTimerColor()}`}
            >
              <stop
                offset="0%"
                stopColor={
                  timePercentage > 50
                    ? '#4ade80'
                    : timePercentage > 25
                    ? '#facc15'
                    : '#f87171'
                }
              />
              <stop
                offset="100%"
                stopColor={
                  timePercentage > 50
                    ? '#3b82f6'
                    : timePercentage > 25
                    ? '#f97316'
                    : '#dc2626'
                }
              />
            </linearGradient>
          </defs>
        </svg>

        {/* Time Display */}
        <div className="absolute flex flex-col items-center">
          <div className={`text-5xl font-bold ${getTextColor()} font-mono transition-colors duration-300`}>
            {formatTime(remainingSeconds)}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {isActive && !isPaused ? 'Time Remaining' : isPaused ? 'PAUSED' : 'Time\'s Up!'}
          </div>
        </div>
      </div>

      {/* Progress Bar (Linear) */}
      <div className="w-full max-w-xs space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-sm">
          <div
            className={`h-full bg-gradient-to-r ${getTimerColor()} transition-all duration-300`}
            style={{ width: `${Math.max(0, timePercentage)}%` }}
          ></div>
        </div>
        <div className="text-center text-xs text-gray-600">
          {Math.floor((remainingSeconds / 60) * 100)}% Time Remaining
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 justify-center">
        {!isPaused && isActive && (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            title="Pause the timer"
          >
            <span>⏸</span>
            Pause
          </button>
        )}
        {isPaused && (
          <button
            onClick={handleResume}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            title="Resume the timer"
          >
            <span>▶</span>
            Resume
          </button>
        )}
      </div>

      {/* Warning message when time is low */}
      {remainingSeconds <= 30 && isActive && !isPaused && (
        <div className="animate-pulse text-center">
          <p className="text-sm font-bold text-red-600">
            ⚠️ Time is running out! Your quiz will be auto-submitted when time expires.
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;

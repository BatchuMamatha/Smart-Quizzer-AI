import React, { useState, useEffect } from 'react';

interface InlineTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTick?: (elapsedSeconds: number) => void;
  isPaused?: boolean;
}

const InlineTimer: React.FC<InlineTimerProps> = ({
  initialSeconds,
  onTimeUp,
  onTick,
  isPaused = false,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newValue = prev + 1;
        
        if (onTick) {
          onTick(newValue);
        }

        // Check if time limit reached
        if (newValue >= initialSeconds) {
          setIsRunning(false);
          onTimeUp();
          return initialSeconds;
        }

        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, initialSeconds, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate remaining time in seconds
  const timeRemaining = initialSeconds - elapsedSeconds;
  
  // Determine color based on time remaining (not percentage)
  let timeColor = 'text-green-600 dark:text-green-500'; // Default: plenty of time
  let bgColor = 'bg-green-50 dark:bg-green-900/20';
  let borderColor = 'border-green-200 dark:border-green-800';
  
  if (timeRemaining <= 120) {
    // Less than 2 minutes (120 seconds) remaining = RED
    timeColor = 'text-red-600 dark:text-red-400';
    bgColor = 'bg-red-50 dark:bg-red-900/20';
    borderColor = 'border-red-200 dark:border-red-800';
  } else if (timeRemaining <= 300) {
    // Less than 5 minutes (300 seconds) remaining = YELLOW
    timeColor = 'text-yellow-600 dark:text-yellow-500';
    bgColor = 'bg-yellow-50 dark:bg-yellow-900/20';
    borderColor = 'border-yellow-200 dark:border-yellow-800';
  }

  // Audio alert when less than 2 minutes remaining
  useEffect(() => {
    if (timeRemaining === 120 && isRunning) {
      // Play alert sound when hitting 2 minute mark
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.log('Audio context not available');
      }
    }
  }, [timeRemaining, isRunning]);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${borderColor} ${bgColor} ${isPaused ? 'opacity-60' : ''} transition-all duration-300`}>
      {/* Timer Icon and Time - showing elapsed time */}
      <div className="flex items-center gap-1">
        <span className="text-lg">{isPaused ? '⏸️' : '⏱️'}</span>
        <span className={`font-bold text-base ${timeColor} transition-colors duration-300`}>
          {formatTime(elapsedSeconds)}
        </span>
      </div>

      {/* Paused indicator */}
      {isPaused && (
        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 font-semibold">
          PAUSED
        </span>
      )}

      {/* Warning when less than 2 minutes remaining */}
      {!isPaused && timeRemaining <= 120 && timeRemaining > 0 && (
        <span className="ml-2 text-xs text-red-600 dark:text-red-400 font-semibold animate-pulse">
          ⚠️ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} left
        </span>
      )}
    </div>
  );
};

export default InlineTimer;

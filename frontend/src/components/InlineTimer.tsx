import React, { useState, useEffect } from 'react';

interface InlineTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTick?: (elapsedSeconds: number) => void;
}

const InlineTimer: React.FC<InlineTimerProps> = ({
  initialSeconds,
  onTimeUp,
  onTick,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

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
  }, [isRunning, initialSeconds, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage (elapsed / total)
  const progressPercentage = (elapsedSeconds / initialSeconds) * 100;
  
  // Determine color based on progress (reverse: less color at start, more as time passes)
  let timeColor = 'text-green-600'; // 0-50% elapsed = green
  let bgColor = 'bg-green-50';
  let borderColor = 'border-green-200';
  
  if (progressPercentage >= 75) {
    // 75-100% elapsed (25% time left)
    timeColor = 'text-red-600';
    bgColor = 'bg-red-50';
    borderColor = 'border-red-200';
  } else if (progressPercentage >= 50) {
    // 50-75% elapsed (50% time left)
    timeColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-200';
  }

  // Audio alert when 90% of time has elapsed (10% remaining)
  useEffect(() => {
    const timeRemaining = initialSeconds - elapsedSeconds;
    if (timeRemaining === 10 && isRunning) {
      // Play beep sound using Web Audio API
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
  }, [elapsedSeconds, isRunning, initialSeconds]);

  const timeRemaining = initialSeconds - elapsedSeconds;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${borderColor} ${bgColor}`}>
      {/* Timer Icon and Time - showing elapsed time */}
      <div className="flex items-center gap-1">
        <span className="text-lg">⏱️</span>
        <span className={`font-bold text-base ${timeColor}`}>
          {formatTime(elapsedSeconds)}
        </span>
      </div>

      {/* Warning when 30 seconds remaining */}
      {timeRemaining <= 30 && timeRemaining > 0 && (
        <span className="ml-2 text-xs text-red-600 font-semibold animate-pulse">
          ⚠️ {timeRemaining}s left
        </span>
      )}
    </div>
  );
};

export default InlineTimer;

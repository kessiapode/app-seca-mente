'use client';

import { useState } from 'react';
import { MOODS } from '@/lib/constants';
import type { Mood } from '@/lib/types';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

export default function MoodSelector({ onMoodSelect, selectedMood }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">Como você está se sentindo hoje?</p>
        <p className="text-xs text-gray-500 italic">
          Perceber como você se sente é o primeiro passo para não descontar tudo na comida.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodSelect(mood.value as Mood)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedMood === mood.value
                ? 'border-purple-400 bg-purple-50 shadow-md scale-105'
                : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/50'
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-gray-700">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

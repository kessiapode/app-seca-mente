'use client';

import { Check } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  onToggle: () => void;
  type?: 'visualizacao' | 'afirmacao' | 'desafio';
}

export default function ActivityCard({
  title,
  description,
  duration,
  completed,
  onToggle,
  type = 'afirmacao',
}: ActivityCardProps) {
  const typeColors = {
    visualizacao: 'from-purple-400 to-pink-400',
    afirmacao: 'from-green-400 to-teal-400',
    desafio: 'from-orange-400 to-pink-400',
  };

  return (
    <div
      onClick={onToggle}
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        completed
          ? 'border-green-400 bg-green-50 shadow-lg'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
      }`}
    >
      {completed && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[type]} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xl">✨</span>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
              {duration}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

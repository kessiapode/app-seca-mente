'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar para o início</span>
    </button>
  );
}


'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard')}
      className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar para o início</span>
    </button>
  );
}

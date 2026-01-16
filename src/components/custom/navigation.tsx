'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Brain, Apple, Headphones, Heart, BookOpen } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: 'Início', href: '/dashboard', icon: Home },
    { label: 'Mente', href: '/mente', icon: Brain },       // se não tiver /mente ainda, podemos apontar para /meditacoes
    { label: 'Dieta', href: '/dieta', icon: Apple },
    { label: 'Meditações', href: '/meditacoes', icon: Headphones },
    { label: 'Emoções', href: '/emocoes', icon: Heart },
    { label: 'Diário', href: '/diario', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:relative md:shadow-none md:border-none">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex flex-col items-center justify-center flex-1 min-w-[48px] ${
                active ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className={`text-[10px] font-semibold ${active ? 'font-black' : ''}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

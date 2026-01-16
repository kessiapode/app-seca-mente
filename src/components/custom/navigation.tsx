'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Brain, Apple, Headphones, Heart, BookOpen } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: 'Início',      href: '/dashboard',   icon: Home },
    { label: 'Mente',       href: '/mente',       icon: Brain },
    { label: 'Dieta',       href: '/dieta',       icon: Apple },
    { label: 'Meditações',  href: '/meditacoes',  icon: Headphones },
    { label: 'Emoções',     href: '/emocoes',     icon: Heart },
    { label: 'Diário',      href: '/diario',      icon: BookOpen },
  ];

  return (
    <div className="flex gap-6 overflow-x-auto no-scrollbar py-1 flex-1">
      {items.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center justify-center min-w-[60px] transition-all ${
              active ? 'text-purple-600 scale-110' : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className={`text-[10px] uppercase tracking-tighter ${active ? 'font-black' : 'font-bold'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

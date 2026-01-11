'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Brain, Heart, BookOpen, Apple, Volume2 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/mente', icon: Brain, label: 'Mente' },
    { href: '/dieta', icon: Apple, label: 'Dieta' },
    { href: '/meditacoes', icon: Volume2, label: 'Meditações' },
    { href: '/emocoes', icon: Heart, label: 'Emoções' },
    { href: '/diario', icon: BookOpen, label: 'Diário' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50/50'
                }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

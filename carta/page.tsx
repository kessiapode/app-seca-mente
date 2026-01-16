'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { Sparkles, Save, Heart } from 'lucide-react';

export default function CartaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [carta, setCarta] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCarta = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('carta_futuro')
        .eq('id', session.user.id)
        .single();

      if (profile?.carta_futuro) {
        setCarta(profile.carta_futuro);
      }
      setLoading(false);
    };
    loadCarta();
  }, [router]);

  const salvarCarta = async () => {
    setSaving(true);
    setMessage('');
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase
      .from('profiles')
      .update({ carta_futuro: carta })
      .eq('id', session?.user.id);

    if (error) {
      setMessage('Erro ao salvar. Tente novamente.');
    } else {
      setMessage('Sua visão foi selada com sucesso! ✨');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-24">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 text-3xl font-bold"
          >
            ←

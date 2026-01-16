'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Verifique seu e-mail para confirmar o cadastro!');
      }
    } catch (error: any) {
      setMessage(error.message || 'Erro ao processar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-purple-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-purple-900 mb-2">
            {mode === 'login' ? 'Bem-vinda de volta! 💜' : 'Crie sua conta 🌟'}
          </h1>
          <p className="text-gray-600 text-sm">
            {mode === 'login'
              ? 'Entre para continuar sua jornada'
              : 'Comece sua transformação agora'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Processando...' : mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl text-sm text-purple-800 text-center">
            {message}
          </div>
        )}

        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="w-full text-purple-500 text-sm hover:text-purple-700 transition-all mt-4"
        >
          {mode === 'login' ? 'Não tem conta? Criar agora →' : '← Já tem conta? Entrar'}
        </button>

        {mode === 'signup' && (
          <p className="mt-4 text-xs text-center text-gray-500 leading-relaxed">
            ⚠️ Não recebeu o e-mail? <br />
            Verifique sua caixa de <strong>Spam</strong> ou <strong>Promoções</strong>. <br />
            O link de confirmação pode levar até 2 minutos para chegar.
          </p>
        )}

        <button
          onClick={() => router.push('/')}
          className="w-full text-gray-400 text-xs mt-6 hover:text-gray-600 transition-all"
        >
          ← Voltar para o início
        </button>
      </div>
    </div>
  );
}

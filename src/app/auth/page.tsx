'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('✅ Conta criada! Verifique seu e-mail para confirmar.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Verifica se é VIP
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_vip')
          .eq('id', data.user.id)
          .single();

        if (profile?.is_vip) {
          router.push('/dashboard'); // VIP vai pro painel
        } else {
          router.push('/checkout'); // Não VIP vai pro checkout
        }
      }
    } catch (error: any) {
      setMessage('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('⚠️ Digite seu e-mail primeiro.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setMessage('❌ ' + error.message);
    } else {
      setMessage('✅ E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-2">
          {mode === 'login' ? 'Bem-vinda de volta! ✨' : 'Criar Conta 💎'}
        </h1>
        <p className="text-purple-600 text-sm text-center mb-8">
          {mode === 'login' ? 'Entre para acessar seu conteúdo' : 'Comece sua transformação hoje'}
        </p>

        {message && (
          <div className="mb-4 p-4 rounded-xl bg-purple-50 text-purple-800 text-sm text-center">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl border border-purple-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl border border-purple-200 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-purple-700 transition-all disabled:opacity-50 mb-4"
        >
          {loading ? '⏳ Aguarde...' : mode === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
        </button>

        {mode === 'login' && (
          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="w-full text-purple-400 text-sm underline mb-4 hover:text-purple-600 transition-all"
          >
            Esqueci minha senha
          </button>
        )}

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setMessage('');
          }}
          className="w-full text-purple-500 text-sm hover:text-purple-700 transition-all"
        >
          {mode === 'login' ? 'Não tem conta? Criar agora →' : '← Já tem conta? Entrar'}
        </button>

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

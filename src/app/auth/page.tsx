'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const REDIRECT_TO = 'https://app-seca-mente.vercel.app'; // <-- ajuste aqui para o seu domínio (pode ser rota específica)

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // novos estados para envio de links
  const [sendingReset, setSendingReset] = useState(false);
  const [sendingMagic, setSendingMagic] = useState(false);

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

  // Envia link de recuperação — tenta métodos compatíveis com diferentes versões do client
  async function handleSendPasswordReset() {
    if (!email) {
      setMessage('Por favor, digite seu e-mail antes de enviar o link de recuperação.');
      return;
    }
    setSendingReset(true);
    setMessage('');
    try {
      // Tenta usar resetPasswordForEmail se disponível (algumas versões do client)
      if ((supabase.auth as any).resetPasswordForEmail) {
        const resp = await (supabase.auth as any).resetPasswordForEmail(email, {
          redirectTo: REDIRECT_TO,
        });
        if (resp?.error) throw resp.error;
      } else if ((supabase.auth as any).api && (supabase.auth as any).api.resetPasswordForEmail) {
        // fallback para versões antigas com supabase.auth.api.resetPasswordForEmail
        const resp = await (supabase.auth as any).api.resetPasswordForEmail(email, {
          redirectTo: REDIRECT_TO,
        });
        if (resp?.error) throw resp.error;
      } else {
        // fallback: usar signInWithOtp enviando o email (algumas setups usam este fluxo)
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: REDIRECT_TO },
        });
        if (error) throw error;
      }
      setMessage('Link de recuperação enviado! Verifique seu e-mail (spam/promoções).');
    } catch (err: any) {
      setMessage(err.message || 'Erro ao enviar o link de recuperação.');
    } finally {
      setSendingReset(false);
    }
  }

  // Envia magic link (entrar sem senha)
  async function handleSendMagicLink() {
    if (!email) {
      setMessage('Digite seu e-mail para receber o magic link.');
      return;
    }
    setSendingMagic(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: REDIRECT_TO },
      });
      if (error) throw error;
      setMessage('Magic link enviado! Abra o e-mail e clique para entrar sem senha.');
    } catch (err: any) {
      setMessage(err.message || 'Erro ao enviar magic link.');
    } finally {
      setSendingMagic(false);
    }
  }

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
              // Não marcar required para signup/login — required mantém comportamento atual
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* BLOCO ADICIONAL: Esqueci minha senha + Magic Link (apenas no modo login) */}
          {mode === 'login' && (
            <div className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSendPasswordReset}
                disabled={sendingReset}
                className="text-sm text-purple-600 hover:underline w-fit"
              >
                {sendingReset ? 'Enviando link...' : 'Esqueci minha senha'}
              </button>

              <button
                type="button"
                onClick={handleSendMagicLink}
                disabled={sendingMagic}
                className="text-sm text-purple-600 hover:underline w-fit"
              >
                {sendingMagic ? 'Enviando...' : 'Entrar com magic link (sem senha)'}
              </button>
            </div>
          )}

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

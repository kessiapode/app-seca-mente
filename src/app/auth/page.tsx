'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/custom/logo';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Verificar se usuário já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setMessage('Conta criada! Verifique seu email para confirmar o cadastro.');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirecionamento será feito pelo onAuthStateChange
    } catch (error: any) {
      setError(error.message || 'Erro ao entrar');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-32 h-32">
            <Logo />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-32 h-32">
              <Logo />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">SecaMente</h1>
            <p className="text-gray-600 mt-2">
              Emagrecimento leve que começa na sua mente
            </p>
          </div>
        </div>

        {/* Card de Autenticação */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Campo de Senha */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'Crie uma senha' : 'Sua senha'}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Mensagens de Erro e Sucesso */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {message}
              </div>
            )}

            {/* Botões de Ação */}
            <div className="space-y-3 pt-2">
              {isSignUp ? (
                <>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Criando conta...' : 'Criar conta'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setError('');
                      setMessage('');
                    }}
                    className="w-full text-purple-600 font-medium py-2 hover:text-purple-700 transition-colors duration-200"
                  >
                    Já tem uma conta? Entre
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Entrando...' : 'Entrar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setError('');
                      setMessage('');
                    }}
                    className="w-full text-purple-600 font-medium py-2 hover:text-purple-700 transition-colors duration-200"
                  >
                    Não tem uma conta? Cadastre-se
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Mensagem de Boas-vindas */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Ao criar uma conta, você concorda com nossos{' '}
            <span className="text-purple-600 font-medium">Termos de Uso</span> e{' '}
            <span className="text-purple-600 font-medium">Política de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  );
}

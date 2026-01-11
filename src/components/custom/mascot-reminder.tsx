'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface MascotReminderProps {
  onClose?: () => void;
}

const mascotMessages = [
  {
    text: "Psiu, Criadora! 💚 Já assumiu seu estado hoje?",
    emoji: "✨"
  },
  {
    text: "Oi, linda! Sua mente está pedindo um carinho... Que tal uma meditação rapidinha?",
    emoji: "🧘‍♀️"
  },
  {
    text: "Eiii! Já registrou suas emoções hoje? Seu eu futuro vai agradecer! 💜",
    emoji: "💭"
  },
  {
    text: "Olha eu aqui de novo! 😊 Vamos fazer aquela visualização gostosa?",
    emoji: "🌟"
  },
  {
    text: "Criadora, você está comendo por fome ou por emoção? Só checando! 💚",
    emoji: "🤔"
  },
  {
    text: "Seu corpo já está respondendo à nova história que você conta! Continue! 🦋",
    emoji: "🌸"
  },
  {
    text: "Que tal escrever no diário hoje? Sua versão magra tem muito a dizer! ✍️",
    emoji: "📖"
  },
  {
    text: "Lembrete carinhoso: você já É a mulher que deseja ser. Só precisa assumir! 💫",
    emoji: "👑"
  }
];

export default function MascotReminder({ onClose }: MascotReminderProps) {
  const [message, setMessage] = useState(mascotMessages[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Escolhe mensagem aleatória
    const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
    setMessage(randomMessage);

    // Mostra o mascote após um delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 animate-in slide-in-from-bottom-5 duration-500">
      <div className="relative">
        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Fechar lembrete"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Card do mascote */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-2xl p-4 max-w-xs border-2 border-purple-200">
          <div className="flex items-start gap-3">
            {/* Avatar do mascote - usando a logo correta */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg animate-bounce p-2">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/291d973e-ccaf-4a5f-9829-9a4619dd6b2b.png" 
                  alt="Mascote SecaMente" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex-1">
              <div className="bg-white rounded-xl p-3 shadow-md relative">
                {/* Triangulinho do balão */}
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  {message.text}
                </p>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl">{message.emoji}</span>
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

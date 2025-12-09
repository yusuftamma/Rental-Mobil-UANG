import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Selamat datang di UANG. Saya telah menganalisis status armada dan KPI keuangan Anda. Apa yang dapat saya bantu untuk strategi bisnis Anda hari ini?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateAIResponse(input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-800/30 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
        <div className="p-2 bg-amber-500/20 rounded-lg">
          <Sparkles className="text-amber-500" size={20} />
        </div>
        <div>
          <h3 className="text-white font-bold">UANG Intelligent Advisor</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Online • Gemini 2.5 Flash
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-600' : 'bg-amber-600'}`}>
                {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-slate-700 text-white rounded-tr-none' : 'bg-slate-900/80 border border-slate-700 text-slate-200 rounded-tl-none'}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <p className="text-[10px] opacity-50 mt-2 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-600">
                <Bot size={16} className="text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-200 rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-700">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan wawasan operasional kepada UANG..."
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-500"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          AI mungkin membuat kesalahan. Verifikasi data armada kritis secara manual.
        </p>
      </div>
    </div>
  );
};

export default AiAdvisor;
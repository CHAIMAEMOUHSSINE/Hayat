
import React from 'react';
import { Language, TranslationSet, ViewState } from '../types';
import LanguageSelector from './LanguageSelector';
import { Activity, Search, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationSet;
  currentView: ViewState;
  onViewChange: (v: ViewState) => void;
  onOpenSearch: () => void;
}

const Navbar: React.FC<Props> = ({ lang, onLanguageChange, t, currentView, onViewChange, onOpenSearch }) => {
  const scrollTo = (id: string) => {
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <button 
            onClick={() => onViewChange('landing')}
            className="flex items-center gap-3 group transition-all"
          >
             <div className="w-10 h-10 bg-nhs-blue flex items-center justify-center rounded-xl shadow-lg shadow-nhs-blue/20 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-gray-900 leading-none tracking-tight font-archivo uppercase">
                  Hayat
                </span>
                <span className="text-[10px] font-black text-nhs-blue uppercase tracking-[0.2em] mt-1">
                  Moroccan Medical AI
                </span>
             </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => onViewChange('landing')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentView === 'landing' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentView === 'dashboard' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')}
              className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900"
            >
              Support
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-nhs-green font-bold text-[10px] tracking-widest border border-green-500/20 px-3 py-1.5 rounded-full bg-green-500/5">
               <ShieldCheck className="w-3.5 h-3.5" />
               PII SECURE
            </div>
            <button 
              onClick={onOpenSearch}
              className="p-2.5 bg-gray-50 text-gray-400 hover:text-nhs-blue hover:bg-nhs-blue/5 rounded-xl transition-all"
              title="Global Search (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>
            <LanguageSelector current={lang} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

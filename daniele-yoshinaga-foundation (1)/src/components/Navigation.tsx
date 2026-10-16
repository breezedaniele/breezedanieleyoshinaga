import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  onDonateClick: () => void;
  activeSection: string;
}

export default function Navigation({ onDonateClick, activeSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'mission', label: t('Missão', 'Mission') },
    { id: 'impact', label: t('Áreas de Impacto', 'Impact Domains') },
    { id: 'history', label: t('Nossa História', 'Our History') },
    { id: 'breeze-daniele', label: 'Breeze Daniele' },
    { id: 'calculator', label: t('Calculadora', 'Impact Estimator') },
    { id: 'faq', label: t('Dúvidas & Contato', 'FAQ & Inquire') },
  ];

  return (
    <nav 
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-slate-200' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Title Area from Professional Polish Theme */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="flex items-center justify-center p-0.5 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-105 transition-transform overflow-hidden">
              <Logo size={30} iconOnly={true} />
            </div>
            <div>
              <span className={`block font-display font-bold text-[11px] sm:text-xs md:text-sm tracking-tight transition-colors leading-tight ${
                isScrolled ? 'text-[#0f172a]' : 'text-[#0f172a] md:text-white'
              }`}>
                BREEZE DANIELE YOSHINAGA <span className={isScrolled ? 'text-indigo-600 font-bold' : 'text-indigo-200 md:text-indigo-300 font-bold'}>FOUNDATION</span>
              </span>
              <span className={`block text-[8px] sm:text-[9px] font-sans font-medium tracking-wider uppercase leading-tight mt-0.5 ${
                isScrolled ? 'text-slate-500' : 'text-slate-300 md:text-indigo-200/80'
              }`}>
                {t('Cultura · Arte · Desenvolvimento', 'Culture · Art · Development')}
              </span>
            </div>
          </div>

          {/* Desktop Links & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans font-semibold text-sm transition-colors relative py-1 hover:text-indigo-600 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-indigo-600' 
                    : isScrolled ? 'text-slate-650' : 'text-slate-750 md:text-indigo-50/90 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            ))}

            {/* Language Switcher Link / Selector */}
            <div className="flex items-center p-0.5 rounded-full border border-slate-200/70 bg-slate-100/80 md:bg-white/10 md:border-white/20 backdrop-blur-xs transition-colors">
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                title="Mudar idioma para Português"
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'pt'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>PT</span>
              </button>
              <span className={`text-[10px] px-0.5 ${isScrolled ? 'text-slate-400' : 'text-white/40'}`}>/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                title="Switch language to English"
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>EN</span>
              </button>
            </div>
            
            <button
              onClick={onDonateClick}
              id="nav-donate-cta"
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-lg transition-all cursor-pointer"
            >
              {t('Doar Agora', 'Donate Now')}
            </button>
          </div>

          {/* Mobile Actions: Language Toggle, Donate Button & Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Quick Mobile Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                isScrolled 
                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                  : 'bg-white/10 text-slate-800 md:text-white border-slate-200'
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-indigo-600" />
              <span>{language === 'pt' ? 'PT' : 'EN'}</span>
            </button>

            <button
              onClick={onDonateClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors shadow-xs"
              aria-label="Donate"
            >
              {t('Doar', 'Donate')}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled 
                  ? 'text-slate-800 hover:bg-slate-100' 
                  : 'text-slate-900 hover:bg-white/20'
              }`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 shadow-xl animate-in fade-in-50 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left font-sans font-semibold text-sm px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                activeSection === item.id 
                  ? 'text-indigo-600 bg-indigo-50/60' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Language Switcher Row */}
          <div className="pt-3 pb-1 border-t border-slate-100">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Globe className="h-4 w-4 text-indigo-600" />
                <span>{t('Idioma / Language:', 'Language / Idioma:')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'pt' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Português
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onDonateClick();
              }}
              className="flex items-center justify-center space-x-2 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-full shadow-md hover:bg-indigo-700 transition-all text-sm cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-white text-white" />
              <span>{t('Doar Agora', 'Donate Now')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

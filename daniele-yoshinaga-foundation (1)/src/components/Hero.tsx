import React from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown, Award, Globe, Leaf, Sparkles } from 'lucide-react';
import Logo from './Logo';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onDonateClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onDonateClick, onExploreClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden pt-20">
      {/* Colorful Interactive Drawing Canvas Background */}
      <ColorfulDrawingBackground />

      {/* Decorative Blur Spheres from Professional Theme */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(241,245,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(241,245,249,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35 pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 text-center">
        
        {/* Dynamic Interactive Foundation Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.25 }}
          className="flex justify-center mb-8"
        >
          <div className="relative p-2 bg-white/10 backdrop-blur-md rounded-3xl border border-slate-700/40 shadow-2xl hover:border-indigo-500/50 transition-all group scale-100 hover:scale-[1.02]">
            {/* Soft inner contrasting color card panel for the official logo */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl flex items-center justify-center shadow-sm">
              <Logo size={140} />
            </div>
            {/* Pulsing beacon glow */}
            <div className="absolute inset-x-0 inset-y-0 rounded-3xl border border-indigo-400/20 group-hover:border-indigo-400/50 transition-colors pointer-events-none scale-105 animate-pulse" />
          </div>
        </motion.div>

        {/* Foundation Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-slate-800/60 border border-slate-700/60 px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="font-sans text-xs font-semibold text-indigo-200 tracking-wider uppercase">
            {t('Um Legado Vivo de Amor e Solidariedade', 'A Living Legacy of Joyful Giving')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none max-w-4xl mx-auto"
        >
          {t('Protegendo Crianças.', 'Protecting Children.')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-300">
            {t('Ensinando Sabedoria.', 'Teaching Wisdom.')}
          </span>{' '}
          {t('Inspirando Bondade.', 'Inspiring Kindness.')}
        </motion.h1>

        {/* Intro copy */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-300 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t(
            'A ',
            'The '
          )}
          <span className="text-white font-semibold underline decoration-indigo-500 decoration-2 underline-offset-4">
            Breeze Daniele Yoshinaga Foundation
          </span>
          {t(
            ' apoia crianças em situação de abandono e vulnerabilidade. Juntos, ensinamos conhecimentos essenciais para a vida e tecnologia, nutrindo a profunda força da resiliência e da empatia.',
            ' stands alongside abandoned and vulnerable kids. Together, we teach every essential life and tech knowledge, and cultivate the profound strengths of resilience and kindness.'
          )}
        </motion.p>

        {/* Buttons Action Group */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onDonateClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all outline-none cursor-pointer"
          >
            <Heart className="h-5 w-5 fill-white text-white" />
            <span>{t('Apoiar Esta Missão', 'Support This Mission')}</span>
          </button>
          
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700 text-slate-200 font-medium px-8 py-4 rounded-full transition-all cursor-pointer"
          >
            <span>{t('Explorar Nossa Jornada', 'Explore Our Journey')}</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-indigo-400" />
          </button>
        </motion.div>

        {/* Statistics Board */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/60 md:backdrop-blur-sm border border-slate-850 p-6 md:p-8 rounded-3xl max-w-5xl mx-auto shadow-2xl"
        >
          <div className="text-center p-4 border-r border-slate-800 last:border-0">
            <div className="flex justify-center mb-2">
              <Globe className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-white">100%</div>
            <div className="font-sans text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
              {t('Apoio Direto', 'Direct Outreach')}
            </div>
          </div>
          
          <div className="text-center p-4 border-r border-slate-800 last:border-0">
            <div className="flex justify-center mb-2">
              <Award className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-white">12,400+</div>
            <div className="font-sans text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
              {t('Crianças Acolhidas', 'Kids Mentored')}
            </div>
          </div>

          <div className="text-center p-4 border-r border-slate-800 last:border-0">
            <div className="flex justify-center mb-2">
              <Leaf className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-white">45k+</div>
            <div className="font-sans text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
              {t('Atos de Empatia', 'Acts of Kindness')}
            </div>
          </div>

          <div className="text-center p-4 last:border-0">
            <div className="flex justify-center mb-2">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-white">8,500+</div>
            <div className="font-sans text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
              {t('Vidas Transformadas', 'Lives Transformed')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Curved Divider Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#fdfcfb] pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </div>
  );
}

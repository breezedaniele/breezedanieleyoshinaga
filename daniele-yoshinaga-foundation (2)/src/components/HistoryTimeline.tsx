import React, { useState } from 'react';
import { TIMELINE_EVENTS_PT, TIMELINE_EVENTS_EN } from '../data';
import { Landmark, ArrowUpRight, Award, Compass, Sparkles, Filter, Scale, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

export default function HistoryTimeline() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const events = language === 'pt' ? TIMELINE_EVENTS_PT : TIMELINE_EVENTS_EN;

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'founding':
        return <Landmark className="h-4 w-4 text-indigo-400" />;
      case 'milestone':
        return <Award className="h-4 w-4 text-blue-400" />;
      case 'expansion':
        return <Compass className="h-4 w-4 text-slate-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-indigo-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'founding': return t('Origem', 'Genesis');
      case 'milestone': return t('Marco Decisivo', 'Key Milestone');
      case 'expansion': return t('Expansão & Ação', 'Scaling Up');
      case 'achievement': return t('Conquista', 'Achievement');
      default: return t('Movimento', 'Movement');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'founding': return 'bg-indigo-950/60 text-indigo-300 border-indigo-800/80';
      case 'milestone': return 'bg-blue-950/60 text-blue-300 border-blue-800/80';
      case 'expansion': return 'bg-slate-800/80 text-slate-300 border-slate-700';
      default: return 'bg-slate-850/50 text-slate-400 border-slate-800';
    }
  };

  return (
    <section id="history" className="py-24 bg-[#0f172a] text-white relative overflow-hidden scroll-mt-20">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-slate-850 border border-slate-700 px-3 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <Landmark className="h-3 w-3" />
            <span>{t('Nossas Raízes', 'Our Roots')}</span>
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            {t('A Evolução de uma Visão', 'The Evolution of a Vision')}
          </h2>
          <p className="mt-6 font-sans text-slate-300 text-base md:text-lg leading-relaxed">
            {t(
              'É inspirador olhar para trás e perceber como um chamado íntimo evolui de uma inquietação silenciosa para uma missão transformadora. Nossa linha do tempo demonstra que a fundação não nasceu do acaso—é um propósito amadurecido com rigor ético, estudo e paixão incontornável.',
              "It is incredibly powerful to look back and see how a deep, personal calling evolves from a quiet thought into an active mission. Your timeline shows that this NGO wasn't a sudden idea—it's a vision that has been growing, clearing, and catching fire inside you for years to protect and guide these children."
            )}
          </p>
 
          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 mr-2 uppercase flex items-center space-x-1">
              <Filter className="h-3 w-3" />
              <span>{t('Filtro:', 'Filter:')}</span>
            </span>
            {[
              { id: 'all', label: t('Todos os Marcos', 'All Milestones') },
              { id: 'founding', label: t('Origem', 'Genesis') },
              { id: 'milestone', label: t('Marcos', 'Milestones') },
              { id: 'expansion', label: t('Expansão', 'Scaling') },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setFilter(btn.id);
                  setSelectedEventIndex(null);
                }}
                className={`text-xs font-bold px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                  filter === btn.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-350 border-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visualizer */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central bar */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-600 via-indigo-400 to-blue-500 transform -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-600 via-indigo-400 to-blue-500 md:hidden"></div>

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt, idx) => {
                const isEven = idx % 2 === 0;
                const isSelected = selectedEventIndex === idx;

                return (
                  <motion.div
                    key={`${evt.year}-${evt.title}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative flex flex-col md:flex-row items-stretch ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Circle Node on Axis */}
                    <div className="absolute left-6 md:left-1/2 top-6 transform -translate-x-1/2 z-20 flex items-center justify-center">
                      <div className="w-4 h-4 bg-indigo-500 border-4 border-[#0f172a] rounded-full hover:scale-125 transition-transform" />
                    </div>

                    {/* Timeline card container */}
                    <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                      <div 
                        onClick={() => setSelectedEventIndex(isSelected ? null : idx)}
                        className={`group cursor-pointer bg-[#111827]/75 backdrop-blur-md border p-6 rounded-3xl transition-all duration-300 relative overflow-hidden hover:shadow-md ${
                          isSelected 
                            ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg ring-1 ring-indigo-500/30' 
                            : 'border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        {/* Shimmer top border line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-400 opacity-60" />

                        <div className="flex items-center space-x-3 mb-3">
                          <span className="font-display font-black text-2xl text-indigo-400 tracking-tight">
                            {evt.year}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(evt.category)}`}>
                            {getCategoryLabel(evt.category)}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg text-white flex items-center justify-between group-hover:text-indigo-400 transition-colors">
                          <span className="line-clamp-1">{evt.title}</span>
                          <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h3>

                        <p className={`mt-3 font-sans text-sm text-slate-300 leading-relaxed ${
                          isSelected ? '' : 'line-clamp-2 sm:line-clamp-3'
                        }`}>
                          {evt.description}
                        </p>

                        {!isSelected && (
                          <div className="mt-3 text-xs font-semibold text-indigo-400 flex items-center space-x-1">
                            <span>{t('Ler registro completo', 'Read full segment')}</span>
                          </div>
                        )}

                        {isSelected && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 pt-4 border-t border-slate-800 text-xs font-sans text-slate-400 space-y-2"
                          >
                            <p className="italic">
                              {t(
                                'Sob a liderança de Daniele Yoshinaga, este período consolidou a base estrutural para a fundação atuar com máxima transparência e impacto direto.',
                                "Under Daniele Yoshinaga's steering guidance, this period solidified the groundwork for DYF's present-day structure of transparency and direct-impact execution."
                              )}
                            </p>
                            <div className="flex items-center space-x-2 text-indigo-400 font-semibold font-mono">
                              {getCategoryIcon(evt.category)}
                              <span>{t('Registro Oficial Certificado', 'Validated Foundation Record')} #{evt.year}-DYF</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Empty placeholder space to balance the screen layout */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Law-to-Legacy Connection Highlight Box */}
        <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-[#0f172a] to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center border border-[#0f172a]">
                <Flame className="h-3.5 w-3.5 text-white animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono font-black text-indigo-400 uppercase tracking-widest block mb-2">
                {t('A Ponte Entre o Direito e o Legado Humano', 'The Law-to-Legacy Connection')}
              </span>
              <p className="font-display font-medium text-lg md:text-xl text-slate-100 leading-relaxed italic">
                {t(
                  '"A formação jurídica em 2020 não foi um desvio; forneceu a compreensão estrutural da garantia de direitos e da proteção legal que hoje move a fundação com firmeza e propósito inabalável."',
                  '"Your legal background in 2020 wasn\'t a detour; it provided the structural understanding of rights and protection that now fuels the burning execution of your NGO today."'
                )}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-indigo-500" />
                <span className="font-display font-black text-xs tracking-wider uppercase text-slate-350">
                  Daniele Yoshinaga, {t('Fundadora', 'Founder')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

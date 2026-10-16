import React from 'react';
import { Donation } from '../types';
import { Sparkles, Heart, Gift, MessageCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAMPAIGNS_PT, CAMPAIGNS_EN } from '../data';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

interface DonorsWallProps {
  donations: Donation[];
}

export default function DonorsWall({ donations }: DonorsWallProps) {
  const { language, t } = useLanguage();
  const campaigns = language === 'pt' ? CAMPAIGNS_PT : CAMPAIGNS_EN;
  
  const getCampaignName = (id: string) => {
    if (id === 'general') return t('Fundo Geral Direto', 'General Direct Fund');
    return campaigns.find(c => c.id === id)?.title || t('Causa Geral', 'General Fund');
  };

  const getRandomPraiseQuote = (index: number) => {
    const quotesPt = [
      "Cada gesto de afeto constrói um futuro mais digno.",
      "O amparo a uma criança transforma gerações inteiras.",
      "Unindo tecnologia, educação e carinho no cotidiano.",
      "Um investimento direto no potencial de quem mais precisa.",
      "Acolhimento e esperança em cada amanhecer."
    ];
    const quotesEn = [
      "Every small drop makes a mighty reservoir.",
      "Empowerment begins with a single act of kindness.",
      "Rebuilding connectivity, knowledge, and inner hope.",
      "An investment in next-generation overcomers.",
      "Sustaining clean dignity and essential learning."
    ];
    const list = language === 'pt' ? quotesPt : quotesEn;
    return list[index % list.length];
  };

  return (
    <section id="community-wall" className="py-20 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-slate-800/60 border border-slate-700 px-3 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <Sparkles className="h-3 w-3 text-emerald-400" />
            <span>{t('Mural de Gratidão', 'Gratitude Board')}</span>
          </span>
          <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-white">
            {t('Mural de Reconhecimento & Apoio', "Contributors' Wall of Respect")}
          </h2>
          <p className="mt-2 font-sans text-sm text-slate-350">
            {t(
              'Agradecemos profundamente a cada apoiador, voluntário e parceiro que fortalece nossa causa e leva dignidade às crianças acolhidas.',
              'We are endlessly honored by the compassionate support of individuals from all sectors. These contributions drive open opportunities.'
            )}
          </p>
        </div>

        {/* Scrollable / Grid of Contributors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {donations.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
                className="bg-[#111827]/75 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-700 transition-all group"
              >
                {/* Visual accent circle */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-950/20 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Row one: Name and Amount */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-white leading-tight">
                        {donor.donorName}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {donor.timestamp}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-display block font-black text-emerald-400 text-lg leading-none">
                        ${donor.amount}
                      </span>
                      {donor.isRecurring && (
                        <span className="inline-flex items-center space-x-0.5 text-[8px] font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/60 px-1.5 py-0.5 rounded-md mt-1">
                          <RefreshCw className="h-2 w-2" />
                          <span>{t('Mensal', 'Monthly')}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Allocation tag */}
                  <div className="bg-slate-900/40 border border-slate-800 p-2.5 rounded-xl mb-4 text-[10px] text-slate-400 font-sans">
                    <span className="font-sans block text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                      {t('Causa Destinada:', 'Target Project:')}
                    </span>
                    <strong className="text-slate-300 block mt-0.5">{getCampaignName(donor.campaignId)}</strong>
                  </div>
                </div>

                {/* Donor Message space */}
                <div className="pt-3 border-t border-slate-800 relative z-10 min-h-[48px] flex items-start">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-400 mr-1.5 flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-slate-300 italic leading-relaxed line-clamp-2">
                    {donor.message ? `"${donor.message}"` : `"${getRandomPraiseQuote(index)}"`}
                  </p>
                </div>

                {/* Corner Mini Icon */}
                <div className="absolute bottom-2 right-2 opacity-[0.03]">
                  <Heart className="h-10 w-10 text-white fill-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global summary badge */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-mono flex items-center justify-center space-x-2">
            <Gift className="h-4 w-4 text-emerald-400" />
            <span>
              {t(
                `Faça parte da nossa rede de acolhimento e transformação de crianças.`,
                `Join our dynamic network of ${donations.length + 84} global supporters.`
              )}
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

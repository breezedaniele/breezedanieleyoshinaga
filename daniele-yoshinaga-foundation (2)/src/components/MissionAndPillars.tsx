import React, { useState } from 'react';
import { PILLARS_PT, PILLARS_EN, MISSION_STATEMENT_PT, MISSION_STATEMENT_EN } from '../data';
import { Laptop, TreeDeciduous, HeartHandshake, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

const PILLAR_ACTIVITIES_EN: Record<string, string[]> = {
  education: [
    "Academic and literacy tutoring programs tailored for children in shelters",
    "Pre-loading essential lessons and courses onto offline learning tablets",
    "Recruiting and funding specialized educators to teach core sciences and logic",
    "Providing certification pathways and career guiding for older youth"
  ],
  environment: [
    "Hosting friendly peer-to-peer mentorship clubs to foster deep mutual care",
    "Creating local social integration days filled with art and collaborative play",
    "Providing kindness packages, care kits, and daily essentials to shelters",
    "Teaching social empathy, emotional sharing, and deep listening practices"
  ],
  resilience: [
    "Sponsoring certified child psychologists and trauma counselors",
    "Structured coping workshops to teach anger management and deep calm",
    "Providing youth art and movement therapies to release trapped anxiety",
    "Creating safe space support nodes to foster high emotional endurance"
  ]
};

const PILLAR_ACTIVITIES_PT: Record<string, string[]> = {
  education: [
    "Programas de alfabetização e reforço escolar sob medida para crianças em abrigos",
    "Tablets educativos offline com cursos, ciências, matemática e línguas",
    "Contratação de educadores especializados em lógica, robótica e habilidades práticas",
    "Capacitação e direcionamento vocacional para jovens em transição para a maioridade"
  ],
  environment: [
    "Clubes de mentoria afetiva entre pares para promover cuidado recíproco",
    "Jornadas de integração comunitária com oficinas de arte e convivência lúdica",
    "Distribuição de kits de afeto, higiene, livros e materiais essenciais para abrigos",
    "Práticas de escuta ativa, inteligência emocional e resolução não-violenta de conflitos"
  ],
  resilience: [
    "Atendimento psicológico clínico e terapias infantis focadas em traumas",
    "Oficinas de regulação emocional, controle de ansiedade e fortalecimento pessoal",
    "Arteterapia e musicoterapia como canais de liberação de angústias e estresse",
    "Criação de refúgios emocionais seguros que ensinam a criança a persistir e triunfar"
  ]
};

export default function MissionAndPillars() {
  const [activeDetails, setActiveDetails] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const currentPillars = language === 'pt' ? PILLARS_PT : PILLARS_EN;
  const currentMission = language === 'pt' ? MISSION_STATEMENT_PT : MISSION_STATEMENT_EN;
  const currentActivities = language === 'pt' ? PILLAR_ACTIVITIES_PT : PILLAR_ACTIVITIES_EN;

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'education':
        return <Laptop className="h-8 w-8 text-indigo-400" />;
      case 'environment':
        return <TreeDeciduous className="h-8 w-8 text-indigo-400" />;
      default:
        return <HeartHandshake className="h-8 w-8 text-indigo-400" />;
    }
  };

  const getBgClass = () => {
    return 'bg-[#111827]/75 backdrop-blur-md border border-slate-800/85 hover:border-slate-700';
  };

  const getBadgeBg = () => {
    return 'bg-indigo-950/60 border border-indigo-805 text-indigo-350';
  };

  return (
    <section id="mission" className="py-24 bg-[#0f172a] text-white relative overflow-hidden scroll-mt-20">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mission Statement Callout */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-full inline-block">
            {t('Nosso Norte', 'Our North Star')}
          </span>
          <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            {t('Nosso Cuidado, Ensino & Missão Central', 'Our Care, Teaching & Core Mission')}
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-slate-300 leading-relaxed italic">
            "{currentMission}"
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-8 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          </div>
        </div>

        {/* Impact Domains Grid */}
        <div id="impact" className="scroll-mt-24">
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-full inline-block">
              {t('Áreas de Atuação', 'Areas of Operation')}
            </span>
            <h3 className="mt-4 font-display font-black text-2xl sm:text-3xl text-white">
              {t('Os Três Pilares Centrais de Impacto', 'The Three Core Pillars of Impact')}
            </h3>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              {t(
                'Criamos programas complementares onde conhecimento essencial, atos de bondade e resiliência interior caminham de mãos dadas.',
                'We design complementary programs where essential knowledge, acts of kindness, and inner resilience work hand-in-hand.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentPillars.map((pillar) => {
              const isExpanded = activeDetails === pillar.id;
              return (
                <div 
                  key={pillar.id}
                  className={`flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${getBgClass()} ${
                    isExpanded ? 'shadow-xl scale-[1.02] border-indigo-500/50 ring-1 ring-indigo-500/20' : 'shadow-sm'
                  }`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                        {getPillarIcon(pillar.id)}
                      </div>
                      <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${getBadgeBg()}`}>
                        {pillar.metric}
                      </span>
                    </div>

                    {/* Titles */}
                    <h4 className="mt-6 font-display font-black text-xl text-white">
                      {pillar.title}
                    </h4>
                    <p className="mt-1 font-sans text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      {pillar.subtitle}
                    </p>

                    {/* Main Description */}
                    <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Action-Reveal Section for Specifics */}
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-slate-800"
                      >
                        <h5 className="font-display font-bold text-xs text-indigo-300 uppercase tracking-widest mb-3">
                          {t('Como Executamos Este Pilar:', 'How We Execute This Pillar:')}
                        </h5>
                        <ul className="space-y-2.5">
                          {currentActivities[pillar.id]?.map((act, index) => (
                            <li key={index} className="flex items-start text-xs text-slate-300">
                              <CheckCircle className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* Toggle button */}
                  <div className="mt-8 pt-4 border-t border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => setActiveDetails(isExpanded ? null : pillar.id)}
                      className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" />
                          <span>{t('Ocultar Detalhes', 'Show Less Details')}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" />
                          <span>{t('Ver Escopo Completo', 'View Complete Scope')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

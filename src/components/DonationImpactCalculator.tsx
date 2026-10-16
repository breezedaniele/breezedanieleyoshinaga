import React, { useState } from 'react';
import { Leaf, Cpu, Heart, Coins, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

interface DonationImpactCalculatorProps {
  onSelectAmount: (amount: number, category: string) => void;
}

export default function DonationImpactCalculator({ onSelectAmount }: DonationImpactCalculatorProps) {
  const [sliderVal, setSliderVal] = useState<number>(55);
  const [selectedFocus, setSelectedFocus] = useState<'education' | 'environment' | 'resilience'>('education');
  const { language, t } = useLanguage();

  // Pre-configured levels for instant selection
  const quickTiers = [15, 35, 75, 150, 500];

  const getImpactMessage = (amount: number, lang: 'pt' | 'en') => {
    if (lang === 'pt') {
      if (amount < 15) {
        return {
          education: `Fornece livros de leitura, cadernos e kits de desenho para a jornada de aprendizagem de uma criança acolhida.`,
          environment: `Kits de lanche com afeto e cartões artesanais para fortalecer os laços de carinho em grupos de acolhimento.`,
          resilience: `Kit de conforto e bem-estar para acolher uma criança recém-chegada em transição de abrigo.`
        };
      } else if (amount < 45) {
        return {
          education: `Custeia materiais escolares e 30 horas de tutoria individualizada para alfabetização e raciocínio lógico.`,
          environment: `Livros ilustrados sobre empatia, convivência saudável e dinâmicas cooperativas para abrigos.`,
          resilience: `Guia de acolhimento emocional e sessões de arteterapia acompanhadas por voluntários especializados.`
        };
      } else if (amount < 100) {
        return {
          education: `Garante a uma turma de crianças 1 mês completo de reforço escolar diário e introdução à tecnologia.`,
          environment: `Financia oficinas de mentoria comunitária, resolução de conflitos e desenvolvimento de empatia.`,
          resilience: `Custeia oficinas em grupo de regulação emocional e resiliência conduzidas por psicólogos certificados.`
        };
      } else if (amount < 300) {
        return {
          education: `Disponibiliza um tablet educacional completo pré-carregado com biblioteca digital offline e cursos.`,
          environment: `Passeios culturais e acompanhamento social contínuo para crianças sem suporte familiar.`,
          resilience: `Garante sessões individuais profundas de psicoterapia infantil para superação de traumas.`
        };
      } else {
        return {
          education: `Estrutura um polo de aprendizado com mesas, livros, tablets e tutores para 30 crianças por um mês.`,
          environment: `Mantém rodas de escuta ativa, arte e integração social para todo um núcleo de acolhimento durante o mês.`,
          resilience: `Mantém um espaço terapêutico e acolhedor aberto, seguro e com profissionais por 1 mês, atendendo até 85 jovens.`
        };
      }
    } else {
      if (amount < 15) {
        return {
          education: `Supplies tutoring books, basic general reading, and drawing supplies for a child's learning journey.`,
          environment: `Provides kindness snack baskets and creative greeting cards to build mutual care in shelter groups.`,
          resilience: `Provides a specialized thermal emotional-composure blanket and basic hygiene kit for a transitioning child.`
        };
      } else if (amount < 45) {
        return {
          education: `Sponsors 1 young child's interactive academic textbooks and foundational knowledge curriculum keys.`,
          environment: `Sponsors custom illustrated books on empathy development and heart-centered kindness games.`,
          resilience: `Provides a beautiful trauma relief handbook and emotional journal guided by our certified volunteers.`
        };
      } else if (amount < 100) {
        return {
          education: `Registers a high-need child care sanctuary class for 1 month of dedicated daily tutoring session support.`,
          environment: `Unlocks 2 community volunteer workshops centered on peer counseling, conflict support, and sharing.`,
          resilience: `Funds a professional group resilience workshop and cognitive stress-regulation session led by certified therapists.`
        };
      } else if (amount < 300) {
        return {
          education: `Nurtures young futures by providing a secure learning tablet with digital offline-ready library curricula.`,
          environment: `Secures active integration outings and real companion program matching for children without families.`,
          resilience: `Secures two deep, individual trauma coaching, child counseling, or supportive therapy sessions.`
        };
      } else {
        return {
          education: `Provides a completed classroom resource center package containing desks, books, tablets, and tutoring tools for 30 children.`,
          environment: `Sponsors a full month of peer connection circles and community integration workshops for an entire facility.`,
          resilience: `Keeps a sanctuary healing and counseling area open, warm, and staffed for an entire month, assisting up to 85 youths.`
        };
      }
    }
  };

  const currentImpacts = getImpactMessage(sliderVal, language);

  const getCategoryTheme = () => {
    switch (selectedFocus) {
      case 'education':
        return {
          icon: <Cpu className="h-6 w-6 text-indigo-400" />,
          accent: 'indigo',
          bg: 'bg-indigo-950/60 border-indigo-800/80',
          darkBg: 'bg-[#0f172a]',
          text: 'text-indigo-300',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          impactDesc: currentImpacts.education,
          campaignId: 'educate-youth'
        };
      case 'environment':
        return {
          icon: <Leaf className="h-6 w-6 text-indigo-400" />,
          accent: 'indigo',
          bg: 'bg-indigo-950/60 border-indigo-800/80',
          darkBg: 'bg-[#0f172a]',
          text: 'text-indigo-300',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          impactDesc: currentImpacts.environment,
          campaignId: 'green-preservation'
        };
      case 'resilience':
      default:
        return {
          icon: <Heart className="h-6 w-6 text-indigo-400" />,
          accent: 'indigo',
          bg: 'bg-indigo-950/60 border-indigo-800/80',
          darkBg: 'bg-[#0f172a]',
          text: 'text-indigo-300',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          impactDesc: currentImpacts.resilience,
          campaignId: 'community-resilience'
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <section id="calculator" className="py-24 bg-[#0f172a] text-white relative overflow-hidden scroll-mt-20">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-slate-800/60 border border-slate-700 px-3 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <Coins className="h-3.5 w-3.5" />
            <span>{t('Ferramenta Interativa', 'Interactive Tool')}</span>
          </span>
          <h2 className="mt-4 font-display font-black text-3xl sm:text-4xl text-white">
            {t('Simule o Impacto do Seu Apoio', 'Simulate Your Donation Impact')}
          </h2>
          <p className="mt-4 font-sans text-slate-350 text-sm leading-relaxed">
            {t(
              'Na Breeze Daniele Yoshinaga Foundation, cada contribuição vai diretamente para o amparo e desenvolvimento das crianças. Mova o controle para conhecer o valor real do seu apoio.',
              'At the Breeze Daniele Yoshinaga Foundation, every cent goes directly toward empowering people and planet. Slide the controller to see the real-world value of your giving.'
            )}
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="max-w-5xl mx-auto bg-[#111827]/75 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Slider & Tier Panel (Left side) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-display font-extrabold text-xl text-white mb-2">
                {t('1. Selecione o Valor do Apoio', '1. Select Your Support Range')}
              </h3>
              <p className="font-sans text-xs text-slate-400 mb-6 font-semibold">
                {t('Escolha um patamar pré-definido ou ajuste livremente na barra.', 'Choose a general tier or slide for custom contributions.')}
              </p>

              {/* Quick Chips Selection */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {quickTiers.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSliderVal(tier)}
                    className={`font-mono text-xs font-bold px-5 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                      sliderVal === tier
                        ? 'bg-[#1e293b] text-white border-indigo-500 shadow-md scale-105 ring-1 ring-indigo-500/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    ${tier}
                  </button>
                ))}
              </div>

              {/* Slider Controller */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-slate-500">MIN: $5</span>
                  <div className="bg-indigo-950/70 text-indigo-300 font-mono font-extrabold text-3xl px-5 py-2.5 rounded-2xl shadow-sm border border-indigo-800/90">
                    ${sliderVal}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">MAX: $1000</span>
                </div>
                
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Campaign Pillar Focus Picker */}
            <div>
              <h3 className="font-display font-bold text-sm text-white mb-3">
                {t('2. Selecione a Área de Interesse', '2. Select Area of Concern')}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'education', label: t('Conhecimento', 'Knowledge'), icon: Cpu, activeColor: 'ring-indigo-500/50' },
                  { id: 'environment', label: t('Bondade', 'Kindness'), icon: Leaf, activeColor: 'ring-indigo-500/50' },
                  { id: 'resilience', label: t('Resiliência', 'Resilience'), icon: Heart, activeColor: 'ring-indigo-500/50' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedFocus === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFocus(item.id as any)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected 
                          ? `bg-indigo-950 text-white border-indigo-500 shadow-md ring-2 ${item.activeColor}` 
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-1.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Impact Feedback Widget (Right side) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0f172a]/70 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            {/* Corner Decorative Star */}
            <div className="absolute top-2 right-2 p-2">
              <Sparkles className="h-5 w-5 text-indigo-500/20" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-md">
                {theme.icon}
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {selectedFocus === 'education' 
                    ? t('Conhecimento & Tecnologia', 'Essential Wisdom') 
                    : selectedFocus === 'environment' 
                    ? t('Bondade & Acolhimento', 'Kindness Outreach') 
                    : t('Resiliência Interior', 'Inner Resilience')}
                </span>
              </div>

              <div>
                <span className="font-display block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t('Impacto Real Projetado', 'Tangible Impact Outcome')}
                </span>
                <p className="font-display font-extrabold text-xl md:text-2xl text-white leading-snug">
                  "{theme.impactDesc}"
                </p>
              </div>

              {/* Dynamic Progress indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-400 uppercase">
                  <span>{t('Classificação Relativa', 'Relative Power Rating')}</span>
                  <span>{Math.round((sliderVal / 1000) * 100)}% {t('do Patamar Máximo', 'of Max tier')}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${Math.max(2, Math.min(100, (sliderVal / 1000) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Safety validation pledge */}
              <div className="flex items-start space-x-2.5 bg-[#131d35]/60 p-3.5 rounded-2xl border border-slate-800">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                  {t(
                    'Todas as contribuições e apoios são coordenados diretamente com a Breeze Daniele Yoshinaga Foundation, com total transparência e direcionamento aos projetos sociais.',
                    'All contributions and partnerships are coordinated directly with the Breeze Daniele Yoshinaga Foundation, ensuring 100% transparency and direct social impact.'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onSelectAmount(sliderVal, theme.campaignId)}
                className={`w-full flex items-center justify-center space-x-2 font-bold px-6 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all outline-none ${theme.button}`}
              >
                <span>{t(`Apoiar com $${sliderVal} · Entrar em Contato`, `Commit $${sliderVal} · Get in Touch`)}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

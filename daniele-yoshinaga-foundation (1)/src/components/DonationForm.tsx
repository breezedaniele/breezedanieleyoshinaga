import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CAMPAIGNS_PT, CAMPAIGNS_EN } from '../data';
import { Donation, ActiveDonationInput } from '../types';
import { 
  Heart, Mail, Check, Copy, ExternalLink, Send, Sparkles, 
  ShieldCheck, ArrowRight, MessageSquare, HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

interface DonationFormProps {
  onDonationSuccess?: (donation: Donation) => void;
  recentDonations?: Donation[];
}

export interface DonationFormRef {
  setPredefinedAmount: (amount: number, campaignId: string) => void;
}

const DonationForm = forwardRef<DonationFormRef, DonationFormProps>(({ recentDonations = [] }, ref) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('educate-youth');
  const [pledgeAmount, setPledgeAmount] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Optional quick email drafter
  const [donorName, setDonorName] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');

  const { language, t } = useLanguage();
  const campaigns = language === 'pt' ? CAMPAIGNS_PT : CAMPAIGNS_EN;

  const primaryEmail = 'contato@breezedanieleyoshinaga.org';
  const secondaryEmail = 'yoshinagadani@gmail.com';

  // Expose function for parents (e.g., calculator) to set predefined amount and focus on contact
  useImperativeHandle(ref, () => ({
    setPredefinedAmount(amt: number, campId: string) {
      setPledgeAmount(amt);
      setSelectedCampaignId(campId);
      
      const elem = document.getElementById('donation-portal');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }));

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2500);
  };

  const selectedCampaignName = selectedCampaignId === 'general' 
    ? t('Fundo Geral / General Direct Fund', 'General Direct Fund / Fundo Geral')
    : campaigns.find(c => c.id === selectedCampaignId)?.title || t('Causa Geral', 'General Cause');

  const generateMailtoUrl = (recipient: string) => {
    const subject = encodeURIComponent(
      `Doação / Apoio - Breeze Daniele Yoshinaga Foundation${pledgeAmount ? ` - $${pledgeAmount}` : ''}`
    );
    const bodyLines = [
      `Olá, Breeze Daniele Yoshinaga Foundation,`,
      ``,
      `Gostaria de entrar em contato para realizar uma doação e apoiar os projetos da fundação.`,
      pledgeAmount ? `Valor pretendido / Intended Amount: $${pledgeAmount} USD` : '',
      `Projeto de interesse / Project: ${selectedCampaignName}`,
      donorName.trim() ? `Nome / Name: ${donorName.trim()}` : '',
      donorMessage.trim() ? `Mensagem / Message: ${donorMessage.trim()}` : '',
      ``,
      `Agradeço desde já pelo trabalho de acolhimento e resiliência!`
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="donation-portal" className="py-24 bg-[#0f172a] text-white relative overflow-hidden scroll-mt-20">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      {/* Visual glowing elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-slate-800/80 border border-slate-700 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-indigo-400 fill-indigo-400" />
            <span>{t('DONATE NOW · COMO DOAR & APOIAR', 'DONATE NOW · HOW TO DONATE & SUPPORT')}</span>
          </span>
          <h2 className="mt-4 font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            {t('Apoie Nossos Projetos & Causas', 'Support Our Projects & Causes')}
          </h2>
          <p className="mt-3 font-sans text-slate-350 text-base leading-relaxed">
            {t(
              'Para realizar doações, apoiar crianças em situação de vulnerabilidade ou firmar parcerias institucionais com a ',
              'To make donations, support vulnerable children, or establish institutional partnerships with the '
            )}
            <strong className="text-white">Breeze Daniele Yoshinaga Foundation</strong>:
          </p>
        </div>

        {/* Highlighted Banner with the exact requested text */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-blue-950/90 border-2 border-indigo-500/50 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full mb-3 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Canal Oficial de Atendimento & Doações', 'Official Support & Donation Channel')}</span>
          </div>

          <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
            ENTRE EM CONTATO:
          </h3>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-bold font-mono text-indigo-300 break-words">
            <a 
              href={`mailto:${primaryEmail}`} 
              className="hover:underline text-indigo-300 hover:text-white transition-colors"
            >
              {primaryEmail}
            </a>
            {' '}<span className="text-slate-400 font-sans font-normal text-base sm:text-lg">{t('ou', 'or')}</span>{' '}
            <a 
              href={`mailto:${secondaryEmail}`} 
              className="hover:underline text-indigo-300 hover:text-white transition-colors"
            >
              {secondaryEmail}
            </a>
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-350 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Estamos à disposição para receber contribuições, orientar processos de apoio a causas infantis, envio de recibos oficiais e parcerias culturais e artísticas.',
              'We are readily available to receive contributions, coordinate support for vulnerable children, issue official certificates, and establish cultural and artistic partnerships.'
            )}
          </p>
        </motion.div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Campaigns / Projects Tracker (Left 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-indigo-400">
                {t('Causas & Projetos para Apoiar', 'Causes & Projects to Support')}
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {t('Selecione para direcionar', 'Select to direct')}
              </span>
            </div>

            {campaigns.map((camp) => {
              const extraFunding = recentDonations
                .filter(d => d.campaignId === camp.id)
                .reduce((accum, curr) => accum + curr.amount, 0);
              
              const liveRaised = camp.raised + extraFunding;
              const percent = Math.min(100, Math.round((liveRaised / camp.goal) * 100));
              const isSelected = selectedCampaignId === camp.id;

              return (
                <div 
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-lg ring-2 ring-indigo-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-display font-bold text-sm text-slate-100">{camp.title}</span>
                    <span className="text-[10px] uppercase font-mono font-bold text-indigo-300 bg-indigo-550/20 px-2.5 py-0.5 rounded-full">
                      {camp.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">
                    {camp.shortDescription}
                  </p>

                  {/* Progress Gauge */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{t('Arrecadado:', 'Raised:')} <strong className="text-slate-100">${liveRaised.toLocaleString()}</strong></span>
                      <span>{t('Meta:', 'Goal:')} ${camp.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] mt-1.5">
                      <span className="text-slate-400 font-sans">
                        {isSelected ? t('✓ Causa selecionada para contato', '✓ Selected cause for inquiry') : t('Clique para selecionar', 'Click to select')}
                      </span>
                      <span className="font-mono font-bold text-indigo-400">
                        {percent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* General Fund Card */}
            <div 
              onClick={() => setSelectedCampaignId('general')}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                selectedCampaignId === 'general'
                  ? 'bg-slate-900 border-indigo-500 shadow-lg ring-2 ring-indigo-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-display font-bold text-sm text-slate-100">
                  {t('Fundo Geral Direto da Fundação', 'DYF General Direct Fund')}
                </h4>
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-300 bg-indigo-550/20 px-2.5 py-0.5 rounded-full">
                  {t('FLEXÍVEL', 'FLEXIBLE')}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">
                {t(
                  'Apoia as necessidades imediatas das crianças acolhidas, fornecendo alimentação, livros, material pedagógico e suporte terapêutico.',
                  'Applies direct support where need is highest across tutoring programs, wellness requests, or urgent child sanctuary needs.'
                )}
              </p>
            </div>
          </div>

          {/* Contact & Direct Communication Hub (Right 7 columns) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6">
            
            <div className="border-b border-slate-800 pb-5">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <HeartHandshake className="w-4 h-4 text-indigo-400" />
                <span>{t('Canais Diretos de Doação', 'Direct Donation Channels')}</span>
              </div>
              <h3 className="font-display font-extrabold text-xl text-white">
                {t('Como Realizar Sua Contribuição', 'How to Make Your Contribution')}
              </h3>
              <p className="mt-1 font-sans text-xs text-slate-350 leading-relaxed">
                {t(
                  'Todas as doações são coordenadas diretamente com a fundadora Breeze Daniele e a equipe de gestão, garantindo 100% de transparência e alinhamento com a destinação dos recursos.',
                  'All donations are coordinated directly with founder Breeze Daniele and the management team, ensuring 100% transparency and exact allocation of resources.'
                )}
              </p>
            </div>

            {/* Direct Email Cards */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {t('E-mails Oficiais para Contato:', 'Official Contact E-mails:')}
              </span>

              {/* Email 1: contato@breezedanieleyoshinaga.org */}
              <div className="bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                      {t('E-mail Institucional Principal', 'Primary Institutional Email')}
                    </span>
                    <a 
                      href={generateMailtoUrl(primaryEmail)}
                      className="font-mono text-sm sm:text-base font-bold text-white hover:text-indigo-300 transition-colors truncate block"
                    >
                      {primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(primaryEmail)}
                    className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-all cursor-pointer font-medium"
                    title={t('Copiar e-mail', 'Copy email')}
                  >
                    {copiedEmail === primaryEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{t('Copiado!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t('Copiar', 'Copy')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateMailtoUrl(primaryEmail)}
                    className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3.5 py-2 rounded-xl transition-all font-bold shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('Enviar E-mail', 'Send Email')}</span>
                  </a>
                </div>
              </div>

              {/* Email 2: yoshinagadani@gmail.com */}
              <div className="bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                      {t('Contato Direto com a Autora & Fundadora', 'Direct Contact with Founder & Author')}
                    </span>
                    <a 
                      href={generateMailtoUrl(secondaryEmail)}
                      className="font-mono text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors truncate block"
                    >
                      {secondaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(secondaryEmail)}
                    className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-all cursor-pointer font-medium"
                    title={t('Copiar e-mail', 'Copy email')}
                  >
                    {copiedEmail === secondaryEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{t('Copiado!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t('Copiar', 'Copy')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateMailtoUrl(secondaryEmail)}
                    className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3.5 py-2 rounded-xl transition-all font-bold shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('Enviar E-mail', 'Send Email')}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Email Preparer (Optional, helps donor draft message) */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('Preparar Mensagem de Apoio (Opcional)', 'Prepare Support Message (Optional)')}</span>
                </span>
                {pledgeAmount && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                    {t('Valor sugerido:', 'Pledge:')} ${pledgeAmount} USD
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                    {t('Seu Nome / Organização', 'Your Name / Organization')}
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Maria Silva / Alex Johnson"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                    {t('Causa / Projeto Selecionado', 'Selected Cause / Project')}
                  </label>
                  <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-indigo-200 truncate">
                    {selectedCampaignName}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                  {t('Mensagem ou Proposta de Apoio', 'Message or Support Proposal')}
                </label>
                <textarea
                  placeholder={t(
                    'Gostaria de apoiar este projeto com doação, parceria ou voluntariado...',
                    'I would like to support this project with a contribution, partnership, or mentoring...'
                  )}
                  rows={2}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={generateMailtoUrl(primaryEmail)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('Enviar para', 'Send to')} {primaryEmail}</span>
                </a>
                <a
                  href={generateMailtoUrl(secondaryEmail)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-slate-700 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('Enviar para', 'Send to')} {secondaryEmail}</span>
                </a>
              </div>
            </div>

            {/* Transparency & Security guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start space-x-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-300 leading-snug">
                  <strong className="text-white block font-medium">{t('Transparência Total', 'Total Transparency')}</strong>
                  {t('Prestação de contas e relatórios periódicos para todos os doadores e parceiros.', 'Accountability reports issued regularly to all donors and partners.')}
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                <Heart className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-300 leading-snug">
                  <strong className="text-white block font-medium">{t('Impacto Direto', 'Direct Impact')}</strong>
                  {t('Recursos destinados integralmente ao suporte, educação e resiliência das crianças.', 'Funds allocated 100% to education, mental healing, and children support.')}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

export default DonationForm;
export type { ActiveDonationInput };

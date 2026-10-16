import React, { useState } from 'react';
import { FREQUENTLY_ASKED_QUESTIONS_PT, FREQUENTLY_ASKED_QUESTIONS_EN } from '../data';
import { 
  HelpCircle, ChevronDown, ChevronUp, MessageSquare, Send, Check, 
  Mail, Sparkles, Copy, MapPin, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { useLanguage } from '../context/LanguageContext';

export default function ContactAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const faqs = language === 'pt' ? FREQUENTLY_ASKED_QUESTIONS_PT : FREQUENTLY_ASKED_QUESTIONS_EN;

  // Newsletter states
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSigned, setNewsSigned] = useState(false);

  const primaryEmail = 'contato@breezedanieleyoshinaga.org';
  const secondaryEmail = 'yoshinagadani@gmail.com';

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(emailStr);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim() || !newsEmail.includes('@')) return;

    setNewsSigned(true);
    setNewsEmail('');
  };

  return (
    <section id="faq" className="py-24 bg-[#0f172a] text-white relative overflow-hidden scroll-mt-20">
      {/* Absolute canvas drawing and solidarity background */}
      <div className="absolute inset-0 z-0">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* FAQ Column (Left 6 columns) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-slate-800/60 border border-slate-700 px-3 py-1.5 rounded-full inline-flex items-center space-x-1">
                <HelpCircle className="h-3 w-3" />
                <span>{t('Dúvidas Frequentes', 'Knowledge Base')}</span>
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                {t('Perguntas e Respostas', 'Frequently Asked Details')}
              </h2>
              <p className="font-sans text-slate-350 text-sm">
                {t(
                  'Transparência, prestação de contas, forma de apoio e funcionamento da Breeze Daniele Yoshinaga Foundation.',
                  'Get immediate documentation regarding our transparency indicators, organizational structure, and support channels.'
                )}
              </p>
            </div>

            {/* Accordion Layout */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-[#1f2937]/75 rounded-3xl overflow-hidden bg-[#111827]/60 backdrop-blur-md shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 bg-[#1f2937]/30 hover:bg-[#1f2937]/50 text-left font-display font-extrabold text-sm sm:text-base text-white transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer-box"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#111827]/40"
                        >
                          <p className="p-5 font-sans text-xs sm:text-sm text-[#acb6ca] leading-relaxed border-t border-slate-800">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900/40 p-6 rounded-3xl border border-emerald-900/50 text-white space-y-4 shadow-lg relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 right-2 opacity-10">
                <Sparkles className="h-10 w-10 text-emerald-400" />
              </div>
              
              <div className="space-y-1 relative z-10">
                <h4 className="font-display font-extrabold text-sm text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>{t('Boletim de Impacto & Notícias', 'The Ecosystem Dispatch')}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-normal">
                  {t(
                    'Cadastre-se para receber atualizações periódicas das nossas ações, publicações literárias e histórias de superação das crianças.',
                    'Subscribe to receive our periodic logging of child mentoring activities, book releases, and inspiring transformation stories.'
                  )}
                </p>
              </div>

              {newsSigned ? (
                <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded-2xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in duration-200">
                  <Check className="h-4 w-4" />
                  <span>{t('Inscrição confirmada! Obrigado por caminhar conosco.', 'Awesome! Welcome to our network.')}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 relative z-10">
                  <input
                    type="email"
                    placeholder="E.g., seuemail@dominio.com"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="flex-1 bg-slate-950 border border-emerald-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-white placeholder-slate-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 rounded-xl transition-all cursor-pointer"
                  >
                    {t('Inscrever', 'Subscribe')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Channels (Right 6 columns) */}
          <div className="lg:col-span-6 bg-[#111827]/85 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden space-y-6">
            <div className="space-y-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-amber-400 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Contact Channels</span>
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white">
                {t('Entre em Contato Conosco', 'Contact Us Directly')}
              </h3>
              <p className="font-sans text-slate-350 text-xs sm:text-sm leading-relaxed">
                {t(
                  'Para propostas de parceria, apoio a projetos infantis, literatura, voluntariado ou qualquer esclarecimento com a Breeze Daniele Yoshinaga Foundation, entre em contato diretamente pelos nossos e-mails:',
                  'For partnership inquiries, child support projects, literary works, volunteering, or general inquiries with the Breeze Daniele Yoshinaga Foundation, reach out directly via our official emails:'
                )}
              </p>
            </div>

            {/* Email Contact Cards */}
            <div className="space-y-4">
              
              {/* Email 1: contato@breezedanieleyoshinaga.org */}
              <div className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 sm:p-5 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {t('E-mail Institucional Oficial', 'Official Institutional Email')}
                      </span>
                      <a 
                        href={`mailto:${primaryEmail}`}
                        className="font-mono text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors break-all"
                      >
                        {primaryEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(primaryEmail)}
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer font-medium"
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
                        <span>{t('Copiar E-mail', 'Copy Email')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${primaryEmail}`}
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('Enviar E-mail', 'Send Email')}</span>
                  </a>
                </div>
              </div>

              {/* Email 2: yoshinagadani@gmail.com */}
              <div className="bg-slate-950/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {t('Contato Direto com a Autora & Fundadora', 'Direct Contact with Founder & Author')}
                      </span>
                      <a 
                        href={`mailto:${secondaryEmail}`}
                        className="font-mono text-sm sm:text-base font-bold text-white hover:text-indigo-300 transition-colors break-all"
                      >
                        {secondaryEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(secondaryEmail)}
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer font-medium"
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
                        <span>{t('Copiar E-mail', 'Copy Email')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${secondaryEmail}`}
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('Enviar E-mail', 'Send Email')}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick meta details */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Curitiba City - Brazil</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <Heart className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-300 font-medium">{t('Atendimento Dedicado', 'Dedicated Care')}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

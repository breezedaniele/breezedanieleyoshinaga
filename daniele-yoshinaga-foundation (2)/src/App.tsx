import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MissionAndPillars from './components/MissionAndPillars';
import HistoryTimeline from './components/HistoryTimeline';
import BreezeDanieleCareer from './components/BreezeDanieleCareer';
import DonationImpactCalculator from './components/DonationImpactCalculator';
import DonationForm, { DonationFormRef } from './components/DonationForm';
import DonorsWall from './components/DonorsWall';
import ContactAndFAQ from './components/ContactAndFAQ';
import Logo from './components/Logo';
import { SEEDED_DONATIONS } from './data';
import { Donation } from './types';
import { Heart, Landmark, Mail, MapPin, Calendar, ShieldAlert, Globe } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [donations, setDonations] = useState<Donation[]>(SEEDED_DONATIONS);
  const { language, setLanguage, t } = useLanguage();
  
  // Connect the calculator to the donation form via Ref
  const donationFormRef = useRef<DonationFormRef>(null);

  // Monitor scrolling to highlight headers
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['mission', 'impact', 'history', 'breeze-daniele', 'calculator', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDonateCTA = () => {
    const element = document.getElementById('donation-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCTA = () => {
    const element = document.getElementById('mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePredefinedDonation = (amount: number, campaignId: string) => {
    if (donationFormRef.current) {
      donationFormRef.current.setPredefinedAmount(amount, campaignId);
    }
  };

  const handleNewDonationSuccess = (newDonation: Donation) => {
    setDonations((prev) => [newDonation, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-slate-800">
      
      {/* Navigation Header with Language Switcher */}
      <Navigation 
        onDonateClick={handleDonateCTA} 
        activeSection={activeSection}
      />

      {/* Main Framework Sections */}
      <div id="hero">
        <Hero 
          onDonateClick={handleDonateCTA} 
          onExploreClick={handleExploreCTA} 
        />
      </div>

      <MissionAndPillars />

      <HistoryTimeline />

      <BreezeDanieleCareer />

      <DonationImpactCalculator 
        onSelectAmount={handlePredefinedDonation} 
      />

      {/* Primary Donation Form Container */}
      <div className="relative">
        <DonationForm 
          ref={donationFormRef}
          onDonationSuccess={handleNewDonationSuccess}
          recentDonations={donations}
        />
      </div>

      {/* Dynamic Gratitude ScrollWall */}
      <DonorsWall donations={donations} />

      {/* FAQ & Support Coordination */}
      <ContactAndFAQ />

      {/* Sophisticated, Fully-Custom Footer in Professional Deep Slate Theme */}
      <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
        {/* Decorative ambient lighting elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Core purpose statement (Left 4 columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center p-1 bg-white rounded-full shadow-sm overflow-hidden flex-shrink-0">
                <Logo size={36} iconOnly={true} />
              </div>
              <div>
                <span className="font-display font-black text-white text-sm tracking-wider uppercase block leading-tight">
                  BREEZE DANIELE
                </span>
                <span className="font-display font-bold text-indigo-400 text-xs tracking-wider uppercase block leading-tight">
                  YOSHINAGA FOUNDATION
                </span>
                <span className="text-[10px] text-indigo-300 font-sans tracking-widest uppercase block mt-0.5">
                  {t('Cultura · Arte · Desenvolvimento', 'Culture · Art · Development')}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-slate-400 leading-normal">
              {t(
                'Organização sem fins lucrativos dedicada a acolher crianças em situação de vulnerabilidade, ensinar conhecimentos essenciais para a vida e tecnologia, e cultivar resiliência e empatia.',
                'A non-profit organization dedicated to fostering digital equality, teaching essential life knowledge, and supporting the holistic mental health and resilience of vulnerable children.'
              )}
            </p>

            {/* Language Selector in Footer */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
                <Globe className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-slate-400">{t('Idioma:', 'Language:')}</span>
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`hover:underline cursor-pointer font-bold ${
                    language === 'pt' ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                >
                  Português (PT)
                </button>
                <span className="text-slate-600">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`hover:underline cursor-pointer font-bold ${
                    language === 'en' ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 columns) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-[#f8fafc] border-b border-slate-800 pb-2">
              {t('Programas', 'Programs')}
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#mission" className="hover:text-indigo-400 transition-colors">{t('Missão & Pilares', 'Mission & Pillars')}</a></li>
              <li><a href="#breeze-daniele" className="hover:text-indigo-400 transition-colors">{t('Breeze Daniele (Arte & Voz)', 'Breeze Daniele (Art & Voice)')}</a></li>
              <li><a href="#history" className="hover:text-indigo-400 transition-colors">{t('História & Visão', 'History & Vision')}</a></li>
              <li><a href="#calculator" className="hover:text-indigo-400 transition-colors">{t('Calculadora de Impacto', 'Impact Calculator')}</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info (2 columns) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-[#f8fafc] border-b border-slate-800 pb-2">
              {t('Apoio & Parcerias', 'Supporters')}
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#donation-portal" className="hover:text-indigo-400 transition-colors">{t('Portal de Doações', 'Donation Portal')}</a></li>
              <li><a href="#community-wall" className="hover:text-indigo-400 transition-colors">{t('Mural de Gratidão', 'Gratitude Board')}</a></li>
              <li><a href="#faq" className="hover:text-indigo-400 transition-colors">{t('Perguntas Frequentes', 'FAQ & Questions')}</a></li>
              <li><a href="#faq" className="hover:text-indigo-400 transition-colors">{t('Canais de Contato', 'Contact Channels')}</a></li>
            </ul>
          </div>

          {/* Column 4: Location / Contact Details (4 columns) */}
          <div className="md:col-span-4 space-y-3 font-sans text-xs">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-[#f8fafc] border-b border-slate-800 pb-2">
              Headquarters
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span className="font-semibold text-slate-200">CURITIBA CITY - BRAZIL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <a href="mailto:contato@breezedanieleyoshinaga.org" className="hover:text-indigo-300 transition-colors">contato@breezedanieleyoshinaga.org</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <a href="mailto:yoshinagadani@gmail.com" className="hover:text-indigo-300 transition-colors">yoshinagadani@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span>{t('Atendimento: 09:00 - 17:00 (BRT)', 'Office Hours: 9:00 AM - 5:00 PM BRT')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global Copyright Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-4">
          <div>
            <span>© 2026 Breeze Daniele Yoshinaga Foundation. {t('Todos os direitos reservados.', 'All rights reserved globally.')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              type="button"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Globe className="h-3 w-3" />
              <span>{language === 'pt' ? 'Switch to English' : 'Mudar para Português'}</span>
            </button>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">{t('Política de Privacidade', 'Privacy Policy')}</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">{t('Termos de Apoio', 'Terms of Giving')}</span>
          </div>
        </div>

      </footer>

    </div>
  );
}

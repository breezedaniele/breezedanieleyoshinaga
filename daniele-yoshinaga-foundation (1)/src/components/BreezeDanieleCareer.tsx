import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { 
  BookOpen, 
  Music, 
  Mic2, 
  Feather, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart, 
  FileText, 
  X, 
  ChevronRight,
  Disc,
  Quote,
  Check,
  ExternalLink
} from 'lucide-react';
import { 
  BREEZE_ARTISTIC_BIO, 
  LITERARY_WORKS, 
  MUSICAL_TRACKS, 
  ARTISTIC_MILESTONES,
  LiteraryWork,
  MusicalTrack
} from '../data/artisticCareer';
import { breezeAudioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';

type TabType = 'overview' | 'writer' | 'singer' | 'milestones';

export default function BreezeDanieleCareer() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { t, language } = useLanguage();
  
  // Music Player State
  const [currentTrack, setCurrentTrack] = useState<MusicalTrack>(MUSICAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([15, 30, 45, 25, 50, 20, 35, 40]);

  // Modals state
  const [selectedBookForReading, setSelectedBookForReading] = useState<LiteraryWork | null>(null);
  const [selectedTrackForLyrics, setSelectedTrackForLyrics] = useState<MusicalTrack | null>(null);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  // Manage synth audio
  useEffect(() => {
    if (isPlaying) {
      breezeAudioSynth.start(currentTrack.notes, currentTrack.bpm, (_freq, index) => {
        // Update animated visualizer bars
        setVisualizerHeights((prev) => 
          prev.map((h, i) => Math.max(10, (h + (index * 11 + i * 7)) % 55 + 10))
        );
      });
    } else {
      breezeAudioSynth.stop();
    }

    return () => {
      breezeAudioSynth.stop();
    };
  }, [isPlaying, currentTrack]);

  // Progress counter simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayTrack = (track: MusicalTrack) => {
    if (currentTrack.id === track.id) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setTrackProgress(0);
      setIsPlaying(true);
    }
  };

  const handleToggleVolume = () => {
    if (isMuted) {
      setIsMuted(false);
      breezeAudioSynth.setVolume(volume);
    } else {
      setIsMuted(true);
      breezeAudioSynth.setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
    breezeAudioSynth.setVolume(val);
  };

  const handleCopyQuote = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <section 
      id="breeze-daniele" 
      className="py-24 bg-[#0f172a] text-slate-100 relative overflow-hidden transition-colors border-t border-slate-800"
    >
      {/* Animated Glowing Background matching all app pages */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="h-4 w-4" />
            <span>{t('Perfil Artístico & Criativo', 'Artistic & Creative Profile')}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Breeze Daniele
          </h2>

          <p className="mt-3 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-200 to-rose-400">
            {t(BREEZE_ARTISTIC_BIO.officialTitle, 'Multifaceted Artist · Author, Singer & Songwriter')}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            {t(
              BREEZE_ARTISTIC_BIO.subtitle,
              'Art as a channel of healing, resilience, and compassion for children and the human spirit.'
            )}
          </p>
        </div>

        {/* Tab Navigation Controls (Anti-slop clean segmented button row) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Feather className="h-4 w-4 text-indigo-300" />
              <span>{t('Visão & Biografia', 'Vision & Bio')}</span>
            </button>

            <button
              onClick={() => setActiveTab('writer')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'writer'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4 text-amber-300" />
              <span>{t('Escritora (Livros)', 'Author (Books)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('singer')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'singer'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Music className="h-4 w-4 text-sky-300" />
              <span>{t('Cantora (Músicas)', 'Singer (Music)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('milestones')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'milestones'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Disc className="h-4 w-4 text-rose-300" />
              <span>{t('Linha do Tempo', 'Milestones')}</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW & BIOGRAPHY */}
          {activeTab === 'overview' && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Biography Narrative */}
                <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    A Força da Expressão Criativa a Serviço da Dignidade
                  </h3>
                  
                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                    {BREEZE_ARTISTIC_BIO.bioParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Highlight Quote */}
                  <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start space-x-4">
                    <Quote className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-display italic text-sm sm:text-base text-indigo-100">
                        "{BREEZE_ARTISTIC_BIO.quote}"
                      </p>
                      <span className="block mt-2 text-xs font-mono text-indigo-300 font-semibold uppercase tracking-wider">
                        — Breeze Daniele, Manifesto Artístico
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: The 3 Core Pillars of her Art */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-display font-bold text-lg text-slate-200 mb-2 px-1">
                    Pilares da Criação Artística
                  </h4>

                  {BREEZE_ARTISTIC_BIO.artisticPhilosophy.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all group"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                          {item.icon === 'feather' && <Feather className="h-5 w-5 text-amber-400" />}
                          {item.icon === 'mic' && <Mic2 className="h-5 w-5 text-sky-400" />}
                          {item.icon === 'heart' && <Heart className="h-5 w-5 text-rose-400" />}
                        </div>
                        <h5 className="font-display font-bold text-base text-white">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-normal pl-12">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick showcase of Both Worlds: Writer & Singer Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div 
                  onClick={() => setActiveTab('writer')}
                  className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 p-8 rounded-3xl border border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                          A Escritora
                        </h4>
                        <span className="text-xs text-slate-400 font-sans">
                          Fábulas, Poesias & Ensaios Sociais
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Explore suas principais publicações, incluindo as consagradas obras <em>"RESILIENCE & FAITH"</em> (Amazon) e <em>"Breeze's Revealed"</em> (Literary Highways), com capítulos abertos para leitura online.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('singer')}
                  className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-900 p-8 rounded-3xl border border-sky-500/20 hover:border-sky-500/50 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                        <Mic2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl text-white group-hover:text-sky-300 transition-colors">
                          A Cantora
                        </h4>
                        <span className="text-xs text-slate-400 font-sans">
                          Folk Acústico & Canções de Ninar
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Ouça prévias acústicas com sintetizador harmônico, explore letras poéticas e conheça o hino oficial <em>"Mãos Dadas ao Vento"</em>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: WRITER (LITERARY WORKS) */}
          {activeTab === 'writer' && (
            <motion.div
              key="tab-writer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    Catálogo Literário de Breeze Daniele
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Histórias que iluminam a infância, poesias de resistência e ensaios sobre a coragem de amar.
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  <span>{LITERARY_WORKS.length} Obras Publicadas</span>
                  <span className="mx-2">·</span>
                  <span>100% Direitos Revertidos</span>
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {LITERARY_WORKS.map((book) => (
                  <div 
                    key={book.id}
                    className="bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl group"
                  >
                    {/* Artistic Book Header with gradient representation */}
                    <div className={`p-6 bg-gradient-to-br ${book.coverAccent} text-white relative overflow-hidden`}>
                      <div className="absolute top-2 right-2 opacity-15 pointer-events-none">
                        <BookOpen className="w-24 h-24" />
                      </div>
                      
                      {/* Zero-pill metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-amber-200/90 font-mono mb-2">
                        <span>{book.year}</span>
                        <span>·</span>
                        <span>{book.pages} págs</span>
                        <span>·</span>
                        <span>{book.category}</span>
                      </div>

                      <h4 className="font-display font-black text-xl sm:text-2xl leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-xs text-white/80 mt-1 italic">
                        {book.subtitle}
                      </p>
                    </div>

                    {/* Book Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {book.synopsis}
                      </p>

                      {/* Featured Excerpt */}
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic">
                        "{book.excerpt}"
                      </div>

                      {/* Themes as clean unboxed text */}
                      <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-slate-800">
                        <span className="text-amber-400 font-semibold">Temas:</span>
                        {book.themes.map((t, i) => (
                          <span key={i}>
                            {t}{i < book.themes.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons (Read Sample & Buy Direct) */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                          onClick={() => setSelectedBookForReading(book)}
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-semibold text-xs transition-all"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Ler Trecho</span>
                        </button>

                        {book.buyUrl && (
                          <a
                            href={book.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                              book.buyPlatform === 'Amazon'
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
                            }`}
                          >
                            <span>{book.buyPlatform === 'Amazon' ? 'Ver na Amazon' : 'Literary Highways'}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Literary Manifesto Banner */}
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-3xl p-8 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Distribuição Gratuita em Abrigos & Comunidades
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-white">
                    Histórias que Curam e Devolvem a Infância
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    Cada criança acolhida pelos polos da Breeze Daniele Yoshinaga Foundation recebe exemplares físicos das obras infantojuvenis, acompanhados de cadernos de desenho e rodas guiadas de leitura.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleCopyQuote(BREEZE_ARTISTIC_BIO.quote)}
                    className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-xl border border-slate-700 text-xs font-semibold transition-all"
                  >
                    {copiedQuote ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Citação Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Quote className="h-4 w-4 text-amber-400" />
                        <span>Copiar Citação Artística</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SINGER (MUSICAL CAREER & PLAYER) */}
          {activeTab === 'singer' && (
            <motion.div
              key="tab-singer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    A Voz & Canções de Breeze Daniele
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Melodias com violão, piano acústico e mensagens de acolhimento que abraçam o coração.
                  </p>
                </div>
                <div className="text-xs text-sky-400 font-mono flex items-center space-x-1.5">
                  <Mic2 className="h-4 w-4" />
                  <span>Timbre: Contralto Suave & Folk Acústico</span>
                </div>
              </div>

              {/* Master Audio Player Console */}
              <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left: Active Track Details */}
                  <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTrack.coverAccent} flex items-center justify-center text-white shadow-lg flex-shrink-0 relative overflow-hidden`}>
                      {isPlaying ? (
                        <Disc className="h-8 w-8 animate-spin" style={{ animationDuration: '4s' }} />
                      ) : (
                        <Music className="h-8 w-8" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                        <span>{isPlaying ? 'Reproduzindo Agora' : 'Faixa Selecionada'}</span>
                        <span>·</span>
                        <span>{currentTrack.year}</span>
                        <span>·</span>
                        <span>{currentTrack.duration}</span>
                      </div>
                      <h4 className="font-display font-black text-xl text-white">
                        {currentTrack.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {currentTrack.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Center: Playback Controls & Waveform */}
                  <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handlePlayTrack(currentTrack)}
                        className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-sky-500/30 transition-transform active:scale-95"
                        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
                      >
                        {isPlaying ? <Pause className="h-5 w-5 fill-slate-950" /> : <Play className="h-5 w-5 fill-slate-950 ml-0.5" />}
                      </button>
                    </div>

                    {/* Animated Equalizer visualizer */}
                    <div className="flex items-end space-x-1 h-6 pt-1">
                      {visualizerHeights.map((h, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-sky-400 transition-all duration-150"
                          style={{
                            height: isPlaying ? `${h}px` : '4px',
                            opacity: isPlaying ? 0.9 : 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Volume & Lyrics Button */}
                  <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleToggleVolume} 
                        className="text-slate-400 hover:text-white"
                        aria-label="Controle de volume"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-4 w-4 text-rose-400" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-sky-400" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Slider de volume"
                      />
                    </div>

                    <button
                      onClick={() => setSelectedTrackForLyrics(currentTrack)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-sky-200 border border-slate-700 text-xs font-semibold transition-all flex items-center space-x-1.5"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Ver Letra</span>
                    </button>
                  </div>
                </div>

                {/* Track Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${trackProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>{isPlaying ? 'Melodia acústica ativa' : 'Pausado'}</span>
                    <span>{currentTrack.style}</span>
                  </div>
                </div>
              </div>

              {/* Tracks List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MUSICAL_TRACKS.map((track) => {
                  const isThisTrackActive = currentTrack.id === track.id;

                  return (
                    <div 
                      key={track.id}
                      className={`bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                        isThisTrackActive 
                          ? 'border-sky-500/60 shadow-lg shadow-sky-950/50' 
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <span>{track.year}</span>
                              <span>·</span>
                              <span>{track.duration}</span>
                            </div>
                            <h4 className="font-display font-bold text-lg text-white mt-1">
                              {track.title}
                            </h4>
                            <p className="text-xs text-sky-300 font-medium">
                              {track.subtitle}
                            </p>
                          </div>

                          <button
                            onClick={() => handlePlayTrack(track)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              isThisTrackActive && isPlaying 
                                ? 'bg-sky-400 text-slate-950' 
                                : 'bg-slate-800 text-sky-400 hover:bg-slate-700'
                            }`}
                            aria-label={`Reproduzir ${track.title}`}
                          >
                            {isThisTrackActive && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4 ml-0.5" />
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {track.description}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 italic">
                          "{track.lyrics[0]}"<br />
                          "{track.lyrics[1]}"
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">
                          {track.category}
                        </span>
                        <button
                          onClick={() => setSelectedTrackForLyrics(track)}
                          className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center space-x-1"
                        >
                          <span>Ler Letra Completa</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: MILESTONES (ARTISTIC TIMELINE) */}
          {activeTab === 'milestones' && (
            <motion.div
              key="tab-milestones"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <div className="text-center pb-4 border-b border-slate-800">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  A Trajetória Criativa de Breeze Daniele
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Como a palavra escrita e o canto amadureceram até se tornarem o combustível da fundação.
                </p>
              </div>

              <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10 py-4">
                {ARTISTIC_MILESTONES.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Glowing Milestone Dot */}
                    <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                    </div>

                    {/* Milestone Card */}
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center gap-3 text-xs font-mono mb-2">
                        <span className="text-indigo-400 font-bold">{item.year}</span>
                        <span>·</span>
                        <span className={`font-semibold ${
                          item.role === 'Escritora' 
                            ? 'text-amber-400' 
                            : item.role === 'Cantora' 
                            ? 'text-sky-400' 
                            : 'text-rose-400'
                        }`}>
                          {item.role}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {item.highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: LITERARY WORK CHAPTER READER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedBookForReading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#fbf9f5] text-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative border-4 border-amber-900/10 font-serif"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBookForReading(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
                aria-label="Fechar leitor"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-amber-900/15 pb-6 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
                  Degustação Literária · Breeze Daniele
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950">
                  {selectedBookForReading.title}
                </h3>
                <p className="text-sm text-slate-600 italic mt-1">
                  {selectedBookForReading.subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-sans mt-3">
                  <span>{selectedBookForReading.year}</span>
                  <span>·</span>
                  <span>{selectedBookForReading.category}</span>
                  <span>·</span>
                  <span>{selectedBookForReading.pages} páginas</span>
                </div>
              </div>

              {/* Sample Chapter Header */}
              <div className="mb-6">
                <h4 className="font-sans font-bold text-base text-amber-900 uppercase tracking-wide">
                  {selectedBookForReading.sampleChapterTitle}
                </h4>
              </div>

              {/* Chapter Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed">
                {selectedBookForReading.sampleChapterText.map((p, i) => (
                  <p key={i} className="indent-4">
                    {p}
                  </p>
                ))}
              </div>

              {/* Reader Footer Quote */}
              <div className="mt-8 pt-6 border-t border-amber-900/15 text-center font-sans">
                <p className="text-xs text-slate-500 italic max-w-md mx-auto">
                  "{selectedBookForReading.quotes}"
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedBookForReading(null)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-xs transition-colors"
                  >
                    Concluir Leitura
                  </button>

                  {selectedBookForReading.buyUrl && (
                    <a
                      href={selectedBookForReading.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full font-sans font-bold text-xs transition-all shadow-md ${
                        selectedBookForReading.buyPlatform === 'Amazon'
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                    >
                      <span>Adquirir Livro Completo ({selectedBookForReading.buyPlatform})</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: FULL SONG LYRICS VIEWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedTrackForLyrics && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 text-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative border border-slate-700"
            >
              <button
                onClick={() => setSelectedTrackForLyrics(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Fechar letra"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-800 pb-5 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                  Letra Oficial · Composição de Breeze Daniele
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {selectedTrackForLyrics.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {selectedTrackForLyrics.subtitle} ({selectedTrackForLyrics.duration})
                </p>
              </div>

              {/* Lyrics Lines */}
              <div className="space-y-3 font-sans text-sm sm:text-base text-slate-200 leading-relaxed text-center py-4 bg-slate-950/50 rounded-2xl border border-slate-800/80">
                {selectedTrackForLyrics.lyrics.map((line, idx) => (
                  <p 
                    key={idx} 
                    className={line.startsWith('(') ? 'text-sky-400 font-semibold font-mono text-xs pt-2' : ''}
                  >
                    {line || <span className="block h-2" />}
                  </p>
                ))}
              </div>

              {/* Audio Play Trigger inside modal */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => handlePlayTrack(selectedTrackForLyrics)}
                  className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                >
                  {currentTrack.id === selectedTrackForLyrics.id && isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pausar Canção</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 ml-0.5" />
                      <span>Ouvir Melodia Acústica</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedTrackForLyrics(null)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Fechar Janela
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

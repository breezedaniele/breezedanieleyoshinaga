import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ColorfulDrawingBackground from './ColorfulDrawingBackground';
import { 
  BookOpen, 
  Music, 
  Mic2, 
  Feather, 
  Sparkles, 
  Heart, 
  FileText, 
  X, 
  ChevronRight,
  Disc,
  Quote,
  Check,
  ExternalLink,
  Headphones,
  Layers,
  Sparkle,
  Copy,
  Radio
} from 'lucide-react';
import { 
  BREEZE_ARTISTIC_BIO, 
  LITERARY_WORKS, 
  MUSICAL_TRACKS, 
  ARTISTIC_MILESTONES,
  LiteraryWork,
  MusicalTrack
} from '../data/artisticCareer';
import { useLanguage } from '../context/LanguageContext';

type TabType = 'all' | 'books' | 'music' | 'bio' | 'milestones';

export default function BreezeDanieleCareer() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { t, language } = useLanguage();
  
  // Modals and interaction state
  const [selectedBookForReading, setSelectedBookForReading] = useState<LiteraryWork | null>(null);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const handleCopyLink = (track: MusicalTrack) => {
    navigator.clipboard.writeText(track.dittoUrl);
    setCopiedTrackId(track.id);
    setTimeout(() => setCopiedTrackId(null), 2500);
  };

  const handleCopyQuote = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <section 
      id="breeze-daniele" 
      className="py-24 bg-[#0f172a] text-slate-100 relative overflow-hidden transition-colors border-t border-slate-800 scroll-mt-20"
    >
      {/* Animated Glowing Background */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <ColorfulDrawingBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase bg-indigo-950/60 border border-indigo-800/80 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span>{t('Perfil Artístico & Obras', 'Artistic Profile & Works')}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Breeze Daniele
          </h2>

          <p className="mt-3 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-rose-300">
            {t(
              'Escritora, Cantora & Compositora · Obras & Músicas de Cura e Acolhimento',
              'Author, Singer & Songwriter · Works & Music of Healing and Resilience'
            )}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
            {t(
              'A fundadora Daniele Yoshinaga expressa através do pseudônimo Breeze Daniele sua missão de transformar vidas: narrativas de superação, livros publicados internacionalmente e canções oficiais disponíveis nas principais plataformas de streaming.',
              'Founder Daniele Yoshinaga expresses through the artist name Breeze Daniele her mission to heal and empower: published books, deep resilience stories, and official songs streaming across all major digital audio platforms.'
            )}
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="h-4 w-4 text-indigo-300" />
              <span>{t('Obras & Músicas (Completo)', 'Works & Music (Complete)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'books'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4 text-amber-300" />
              <span>{t('Obras Literárias (Livros)', 'Literary Works (Books)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'music'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Music className="h-4 w-4 text-sky-300" />
              <span>{t('Suas Músicas (Streaming)', 'Her Music (Streaming)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('bio')}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'bio'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Feather className="h-4 w-4 text-indigo-300" />
              <span>{t('Biografia & Visão', 'Biography & Vision')}</span>
            </button>

            <button
              onClick={() => setActiveTab('milestones')}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
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
          
          {/* ========================================================================= */}
          {/* TAB 1: ALL (OBRAS & MÚSICAS COMPLETO - DEFAULT) */}
          {/* ========================================================================= */}
          {activeTab === 'all' && (
            <motion.div
              key="tab-all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Highlight Banner: Books and Songs of Breeze Daniele */}
              <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-blue-950/80 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    <Sparkle className="h-4 w-4 text-amber-400" />
                    <span>{t('Obras & Músicas com Propósito Social', 'Works & Music with Social Purpose')}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {t('A Arte de Breeze Daniele ao Lado das Crianças', 'Breeze Daniele’s Art Standing with Children')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {t(
                      'Toda a produção literária e musical de Breeze Daniele apoia as frentes de acolhimento e educação da fundação. Conheça suas obras publicadas e ouça seus lançamentos musicais oficiais.',
                      'All literary and musical output of Breeze Daniele supports the foundation’s educational and shelter initiatives. Discover her published books and stream her official musical releases.'
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <button
                    onClick={() => setActiveTab('books')}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t('Ver Livros', 'View Books')}
                  </button>
                  <button
                    onClick={() => setActiveTab('music')}
                    className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t('Ouvir Músicas', 'Listen to Music')}
                  </button>
                </div>
              </div>

              {/* SECTION: OBRAS LITERÁRIAS (LIVROS) */}
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{t('Produção Literária Oficial', 'Official Literary Works')}</span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {t('Livros de Breeze Daniele', 'Books by Breeze Daniele')}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {LITERARY_WORKS.length} {t('Obras Publicadas', 'Published Works')}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {LITERARY_WORKS.map((book) => (
                    <div 
                      key={book.id}
                      className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
                    >
                      {/* Artistic Book Header with gradient */}
                      <div className={`p-6 sm:p-7 bg-gradient-to-br ${book.coverAccent} text-white relative overflow-hidden`}>
                        <div className="absolute top-2 right-2 opacity-15 pointer-events-none">
                          <BookOpen className="w-24 h-24" />
                        </div>
                        
                        <div className="flex items-center gap-2 text-[11px] text-amber-200/90 font-mono mb-2">
                          <span>{book.year}</span>
                          <span>·</span>
                          <span>{book.pages} {t('páginas', 'pages')}</span>
                          <span>·</span>
                          <span>{book.category}</span>
                        </div>

                        <h4 className="font-display font-black text-2xl leading-tight">
                          {book.title}
                        </h4>
                        <p className="text-xs text-white/85 mt-1 italic font-medium">
                          {book.subtitle}
                        </p>
                      </div>

                      {/* Book Details */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {book.synopsis}
                        </p>

                        {/* Featured Excerpt */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 italic">
                          "{book.excerpt}"
                        </div>

                        {/* Themes */}
                        <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-slate-800">
                          <span className="text-amber-400 font-semibold">{t('Temas:', 'Themes:')}</span>
                          {book.themes.map((th, i) => (
                            <span key={i}>
                              {th}{i < book.themes.length - 1 ? ' ·' : ''}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons (Read Sample & Buy Direct) */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={() => setSelectedBookForReading(book)}
                            className="flex-1 flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-semibold text-xs transition-all cursor-pointer"
                          >
                            <FileText className="h-4 w-4" />
                            <span>{t('Ler Trecho / Amostra', 'Read Excerpt / Sample')}</span>
                          </button>

                          {book.buyUrl && (
                            <a
                              href={book.buyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                                book.buyPlatform === 'Amazon'
                                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
                              }`}
                            >
                              <span>{book.buyPlatform === 'Amazon' ? t('Adquirir na Amazon', 'Get on Amazon') : t('Acessar no Literary Highways', 'Access on Literary Highways')}</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: SUAS MÚSICAS & STREAMING OFICIAL */}
              <div className="space-y-8 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                      <Music className="h-4 w-4" />
                      <span>{t('Lançamentos Musicais & Streaming', 'Musical Releases & Streaming')}</span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {t('As Músicas de Breeze Daniele', 'Songs by Breeze Daniele')}
                    </h3>
                  </div>
                  <span className="text-xs text-sky-400 font-mono flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
                    <span>Ditto Music · {t('Streaming Global', 'Global Streaming')}</span>
                  </span>
                </div>

                {/* Quick streaming hub banner */}
                <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-indigo-950/70 p-6 rounded-3xl border border-sky-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                      {t('Distribuição Oficial Ditto Music', 'Official Ditto Music Distribution')}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      {t('Ouça no Spotify, Apple Music, YouTube Music, Deezer e mais', 'Listen on Spotify, Apple Music, YouTube Music, Deezer & more')}
                    </h4>
                    <p className="text-xs text-slate-300 max-w-2xl">
                      {t(
                        'Acesse diretamente as páginas oficiais de lançamento de cada single para escolher o seu aplicativo de música preferido.',
                        'Access the official smartlink page of each single to launch in your preferred streaming service.'
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {MUSICAL_TRACKS.map((tItem) => (
                      <a
                        key={tItem.id}
                        href={tItem.dittoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-400/30 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                      >
                        <Headphones className="h-3.5 w-3.5" />
                        <span>{tItem.title}</span>
                        <ExternalLink className="h-3 w-3 opacity-70" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Tracks Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MUSICAL_TRACKS.map((track) => (
                    <div 
                      key={track.id}
                      className="bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between shadow-lg group hover:shadow-sky-950/30"
                    >
                      <div className="space-y-5">
                        {/* Track Header Accent Card */}
                        <div className={`p-5 rounded-2xl bg-gradient-to-br ${track.coverAccent} text-white relative overflow-hidden shadow-md`}>
                          <div className="absolute top-2 right-2 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                            <Disc className="w-16 h-16" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-200 block mb-1">
                            {track.year} · {track.category}
                          </span>
                          <h4 className="font-display font-black text-2xl text-white tracking-tight">
                            {track.title}
                          </h4>
                          <span className="text-xs text-sky-100/90 font-medium block mt-0.5">
                            {track.subtitle}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {track.description}
                        </p>

                        {/* Supported Streaming Platforms */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-800">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            {t('Plataformas Disponíveis:', 'Available On:')}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {track.streamingPlatforms.map((platform, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[10px] font-medium text-slate-300"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-5 mt-5 border-t border-slate-800 space-y-2">
                        <a
                          href={track.dittoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] cursor-pointer"
                        >
                          <Headphones className="h-4 w-4" />
                          <span>{t('Ouvir no Ditto Music / Streaming', 'Listen on Ditto Music / Streaming')}</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                        </a>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">
                            {track.dittoUrl.replace('https://', '')}
                          </span>
                          <button
                            onClick={() => handleCopyLink(track)}
                            className="inline-flex items-center space-x-1 text-[11px] text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                          >
                            {copiedTrackId === track.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">{t('Copiado!', 'Copied!')}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>{t('Copiar Link', 'Copy Link')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: BIOGRAFIA & PROPÓSITO */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Feather className="h-4 w-4" />
                  <span>{t('A Voz e a Palavra a Serviço da Infância', 'Voice and Words Dedicated to Childhood')}</span>
                </div>
                
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {t('A Trajetória Artística de Breeze Daniele', 'The Artistic Journey of Breeze Daniele')}
                </h3>
                
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  {BREEZE_ARTISTIC_BIO.bioParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Highlight Quote */}
                <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <Quote className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-display italic text-sm sm:text-base text-indigo-100">
                        "{BREEZE_ARTISTIC_BIO.quote}"
                      </p>
                      <span className="block mt-2 text-xs font-mono text-indigo-300 font-semibold uppercase tracking-wider">
                        — Breeze Daniele ({t('Manifesto Literário & Musical', 'Literary & Musical Manifesto')})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyQuote(BREEZE_ARTISTIC_BIO.quote)}
                    className="flex-shrink-0 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/50 hover:bg-indigo-800/60 text-indigo-200 text-xs font-medium transition-colors cursor-pointer border border-indigo-700/50"
                  >
                    {copiedQuote ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{t('Copiada!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t('Copiar Citação', 'Copy Quote')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: BOOKS (OBRAS LITERÁRIAS) */}
          {/* ========================================================================= */}
          {activeTab === 'books' && (
            <motion.div
              key="tab-books"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {t('Obras Literárias Publicadas', 'Published Literary Works')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {t(
                    'Livros que tocam a alma, despertam resiliência e alimentam o imaginário com esperança.',
                    'Books that touch the soul, nurture resilience, and feed the imagination with hope.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {LITERARY_WORKS.map((book) => (
                  <div 
                    key={book.id}
                    className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    <div className={`p-6 sm:p-8 bg-gradient-to-br ${book.coverAccent} text-white relative overflow-hidden`}>
                      <div className="flex items-center gap-2 text-xs text-amber-200/90 font-mono mb-2">
                        <span>{book.year}</span>
                        <span>·</span>
                        <span>{book.pages} {t('páginas', 'pages')}</span>
                        <span>·</span>
                        <span>{book.category}</span>
                      </div>
                      <h4 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/90 mt-1 italic">
                        {book.subtitle}
                      </p>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {book.synopsis}
                      </p>

                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic">
                        "{book.excerpt}"
                      </div>

                      <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-slate-800">
                        <span className="text-amber-400 font-semibold">{t('Temas:', 'Themes:')}</span>
                        {book.themes.map((th, i) => (
                          <span key={i}>
                            {th}{i < book.themes.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                          onClick={() => setSelectedBookForReading(book)}
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-semibold text-xs transition-all cursor-pointer"
                        >
                          <FileText className="h-4 w-4" />
                          <span>{t('Ler Trecho / Amostra', 'Read Sample Excerpt')}</span>
                        </button>

                        {book.buyUrl && (
                          <a
                            href={book.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                              book.buyPlatform === 'Amazon'
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
                            }`}
                          >
                            <span>{book.buyPlatform === 'Amazon' ? t('Ver na Amazon', 'View on Amazon') : t('Literary Highways', 'Literary Highways')}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct links box */}
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-3xl p-6 sm:p-8 border border-amber-500/20 text-center space-y-3">
                <h4 className="font-display font-extrabold text-xl text-white">
                  {t('Onde Encontrar as Obras de Breeze Daniele', 'Where to Find Breeze Daniele’s Books')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  {t(
                    'As obras estão disponíveis para leitura internacional em plataformas digitais e em formato físico para crianças assistidas pela fundação.',
                    'The books are available internationally on digital bookstores and in print editions distributed to children supported by the foundation.'
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a
                    href="https://www.amazon.ca/RESILIENCE-FAITH-Journey-strength-healing-ebook/dp/B0H8WJ5F8M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                  >
                    <span>RESILIENCE & FAITH (Amazon)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://literaryhighways.com/pt-br/livro/breeze-s-revealed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                  >
                    <span>Breeze's Revealed (Literary Highways)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MUSIC (SUAS MÚSICAS & STREAMING DITTO) */}
          {/* ========================================================================= */}
          {activeTab === 'music' && (
            <motion.div
              key="tab-music"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {t('O Universo Musical de Breeze Daniele', 'The Musical Universe of Breeze Daniele')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {t(
                      'Singles oficiais lançados e distribuídos mundialmente através do Ditto Music.',
                      'Official singles released and distributed globally through Ditto Music.'
                    )}
                  </p>
                </div>
                <div className="text-xs text-sky-400 font-mono flex items-center space-x-2">
                  <Radio className="h-4 w-4 animate-pulse" />
                  <span>{MUSICAL_TRACKS.length} {t('Lançamentos Oficiais', 'Official Releases')}</span>
                </div>
              </div>

              {/* Streaming Overview Card */}
              <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-4">
                <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>{t('Disponibilidade Universal de Streaming', 'Universal Streaming Availability')}</span>
                </div>
                <h4 className="font-display font-bold text-xl text-white">
                  {t('Escolha sua Plataforma de Áudio Favorita', 'Choose Your Favorite Audio Platform')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {t(
                    'Cada link abaixo direciona você para a página de destino oficial do Ditto Music, permitindo abrir a faixa diretamente no Spotify, Apple Music, YouTube Music, Deezer, Amazon Music ou Tidal.',
                    'Each link below leads you to the official Ditto Music smartlink landing page, allowing you to launch the track in Spotify, Apple Music, YouTube Music, Deezer, Amazon Music, or Tidal.'
                  )}
                </p>
              </div>

              {/* Tracks List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MUSICAL_TRACKS.map((track) => (
                  <div 
                    key={track.id}
                    className="bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-800 hover:border-sky-500/60 transition-all flex flex-col justify-between shadow-lg group hover:shadow-sky-950/40"
                  >
                    <div className="space-y-4">
                      {/* Visual Header */}
                      <div className={`p-5 rounded-2xl bg-gradient-to-br ${track.coverAccent} text-white relative overflow-hidden shadow-md`}>
                        <div className="absolute top-2 right-2 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                          <Disc className="w-16 h-16" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-200 block mb-1">
                          {track.year} · {track.category}
                        </span>
                        <h4 className="font-display font-black text-2xl text-white">
                          {track.title}
                        </h4>
                        <span className="text-xs text-sky-100/90 font-medium block mt-0.5">
                          {track.subtitle}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {track.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          {t('Plataformas:', 'Platforms:')}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {track.streamingPlatforms.map((platform, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[10px] font-medium text-slate-300"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-800 space-y-2">
                      <a
                        href={track.dittoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] cursor-pointer"
                      >
                        <Headphones className="h-4 w-4" />
                        <span>{t('Ouvir no Ditto Music', 'Listen on Ditto Music')}</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                      </a>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">
                          {track.dittoUrl.replace('https://', '')}
                        </span>
                        <button
                          onClick={() => handleCopyLink(track)}
                          className="inline-flex items-center space-x-1 text-[11px] text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                        >
                          {copiedTrackId === track.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">{t('Copiado!', 'Copied!')}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>{t('Copiar Link', 'Copy Link')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: BIOGRAPHY & VISION */}
          {/* ========================================================================= */}
          {activeTab === 'bio' && (
            <motion.div
              key="tab-bio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {t('A Força da Expressão Criativa a Serviço da Dignidade', 'The Strength of Creative Expression at the Service of Dignity')}
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
                        — Breeze Daniele, {t('Manifesto Artístico', 'Artistic Manifesto')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: The 3 Core Pillars */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-display font-bold text-lg text-slate-200 mb-2 px-1">
                    {t('Pilares da Criação Artística', 'Pillars of Artistic Creation')}
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
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: MILESTONES (ARTISTIC TIMELINE) */}
          {/* ========================================================================= */}
          {activeTab === 'milestones' && (
            <motion.div
              key="tab-milestones"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {t('Linha do Tempo Literária e Musical', 'Literary and Musical Timeline')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {t(
                    'Marcos que entrelaçam a dedicação às crianças, as publicações de livros e os lançamentos musicais.',
                    'Milestones uniting dedication to children, book releases, and music distribution.'
                  )}
                </p>
              </div>

              <div className="relative border-l-2 border-slate-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10 my-8">
                {ARTISTIC_MILESTONES.map((mile, i) => (
                  <div key={i} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:bg-indigo-400 group-hover:scale-125 transition-all" />

                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/80">
                          {mile.year}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {mile.role}
                        </span>
                      </div>
                      
                      <h4 className="font-display font-bold text-base sm:text-lg text-white mt-2">
                        {mile.title}
                      </h4>
                      
                      <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        {mile.highlight}
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
      {/* MODAL: BOOK SAMPLE / CHAPTER VIEWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedBookForReading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl text-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedBookForReading(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Fechar modal de leitura"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-10">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  {t('Degustação Literária Oficial', 'Official Literary Sample')} · {selectedBookForReading.year}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {selectedBookForReading.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1 italic">
                  {selectedBookForReading.subtitle}
                </p>
              </div>

              {/* Sample Chapter Content */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                <h4 className="font-display font-bold text-base sm:text-lg text-amber-300">
                  {selectedBookForReading.sampleChapterTitle}
                </h4>

                <div className="space-y-3 font-serif text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                  {selectedBookForReading.sampleChapterText.map((paragraph, idx) => (
                    <p key={idx} className="indent-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 italic">
                  "{selectedBookForReading.quotes}"
                </div>
              </div>

              {/* Modal Footer / External Link CTA */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  {selectedBookForReading.pages} {t('páginas no volume integral', 'pages in full edition')}
                </span>

                {selectedBookForReading.buyUrl && (
                  <a
                    href={selectedBookForReading.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                      selectedBookForReading.buyPlatform === 'Amazon'
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
                    }`}
                  >
                    <span>
                      {selectedBookForReading.buyPlatform === 'Amazon' 
                        ? t('Acessar Livro Completo na Amazon', 'Access Full Book on Amazon')
                        : t('Acessar no Literary Highways', 'Access on Literary Highways')
                      }
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

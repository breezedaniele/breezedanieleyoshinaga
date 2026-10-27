export interface LiteraryWork {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  pages: number;
  category: string;
  coverAccent: string; // color gradient
  synopsis: string;
  excerpt: string;
  sampleChapterTitle: string;
  sampleChapterText: string[];
  themes: string[];
  quotes: string;
  buyUrl?: string;
  buyPlatform?: 'Amazon' | 'Literary Highways' | 'Official Store';
}

export interface MusicalTrack {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  dittoUrl: string;
  coverAccent: string;
  description: string;
  streamingPlatforms: string[];
}

export interface ArtisticMilestone {
  year: string;
  role: 'Escritora' | 'Cantora' | 'Visão Artística';
  title: string;
  highlight: string;
}

export const BREEZE_ARTISTIC_BIO = {
  name: "Breeze Daniele",
  officialTitle: "Artista Multifacetada · Escritora, Cantora & Compositora",
  subtitle: "A arte como canal de cura, resiliência e acolhimento para a infância e o espírito humano.",
  bioParagraphs: [
    "Sob o nome artístico de Breeze Daniele, a fundadora Daniele Yoshinaga entrelaça a sensibilidade lírica da escrita literária com a vibração acolhedora de sua voz, transformando a arte em um manifesto vivo de empatia e esperança.",
    "Como escritora, suas obras navegam pela superação de traumas, a redescoberta da dignidade infantil e o poder revolucionário do afeto. Suas palavras constroem pontes sólidas entre o rigor humanitário e a ternura necessária para resgatar crianças esquecidas pela sociedade.",
    "Como cantora e compositora, suas composições e harmonias etéreas funcionam como um refúgio sonoro. Seus lançamentos oficiais, distribuídos globalmente, transmitem mensagens de consolo imediato, cura interior e liberdade."
  ],
  artisticPhilosophy: [
    {
      title: "A Palavra que Edifica",
      description: "Escrever não é mero exercício estético; é um compromisso ético de dar voz àqueles que o mundo tentou calar.",
      icon: "feather"
    },
    {
      title: "A Voz que Acolhe",
      description: "O canto é um abraço invisível. Onde a razão encontra limites, a frequência do som toca e restaura a inocência.",
      icon: "mic"
    },
    {
      title: "Arte com Propósito Social",
      description: "100% dos direitos autorais de suas canções e livros são revertidos aos projetos educacionais da Breeze Daniele Yoshinaga Foundation.",
      icon: "heart"
    }
  ],
  quote: "A lei protege as fronteiras do direito; mas somente a arte e o amor curam as feridas da alma."
};

export const LITERARY_WORKS: LiteraryWork[] = [
  {
    id: "resilience-and-faith",
    title: "RESILIENCE & FAITH",
    subtitle: "A journey of strength, healing, and courage",
    year: "2025",
    pages: 180,
    category: "Espiritualidade, Motivação & Superação",
    coverAccent: "from-amber-600 via-orange-600 to-indigo-950",
    synopsis: "Uma profunda história de despertar espiritual, coragem artística e reconquista do poder interior através da jornada de Breeze. De São Paulo ao Japão e cruzando o Atlântico, uma trajetória transformadora que ensina a silenciar o ruído das expectativas externas, acolher a própria verdade e encontrar a vocação divina de cura e amor.",
    excerpt: "A verdadeira resiliência não nasce da ausência de quedas, mas da fé inabalável que transforma cada cicatriz em alicerce para resgatar quem ainda navega à deriva.",
    sampleChapterTitle: "Capítulo II — Atravessando Oceanos e Descobrindo o Silêncio Interior",
    sampleChapterText: [
      "— Entre a agitação de São Paulo, a disciplina milenar do Japão e a vastidão silenciosa do Atlântico, compreendi que a maior de todas as viagens não se mede em quilômetros.",
      "— A travessia decisiva acontece quando você desliga o ruído das expectativas alheias e aprende a escutar a respiração serena da sua própria alma.",
      "— A fé nunca foi uma garantia de que não haveria tempestades; fé é a certeza luminosa de que fomos forjados para permanecer inteiros em meio aos vendavais.",
      "— Cada lágrima derramada no escuro estava apenas preparando a minha voz para se tornar abrigo de quem mais precisava de esperança."
    ],
    themes: ["Superação & Cura", "Fé & Espiritualidade", "Jornada Transcontinental", "Autoconhecimento", "Propósito"],
    quotes: "Quem aprendeu a florescer no inverno da incerteza sabe exatamente como aquecer o coração do mundo.",
    buyUrl: "https://www.amazon.ca/RESILIENCE-FAITH-Journey-strength-healing-ebook/dp/B0H8WJ5F8M",
    buyPlatform: "Amazon"
  },
  {
    id: "breezes-revealed",
    title: "Breeze's Revealed",
    subtitle: "O Despertar da Curadora e a Batalha Ancestral contra 'A Dívida'",
    year: "2026",
    pages: 100,
    category: "Ficção Inspiracional & Fantasia de Cura",
    coverAccent: "from-sky-600 via-blue-700 to-slate-950",
    synopsis: "Em um mundo asfixiado por uma energia tóxica conhecida como 'A Dívida' (The Debt), a protagonista Breeze Silverwood compreende que a sobrevivência é um ato sagrado de transformação interior. Portadora de um dom ancestral capaz de acalmar as tempestades mais violentas do coração humano, ela desafia a descrença e aceita seu destino heroico.",
    excerpt: "O dom de curar nunca foi um fardo leve; é a bravura de estender as mãos abertas exatamente onde o mundo só ofereceu desespero.",
    sampleChapterTitle: "Capítulo I — A Centelha contra 'A Dívida'",
    sampleChapterText: [
      "A névoa espessa e cinzenta da Dívida rastejava pelos muros de pedra, pesando sobre os ombros de quem já não se lembrava de como sorrir.",
      "Breeze Silverwood respirou fundo e ergueu as palmas para o alto. Uma luminosidade cálida e viva, como o pulsar de uma estrela recém-nascida, começou a dançar em seus dedos.",
      "— Não tente dissipar as sombras com lâminas afiadas — disse ela com voz firme e serena ao viajante caído.",
      "— O único antídoto contra essa dor antiga é a frequência inviolável do amor e da compaixão. Enquanto eu respirar, ninguém aqui caminhará sem luz."
    ],
    themes: ["Alquimia Emocional", "Cura Ancestral", "Coragem Espiritual", "Transformação", "Esperança"],
    quotes: "Não há coração tão quebrado que não possa ser reconstruído pelo calor de um acolhimento verdadeiro.",
    buyUrl: "https://literaryhighways.com/pt-br/livro/breeze-s-revealed",
    buyPlatform: "Literary Highways"
  }
];

export const MUSICAL_TRACKS: MusicalTrack[] = [
  {
    id: "blessed",
    title: "Blessed",
    subtitle: "Single Oficial · Streaming Release",
    year: "2025",
    category: "Música Inspiracional & Contemporânea",
    dittoUrl: "https://ditto.fm/breeze-daniele-blessed",
    coverAccent: "from-sky-500 via-indigo-600 to-slate-900",
    description: "Composição poética e inspiradora de Breeze Daniele que transmite paz, cura e elevação do espírito. Lançada globalmente pelo selo Ditto Music.",
    streamingPlatforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer", "Amazon Music"]
  },
  {
    id: "breeze-daniele-v-2e",
    title: "Breeze Daniele (v-2e)",
    subtitle: "Single Oficial · Versão 2E",
    year: "2025",
    category: "Vocal & Acústico de Cura",
    dittoUrl: "https://ditto.fm/breeze-daniele-v-2e",
    coverAccent: "from-purple-600 via-indigo-700 to-slate-900",
    description: "Harmonia intimista e marcante com a voz acolhedora de Breeze Daniele, alcançando ouvintes em todo o mundo através do streaming.",
    streamingPlatforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer", "Amazon Music"]
  },
  {
    id: "freetime",
    title: "Freetime",
    subtitle: "Single Oficial · Liberdade & Leveza",
    year: "2025",
    category: "Inspiracional & Vitalidade",
    dittoUrl: "https://ditto.fm/freetime",
    coverAccent: "from-amber-500 via-rose-600 to-indigo-900",
    description: "Canção libertadora sobre a leveza do ser, a redescoberta da esperança e o valor inestimável de viver com o coração aberto.",
    streamingPlatforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer", "Amazon Music"]
  }
];

export const ARTISTIC_MILESTONES: ArtisticMilestone[] = [
  {
    year: "2021",
    role: "Escritora",
    title: "Primeiros Manuscritos de Conscientização",
    highlight: "Criação de contos e narrativas de cura lidas em círculos comunitários para devolver autoestima às crianças e jovens."
  },
  {
    year: "2023",
    role: "Cantora",
    title: "Gravações Acústicas & Terapia Sonora",
    highlight: "Gravação das primeiras faixas acústicas com violão e voz, distribuídas para lares e centros de apoio humanitário."
  },
  {
    year: "2025",
    role: "Cantora",
    title: "Lançamento dos Singles 'Blessed', 'Breeze Daniele (v-2e)' e 'Freetime'",
    highlight: "Distribuição global de suas músicas nas principais plataformas de streaming (Spotify, Apple Music, YouTube) via Ditto Music."
  },
  {
    year: "2025",
    role: "Escritora",
    title: "Lançamento de 'RESILIENCE & FAITH' na Amazon",
    highlight: "Publicação internacional de sua jornada transformadora de cura e coragem através dos oceanos (Brasil, Japão e mundo)."
  },
  {
    year: "2026",
    role: "Escritora",
    title: "Publicação de 'Breeze's Revealed' no Literary Highways",
    highlight: "Lançamento da aclamada obra sobre o despertar da curadora contra 'A Dívida' e o poder ancestral do afeto."
  },
  {
    year: "2026",
    role: "Visão Artística",
    title: "Integração Total com a Fundação",
    highlight: "Consolidação de seu repertório literário e musical como pilar cultural e pedagógico da Breeze Daniele Yoshinaga Foundation."
  }
];

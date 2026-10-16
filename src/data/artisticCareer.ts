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
  duration: string;
  category: string;
  notes: number[]; // Frequencies for the Web Audio gentle chime synth
  bpm: number;
  style: string;
  description: string;
  lyrics: string[];
  coverAccent: string;
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
    "Como cantora e compositora, suas melodias folk-acústicas e harmonias etéreas funcionam como um refúgio sonoro. Sua voz transmite uma mensagem de consolo imediato e força interior, sendo frequentemente entoada em oficinas de acolhimento e círculos comunitários da fundação."
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
    id: "sopro-de-luz",
    title: "Sopro de Luz",
    subtitle: "Single Acústico Oficial",
    year: "2025",
    duration: "3:42",
    category: "Folk Acústico / Música Inspiracional",
    notes: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63], // C4, E4, G4, C5, G4, E4
    bpm: 76,
    style: "Voz suave e violão acústico com cordas de nylon e harmônicos etéreos",
    description: "Canção intimista composta para acolher corações em momentos de incerteza. A melodia delicada remete a uma brisa suave ao entardecer.",
    lyrics: [
      "Vem, o vento já soprou a tempestade embora,",
      "Segura a minha mão, chegou a nossa hora.",
      "Onde o mundo te feriu, plantei uma canção,",
      "Pra te lembrar que nunca foi em vão.",
      "",
      "(Refrão)",
      "Sopra a luz no peito que aprendeu a resistir,",
      "Há um horizonte novo pronto pra se abrir.",
      "Não há noite escura que segure o amanhecer,",
      "Você nasceu pro mundo florescer.",
      "",
      "Guarde o medo no bolso e olhe pro céu,",
      "Nosso amor desenha asas de papel...",
      "Sopra a luz... sopra a luz..."
    ],
    coverAccent: "from-sky-500 to-indigo-700"
  },
  {
    id: "cancao-do-renascer",
    title: "Canção do Renascer",
    subtitle: "Piano & Voz Emotiva",
    year: "2024",
    duration: "4:15",
    category: "Neoclássico & MPB Lírica",
    notes: [220.00, 261.63, 329.63, 440.00, 329.63, 261.63], // A3, C4, E4, A4, E4, C4
    bpm: 68,
    style: "Piano clássico contemporâneo com modulações suaves e timbre aveludado",
    description: "Uma ode poética à resiliência das crianças, mostrando que cicatrizes são mapas de bravura e recomeço.",
    lyrics: [
      "Mesmo na terra mais árida da noite,",
      "A semente teima em brotar.",
      "Quem tem coragem de acolher o choro,",
      "Também sabe ensinar a voar.",
      "",
      "(Refrão)",
      "Renasce das cinzas a voz mais bonita,",
      "Quem foi esquecido agora acredita.",
      "Criança bendita que não se dobrou,",
      "O rio da vida enfim te encontrou.",
      "",
      "A melodia que o tempo guardou,",
      "Em cada acorde o amor triunfou."
    ],
    coverAccent: "from-purple-500 to-slate-800"
  },
  {
    id: "maos-dadas-ao-vento",
    title: "Mãos Dadas ao Vento",
    subtitle: "Hino Comunitário da Fundação",
    year: "2026",
    duration: "3:50",
    category: "Indie Folk & Coral Infantojuvenil",
    notes: [293.66, 369.99, 440.00, 587.33, 440.00, 369.99], // D4, F#4, A4, D5, A4, F#4
    bpm: 88,
    style: "Violão rítmico alegre, percussão suave com palmas e coro de vozes jovens",
    description: "Composta para celebrar o lançamento oficial da fundação em 2026, com participação e entusiasmo de dezenas de jovens estudantes.",
    lyrics: [
      "Um passo de cada vez, sem olhar pra trás,",
      "O que a gente constrói junto ninguém desfaz.",
      "Livros abertos, computadores no chão,",
      "A inteligência com alma e o coração na mão.",
      "",
      "(Refrão)",
      "Mãos dadas ao vento, voando mais alto,",
      "Tirando as crianças da dor do asfalto.",
      "Breeze Daniele cantando pra gente sonhar,",
      "Com um amanhã onde todos têm um lar.",
      "",
      "La la laia... o futuro é nosso!",
      "La la laia... amar é o que posso!"
    ],
    coverAccent: "from-amber-400 to-rose-600"
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

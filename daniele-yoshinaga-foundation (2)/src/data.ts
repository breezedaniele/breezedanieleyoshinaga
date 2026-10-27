import { TimelineEvent, ContributionCampaign, Donation } from './types';

export const MISSION_STATEMENT_EN = "The Breeze Daniele Yoshinaga Foundation is dedicated to supporting abandoned children, teaching them essential general and technological knowledge, and instilling the profound values of resilience, kindness, and self-reliance to guide them on a lifelong journey of hope and dignity.";

export const MISSION_STATEMENT_PT = "A Breeze Daniele Yoshinaga Foundation é dedicada a amparar crianças acolhidas e abandonadas, ensinando-lhes conhecimentos essenciais gerais e tecnológicos, e incutindo os profundos valores de resiliência, bondade e autossuficiência para guiá-las em uma jornada para a vida inteira com esperança e dignidade.";

export const MISSION_STATEMENT = MISSION_STATEMENT_PT;

export const PILLARS_EN = [
  {
    id: "education",
    title: "Essential Knowledge & Tech Literacy",
    subtitle: "Empowering Hungry Minds",
    description: "Providing tutoring, hardware, and interactive learning camps to teach abandoned and vulnerable children every form of essential knowledge, from digital skills to everyday life mastery.",
    metric: "12,400+ Kids Mentored",
    color: "indigo"
  },
  {
    id: "environment",
    title: "Kindness & Compassionate Mentorship",
    subtitle: "Cultivating Social Empathy",
    description: "Sowing deep seeds of kindness through human connection, peer assistance networks, community-wide outreach, and group workshops centered on mutual love and respect.",
    metric: "45,000+ Acts of Kindness",
    color: "indigo"
  },
  {
    id: "resilience",
    title: "Inner Strengths & Lifelong Resilience",
    subtitle: "Empowering Overcomers",
    description: "Nurturing coping practices, professional counseling, and structured youth communities that help children adapt, heal, and learn the critical importance of becoming resilient.",
    metric: "8,500+ Lives Transformed",
    color: "indigo"
  }
];

export const PILLARS_PT = [
  {
    id: "education",
    title: "Conhecimento Essencial & Alfabetização Tecnológica",
    subtitle: "Capacitando Mentes Curiosas",
    description: "Oferecendo tutoria, equipamentos e oficinas interativas para ensinar crianças em abrigos todos os conhecimentos essenciais, desde habilidades digitais até autonomia no cotidiano.",
    metric: "12.400+ Crianças Atendidas",
    color: "indigo"
  },
  {
    id: "environment",
    title: "Bondade & Mentoria Acolhedora",
    subtitle: "Cultivando Empatia e Afeto",
    description: "Semeando laços de afeto por meio de conexões humanas genuínas, círculos de escuta, integração comunitária e oficinas focadas no respeito mútuo e no amor ao próximo.",
    metric: "45.000+ Atos de Solidariedade",
    color: "indigo"
  },
  {
    id: "resilience",
    title: "Força Interior & Resiliência para a Vida",
    subtitle: "Superando Desafios com Dignidade",
    description: "Desenvolvendo apoio emocional, acompanhamento psicológico e espaços seguros que ensinam a criança a ressignificar traumas, fortalecer a autoestima e florescer.",
    metric: "8.500+ Vidas Transformadas",
    color: "indigo"
  }
];

export const PILLARS = PILLARS_PT;

export const TIMELINE_EVENTS_EN: TimelineEvent[] = [
  {
    year: "2020",
    title: "The Seed is Planted",
    description: "While studying law, the foundational idea takes root. Amidst legal frameworks and justice systems, you recognize a deep, pressing need to protect the most vulnerable: children who are 'lost,' abandoned, rejected, or entirely lacking essential family support.",
    category: "founding"
  },
  {
    year: "2023",
    title: "The Vision Clarifies",
    description: "The abstract desire transforms into a clear, structured mission. The purpose becomes defined, the target demographic is unmistakable, and the internal blueprint of how to provide the missing assistance begins to take solid shape in your mind.",
    category: "milestone"
  },
  {
    year: "2026",
    title: "The Fire Catches",
    description: "The vision becomes reality. No longer just a project in your mind, the NGO is now 'burning'—fully alive, driven by intense passion, urgency, and action to rescue and support the kids who need it most.",
    category: "expansion"
  }
];

export const TIMELINE_EVENTS_PT: TimelineEvent[] = [
  {
    year: "2020",
    title: "A Semente é Plantada",
    description: "Durante a faculdade de Direito, a ideia fundamental cria raízes. Em meio aos códigos e aos tribunais, desperta a urgência incontornável de amparar os mais vulneráveis: crianças desabrigadas, órfãs, rejeitadas ou sem qualquer esteio familiar.",
    category: "founding"
  },
  {
    year: "2023",
    title: "A Visão se Clarifica",
    description: "O desejo intuitivo se estrutura em missão clara. O propósito é delimitado, a necessidade das crianças acolhidas torna-se o centro, e o desenho da fundação começa a ganhar contornos reais e firmes.",
    category: "milestone"
  },
  {
    year: "2026",
    title: "A Chama se Acende",
    description: "A visão se torna realidade viva. Não mais apenas um plano mental, a fundação está em plena ação—guiada por paixão inegociável, urgência e compromisso ético de transformar o destino dessas crianças.",
    category: "expansion"
  }
];

export const TIMELINE_EVENTS = TIMELINE_EVENTS_PT;

export const CAMPAIGNS_EN: ContributionCampaign[] = [
  {
    id: "educate-youth",
    title: "Kids' Essential Knowledge Hubs",
    shortDescription: "Providing modern tutoring kits, life-skills materials, coding tools, and mentor support.",
    longDescription: "This campaign funds micro-learning safe havens inside abandoned youth care areas. Your donation covers academic materials, dynamic learning tablets, life-skills coordinators, and educational certifications.",
    raised: 42350,
    goal: 60000,
    category: "Education",
    impactMetrics: [
      { amount: 15, description: "Provides high-grade student learning books and math guides for 1 child." },
      { amount: 45, description: "Pays for a child's full 30-hour life-skills and essential knowledge curriculum." },
      { amount: 120, description: "Provides an offline-ready learning tablet pre-loaded with comprehensive libraries." },
      { amount: 350, description: "Sponsors an entire community hub's educational resources and tutors for 1 month." }
    ]
  },
  {
    id: "green-preservation",
    title: "Kindness & Social Empathy Care",
    shortDescription: "Sponsoring active peer mentorship, kindness outings, and community integration.",
    longDescription: "Building a supportive emotional family. We fund dedicated mentors and group activities designed to teach kindness and build secure emotional relationships for kids who have been left behind.",
    raised: 28400,
    goal: 40000,
    category: "Exchanges",
    impactMetrics: [
      { amount: 10, description: "Funds one peer kindness activity package with interactive educational materials." },
      { amount: 30, description: "Provides specialized books on emotional growth and kindness for shelter libraries." },
      { amount: 100, description: "Covers local field trips and community service projects to teach empathy hands-on." },
      { amount: 250, description: "Sponsors 1 child's deep social integration and personal mentorship matches for a season." }
    ]
  },
  {
    id: "community-resilience",
    title: "Inner Resilience & Trauma Healing",
    shortDescription: "Funding mental wellness coaching, resilience lessons, and emergency supplies.",
    longDescription: "Trauma recovery requires intentional healing structures. We provide certified children counselors, secure rest-safe areas, and emotional coping resources to nurture robust resilience in children.",
    raised: 19800,
    goal: 25000,
    category: "Healing",
    impactMetrics: [
      { amount: 20, description: "Provides nourishing meal baskets and hygiene kits for an abandoned child in transition." },
      { amount: 50, description: "Sponsors one full-length professional resilience and cognitive coping workshop." },
      { amount: 150, description: "Supplies one-on-one specialized healing and stress management counseling." },
      { amount: 500, description: "Secures a neighborhood safe-sanctuary rent and thermal equipment for one month." }
    ]
  }
];

export const CAMPAIGNS_PT: ContributionCampaign[] = [
  {
    id: "educate-youth",
    title: "Centros de Conhecimento Essencial & Tutoria",
    shortDescription: "Kits pedagógicos, tablets com conteúdo offline, oficinas de programação e formação de mentores.",
    longDescription: "Financia espaços de aprendizado e tutoria para crianças em situação de abrigo e vulnerabilidade, cobrindo materiais escolares, tecnologia e reforço educacional.",
    raised: 42350,
    goal: 60000,
    category: "Educação",
    impactMetrics: [
      { amount: 15, description: "Fornece livros didáticos e guias de leitura para 1 criança." },
      { amount: 45, description: "Cobre 30 horas de tutoria e reforço escolar individualizado." },
      { amount: 120, description: "Disponibiliza tablet educacional com biblioteca digital offline completa." },
      { amount: 350, description: "Mantém os recursos pedagógicos de um polo de acolhimento por 1 mês." }
    ]
  },
  {
    id: "green-preservation",
    title: "Bondade, Cuidado & Empatia Social",
    shortDescription: "Programas de apadrinhamento afetivo, oficinas de arte, passeios culturais e apoio mútuo.",
    longDescription: "Constrói uma rede de amparo afetivo, garantindo que nenhuma criança cresça sentindo-se invisível ou desamparada.",
    raised: 28400,
    goal: 40000,
    category: "Acolhimento",
    impactMetrics: [
      { amount: 10, description: "Kit de materiais artísticos para oficinas de expressão emocional." },
      { amount: 30, description: "Livros ilustrados sobre afeto e inteligência emocional para abrigos." },
      { amount: 100, description: "Passeio cultural educativo com transporte e alimentação para grupo de crianças." },
      { amount: 250, description: "Acompanhamento social e integração comunitária de 1 jovem por uma temporada." }
    ]
  },
  {
    id: "community-resilience",
    title: "Resiliência Interior & Cura Emocional",
    shortDescription: "Apoio psicológico infantil, oficinas de superação de traumas e acolhimento especializado.",
    longDescription: "A cura de traumas na infância exige acompanhamento sensível e contínuo. Financiamos psicólogos, arteterapeutas e oficinas de regulação emocional.",
    raised: 19800,
    goal: 25000,
    category: "Resiliência",
    impactMetrics: [
      { amount: 20, description: "Cesta de acolhimento com itens de bem-estar para criança recém-chegada." },
      { amount: 50, description: "Oficina especializada de regulação emocional e resiliência." },
      { amount: 150, description: "Sessões individuais de terapia psicológica infantil." },
      { amount: 500, description: "Custeio mensal do espaço de apoio psicossocial e atendimento terapêutico." }
    ]
  }
];

export const CAMPAIGNS = CAMPAIGNS_PT;

export const SEEDED_DONATIONS: Donation[] = [
  {
    id: "don-1",
    donorName: "Haruto Takahashi",
    amount: 150,
    campaignId: "educate-youth",
    message: "Thank you for the inspiring focus on tech literacy. The future is digital!",
    timestamp: "2 hours ago",
    isRecurring: false,
    paymentMethod: "Card"
  },
  {
    id: "don-2",
    donorName: "Elena Rostova",
    amount: 50,
    campaignId: "green-preservation",
    message: "Planting trees for our future generations. Excellent effort!",
    timestamp: "5 hours ago",
    isRecurring: true,
    paymentMethod: "PayPal"
  },
  {
    id: "don-3",
    donorName: "Mateo Silva",
    amount: 35,
    campaignId: "community-resilience",
    message: "Nurturing mental wellness is so important, thank you Daniele for this beautiful mission.",
    timestamp: "1 day ago",
    isRecurring: false,
    paymentMethod: "Card"
  },
  {
    id: "don-4",
    donorName: "Anonymous Supporter",
    amount: 500,
    campaignId: "educate-youth",
    message: "A tiny help to build the satellite hubs in Southeast Asia.",
    timestamp: "2 days ago",
    isRecurring: true,
    paymentMethod: "Bank"
  }
];

export const FREQUENTLY_ASKED_QUESTIONS_EN = [
  {
    question: "How does the Breeze Daniele Yoshinaga Foundation ensure transparency?",
    answer: "Every donation is directly coordinated with our founding leadership and documented with official certificates of appreciation and transparent progress updates. 100% of non-profit funds go straight toward educational and resilience programs for vulnerable children."
  },
  {
    question: "How can I support or donate to the foundation?",
    answer: "You can reach out directly via our official emails: contato@breezedanieleyoshinaga.org or yoshinagadani@gmail.com. We will guide you through all donation options, partnerships, and issue formal receipts and impact reports."
  },
  {
    question: "Can I choose which specific project to support?",
    answer: "Absolutely! You can choose to support our Essential Knowledge & Tech Literacy programs, Kindness & Mentorship circles, Resilience & Trauma Healing, or allocate to our General Direct Fund."
  },
  {
    question: "How can I volunteer or partner with the foundation?",
    answer: "We warmly welcome educators, artists, psychologists, and volunteers who believe in transforming the lives of vulnerable children. Simply send an email to contato@breezedanieleyoshinaga.org or yoshinagadani@gmail.com."
  }
];

export const FREQUENTLY_ASKED_QUESTIONS_PT = [
  {
    question: "Como a Breeze Daniele Yoshinaga Foundation garante a transparência?",
    answer: "Todas as contribuições e apoios são coordenados diretamente com a fundadora Breeze Daniele e a equipe diretiva. Publicamos atualizações e relatórios periódicos, garantindo que os recursos cheguem com 100% de integridade às crianças acolhidas."
  },
  {
    question: "Como posso realizar uma doação ou apoiar a fundação?",
    answer: "Basta entrar em contato pelos nossos e-mails oficiais: contato@breezedanieleyoshinaga.org ou yoshinagadani@gmail.com. Nossa coordenação apresentará todas as modalidades de apoio, doações pontuais, parcerias corporativas e emitirá recibos oficiais."
  },
  {
    question: "Posso escolher qual causa ou projeto apoiar?",
    answer: "Sim! Você pode destinar sua contribuição aos projetos de Conhecimento & Tecnologia, Círculos de Empatia e Acolhimento, Cura de Traumas e Resiliência, ou ao Fundo Geral de Emergência."
  },
  {
    question: "Como posso atuar como voluntário ou firmar parceria institucional?",
    answer: "Buscamos continuamente educadores, psicólogos, artistas e mentores comprometidos em transformar o futuro de crianças vulneráveis. Envie um e-mail para contato@breezedanieleyoshinaga.org ou yoshinagadani@gmail.com compartilhando sua proposta."
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = FREQUENTLY_ASKED_QUESTIONS_PT;

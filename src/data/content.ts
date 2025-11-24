import {
    Blocks,
    Repeat,
    TrendingUp,
    type LucideIcon,
} from "lucide-react"

export type NavigationItem = {
    label: string
    href: string
}

export type Service = {
    title: string
    description: string
    highlights: string[]
    icon: LucideIcon
}

export type Project = {
    title: string
    description: string
    industry: string
    accent: string
    image?: string
}

export type Testimonial = {
    quote: string
    name: string
    role?: string
    company: string
    image?: string
}

export type ProcessStep = {
    title: string
    description: string
    deliverable: string
}

export type Differentiator = {
    title: string
    description: string
    icon: LucideIcon
}

export const navigation: NavigationItem[] = [
    { label: "Início", href: "#inicio" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Processo", href: "#processo" },
    { label: "Depoimentos", href: "#depoimentos" },
]

export const stats = [
    { label: "+ projetos lançados", value: "30" },
    { label: "Anos criando marcas", value: "08" },
]

export const featuredClients = [
    "Aurora Studio",
    "Casa Verde",
    "Natura Pura",
    "Luna Café",
    "Flor & Sol",
    "Essência",
]


export const projects: Project[] = [
    {
        title: "Dell & Alienware",
        description:
            "Cafeteria litorânea com visual despojado que celebra manhãs de sol e conversas leves.",
        industry: "Computadores e Tecnologia",
        accent: "from-sky-100 via-blue-200 to-cyan-400",
        image: "/images/projects/dell-aw-image.png"
    },
    {
        title: "Espresso Estoico",
        description:
            "Uma marca divertida que combina com a Vitória, trazendo uma abordagem única ao estoicismo e carreira em games.",
        industry: "Estoicismo & Carreira em Games",
        accent: "from-indigo-100 via-indigo-300 to-indigo-500",
        image: "/images/projects/espresso-2-image.png"
    },
    {
        title: "Jéssica Carvalho - Beehelp",
        description:
            "Plataforma de RH com identidade acolhedora e profissional, focada em conectar talentos a oportunidades ideais.",
        industry: "Departamento pessoal & RH",
        accent: "from-amber-100 via-orange-300 to-amber-500",
        image: "/images/projects/beehelp-image.png"
    },
    {
        title: "Angélica Neiva",
        description:
            "Plataforma de meditação guiada com identidade visual serena e envolvente.",
        industry: "Copywriting & Social Media",
        accent: "from-purple-100 via-violet-300 to-purple-400",
        image: "/images/projects/angelica-image.png"
    },
    {
        title: "Charlie",
        description:
            "Uma marca que redefiniu a hospitalidade urbana, unindo design, tecnologia e experiência em um só ecossistema.",
        industry: "Hostelaria & Turismo",
        accent: "from-rose-100 via-rose-300 to-rose-500",
        image: "/images/projects/charlie-image.png"
    },
    {
        title: "Coral",
        description:
            "Campanha Cores que tocam, celebrando a diversidade e a beleza das cores escutadas como cromopoemas.",
        industry: "Tintas e Pinturas",
        accent: "from-teal-100 via-cyan-300 to-teal-400",
        image: "/images/projects/coral-image.png"
    },
    {
        title: "All Ways Instituto",
        description:
            "Um sistema visual que materializa o amor como ferramenta de transformação social.",
        industry: "Instituto de apoio infantil",
        accent: "from-yellow-100 via-yellow-300 to-yellow-500",
        image: "/images/projects/all-ways-image.png"
    },
    {
        title: "Elixir",
        description:
            "Marca de recursos humanos que conecta talentos excepcionais com empresas inovadoras.",
        industry: "Recursos Humanos",
        accent: "from-green-100 via-emerald-300 to-green-500",
        image: "/images/projects/elixir-image.png"
    },
]

export const process: ProcessStep[] = [
    {
        title: "Imersão & Direção",
        description:
            "Mergulho na essência da marca: com conversas, pesquisa visual e alinhamento estratégico para definir como será o processo criativo.",
        deliverable: "Mapa de intenção com moodboard",
    },
    {
        title: "Criação & Refinamento",
        description:
            "Exploração visual e testes de aplicação para traduzir conceitos em forma. Cada ajuste aproxima a marca de sua expressão mais autêntica.",
        deliverable: "Sistema visual parcial para feedback",
    },
    {
        title: "Ativação & Acompanhamento",
        description:
            "Apresentação guiada, materiais de suporte e acompanhamento nas primeiras comunicações para garantir consistência e clareza.",
        deliverable: "Kit de lançamento + manual vivo",
    },
];


export const testimonials: Testimonial[] = [
    {
        quote:
            "O Gus não é apenas um designer – ele é um verdadeiro psicólogo, artista, alquimista! Sério, o cara capta a essência da sua marca e transforma isso em um visual claro, prático e impactante. Passei noites em claro com meus pesadelos de design, mas numa conversa com ele, tudo se alinhou em qualidade e praticidade. Recomendo demais e já estou na expectativa de trabalhar com ele novamente!",
        name: "Vitória Lopes",
        company: "Espresso Estoico",
    },
    {
        quote:
            "O Gus teve um processo de produção muito bacana comigo desde o começo! O resultado me surpreendeu e foi bem além do que eu esperava. Ele foi ágil, prático, entendeu minhas dores e percebeu com clareza as minhas necessidades. Pra além da qualidade visual e estética impecável, o Gus é um profissional sincero e justo — foi tudo dentro do prazo estabelecido e compatível com o que minha marca precisava! Tudo que ele fez tem a minha estética e cara, haha. Só elogios pra esse trampo.",
        name: "Angélica Neiva",
        company: "Marca Pessoal",
    },
    {
        quote:
            "Trabalhar com o Gus foi leve do início ao fim. Ele entendeu exatamente o que eu queria e teve uma paciência enorme em cada ajuste. Receber os arquivos abertos, poder adaptar e ver tudo funcionando tão bem foi uma mão na roda. Ficou uma gracinha! Com certeza vou lembrar dele sempre que precisar.",
        name: "Lola Cirino",
        company: "Marca Pessoal",
    },
    {
        quote:
            "O trabalho do Gustavo é simplesmente impecável! Ele foi muito atencioso e conseguiu captar exatamente o que eu buscava transmitir na minha marca pessoal!",
        name: "Gabriela Costa",
        company: "Marca Pessoal",
    },
    {
        quote:
            "O trabalho com o Gus foi um processo muito claro e leve ao mesmo tempo. Ele tem uma escuta atenta, entende o contexto antes de propor soluções e entrega com precisão. A nova identidade trouxe clareza para o que eu queria comunicar e isso fez toda diferença. Além de um excelente profissional, o Gus é uma pessoa gentil, paciente e verdadeira. Dá pra ver que cada projeto que ele faz carrega intenção e cuidado.",
        name: "Guilherme Farias",
        company: "Marca Pessoal",
    },
]

export const differentiators: Differentiator[] = [
    {
        title: "Metodologia autoral",
        description:
            "Integro estratégia, storytelling e direção criativa em um fluxo único para acelerar decisões.",
        icon: Repeat,
    },
    {
        title: "Entrega 360º",
        description:
            "Do naming aos materiais de lançamento, cuido para que cada detalhe converse com o propósito.",
        icon: Blocks,
    },
    {
        title: "Parceria contínua",
        description:
            "Após o projeto, sigo como guardião da marca para manter a energia viva nas próximas campanhas.",
        icon: TrendingUp,
    },
]

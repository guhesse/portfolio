import {
    Blocks,
    Repeat,
    TrendingUp,
    type LucideIcon,
} from "lucide-react"
import allWaysManual from "@/assets/Manual de Identidade - All Ways.pdf"

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
    link?: string
    slug?: string
    details?: {
        year?: string
        services?: string[]
        challenge?: string
        solution?: string
        gallery?: string[]
        galleryRatio?: string
        externalUrl?: string
        pdf?: string
        concept?: string
        applications?: string
        colors?: { name: string; hex: string; role?: string }[]
    }
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
    { label: "Trabalhos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Experiência", href: "/experiencia" },
    { label: "Operação", href: "#operacao" },
    { label: "Processo", href: "#processo" },
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
        title: "Floume",
        description:
            "Plataforma de multiatendimento para WhatsApp, Instagram e Messenger, sobre a API Oficial da Meta.",
        industry: "SaaS & Atendimento",
        accent: "from-slate-900 via-blue-800 to-emerald-400",
        image: "/images/projects/floume-image.webp",
        link: "https://floume.com.br",
    },
    {
        title: "Coral",
        description:
            "Campanha Cores que tocam, celebrando a diversidade e a beleza das cores escutadas como cromopoemas.",
        industry: "Tintas e Pinturas",
        accent: "from-teal-100 via-cyan-300 to-teal-400",
        image: "/images/projects/coral-image.webp",
        link: "https://touchingcolors.com/",
    },
    {
        title: "orçamenta.ai",
        description:
            "Identidade visual e sistema de marca para uma startup de automação de orçamentos para hotelaria — onde tecnologia e precisão se tornam linguagem visual.",
        industry: "SaaS & Hotelaria",
        accent: "from-blue-900 via-blue-700 to-lime-300",
        image: "/images/projects/orcamenta-ai-image.webp",
        slug: "orcamenta-ai",
        details: {
            year: "2025",
            services: ["Identidade Visual", "Brand System", "Social Media Kit", "Pitch Deck"],
            challenge: "Criar uma marca que traduzisse confiança técnica e modernidade para gestores de hotéis — um público que lida com números, mas precisa ser tocado pela estética.",
            solution: "Um sistema visual dual: azul-marinho como pilar de seriedade e autoridade, verde-limão como acento de inovação e agilidade. O símbolo em cubo isométrico com as letras 'OAI' reforça a ideia de estrutura, organização e inteligência artificial. Aplicado em outdoor, cap, social media e pitch deck, a marca comunica que automação pode — e deve — ser bonita.",
            externalUrl: "https://orcamenta.ai/",
            gallery: [
                "/images/projects/orcamenta/orcamenta-1.webp",
                "/images/projects/orcamenta/orcamenta-6.webp",
                "/images/projects/orcamenta/orcamenta-7.webp",
                "/images/projects/orcamenta/orcamenta-3.webp",
                "/images/projects/orcamenta/orcamenta-4.webp",
                "/images/projects/orcamenta/orcamenta-5.webp",
                "/images/projects/orcamenta/orcamenta-8.webp",
                "/images/projects/orcamenta/orcamenta-2.webp",
            ],
        },
    },
    {
        title: "Charlie",
        description:
            "Uma marca que redefiniu a hospitalidade urbana, unindo design, tecnologia e experiência em um só ecossistema.",
        industry: "Hostelaria & Turismo",
        accent: "from-rose-100 via-rose-300 to-rose-500",
        image: "/images/projects/charlie-image.webp",
        slug: "charlie",
        details: {
            year: "2023",
            services: ["Brand System", "UX/UI", "Identidade Visual"],
            challenge: "Construir uma identidade que capturasse a sofisticação de um hostel urbano premium, diferenciando-o da concorrência e atraindo um público cosmopolita.",
            solution: "Um sistema visual híbrido entre o aconchego e o design contemporâneo, com paleta rosé, tipografia display de personalidade e iconografia arquitetônica.",
            colors: [
                { name: "Jet", hex: "#333333" },
                { name: "Melon", hex: "#FFA991" },
                { name: "Coral", hex: "#EF6E76" },
                { name: "Cardinal", hex: "#B81D33" },
                { name: "Wine", hex: "#69242F" },
                { name: "Celeste", hex: "#B0E4E3" },
                { name: "Tiffany", hex: "#8BD6CC" },
                { name: "Jet", hex: "#614ABB" },
                { name: "Charcoal", hex: "#273847" },
                { name: "Ivory", hex: "#FCFCF2" },
                { name: "Gold", hex: "#D6B75E" },
                { name: "Mustard", hex: "#FFDA40" },
                { name: "Heliotrope", hex: "#D56FED" },
                { name: "Eggplant", hex: "#664A5F" },
            ],
            gallery: [
                "/images/projects/charlie/charlie-1.webp",
                "/images/projects/charlie/charlie-2.webp",
                "/images/projects/charlie/charlie-3.webp",
                "/images/projects/charlie/charlie-4.webp",
                "/images/projects/charlie/charlie-5.webp",
                "/images/projects/charlie/charlie-6.webp",
                "/images/projects/charlie/charlie-7.webp",
                "/images/projects/charlie/charlie-8.webp",
                "/images/projects/charlie/charlie-9.webp",
            ],
        },
    },
    {
        title: "Jéssica Carvalho - Beehelp",
        description:
            "Plataforma de RH com identidade acolhedora e profissional, focada em conectar talentos a oportunidades ideais.",
        industry: "Departamento pessoal & RH",
        accent: "from-amber-100 via-orange-300 to-amber-500",
        image: "/images/projects/beehelp-image.webp",
    },
    {
        title: "Elixir",
        description:
            "Marca de recursos humanos que conecta talentos excepcionais com empresas inovadoras.",
        industry: "Recursos Humanos",
        accent: "from-green-100 via-emerald-300 to-green-500",
        image: "/images/projects/elixir-image.webp",
    },
    {
        title: "Espresso Estoico",
        description:
            "Uma marca divertida que combina com a Vitória, trazendo uma abordagem única ao estoicismo e carreira em games.",
        industry: "Estoicismo & Carreira em Games",
        accent: "from-indigo-100 via-indigo-300 to-indigo-500",
        image: "/images/projects/espresso-2-image.webp",
    },
    {
        title: "All Ways Instituto",
        description:
            "Identidade visual para a All Ways, ONG voltada ao público infantil. A marca parte de uma ideia simples: felicidade em todos os caminhos.",
        industry: "ONG infantil",
        accent: "from-[#003744] via-[#007A9C] to-[#F07F5E]",
        image: "/images/projects/all-ways-image.webp",
        slug: "all-ways",
        details: {
            services: ["Identidade Visual", "Manual de identidade"],
            pdf: allWaysManual,
            concept:
                "O logo une dois símbolos: setas, que representam caminhos e direções, e um sorriso, que ocupa o lugar das letras “ll”. O resultado é uma marca que se lê como nome e como expressão ao mesmo tempo, fácil de reconhecer e de lembrar.",
            applications:
                "O sistema foi testado em posts e perfil de Instagram, camisetas, crachá com cordão e cartões de visita, sempre alternando os fundos Linho e Petróleo com as formas orgânicas da simbologia.",
            colors: [
                { name: "Linho Acolhedor", hex: "#F7F5EB", role: "Fundo claro, simplicidade e aconchego" },
                { name: "Petróleo Elegante", hex: "#003744", role: "Fundo escuro, sofisticação" },
                { name: "Laranja Radiante", hex: "#F07F5E", role: "Destaque principal do “ll”" },
                { name: "Amarelo Alegre", hex: "#FBC357", role: "Apoio" },
                { name: "Azul Suave", hex: "#2CC0E6", role: "Apoio" },
                { name: "Azul Seguro", hex: "#007A9C", role: "Apoio" },
                { name: "Verde Esperança", hex: "#32A66E", role: "Apoio" },
            ],
        },
    },
    {
        title: "Angélica Neiva",
        description:
            "Identidade visual e kit de social media para marca pessoal de escrita criativa.",
        industry: "Copywriting & Social Media",
        accent: "from-purple-100 via-violet-300 to-purple-400",
        image: "/images/projects/angelica-image.webp",
        slug: "angelica-neiva",
        details: {
            year: "2024",
            services: ["Marca Pessoal", "Identidade Visual", "Social Media Kit"],
            challenge: "Construir uma marca pessoal de escrita criativa com presença consistente entre o conteúdo e o social media.",
            solution: "Uma identidade ilustrada e próxima, aplicada na marca pessoal e no kit de social media.",
            gallery: [
                "/images/projects/angelica/angelica-1.webp",
                "/images/projects/angelica/angelica-2.webp",
                "/images/projects/angelica/angelica-3.webp",
                "/images/projects/angelica/angelica-4.webp",
            ],
        },
    },
    {
        title: "Petcare",
        description:
            "Pitch deck para uma marca de coleira inteligente, com o produto, o mercado e o aplicativo.",
        industry: "Pets",
        accent: "from-green-100 via-emerald-300 to-green-500",
        image: "/images/projects/petcare-image.webp",
        slug: "petcare",
        details: {
            services: ["Pitch Deck"],
            galleryRatio: "16 / 9",
            gallery: [
                "/images/projects/petcare/final_1.webp",
                "/images/projects/petcare/1_1.webp",
                "/images/projects/petcare/2.webp",
                "/images/projects/petcare/1.webp",
                "/images/projects/petcare/dogs-and-cats.webp",
                "/images/projects/petcare/3.webp",
                "/images/projects/petcare/5-copy_1.webp",
                "/images/projects/petcare/produto.webp",
                "/images/projects/petcare/beladona.webp",
                "/images/projects/petcare/4.webp",
                "/images/projects/petcare/4_1.webp",
                "/images/projects/petcare/5.webp",
                "/images/projects/petcare/5-copy_2.webp",
                "/images/projects/petcare/final_2.webp",
                "/images/projects/petcare/final-copy.webp",
            ],
        },
    },
    {
        title: "Adgile",
        description:
            "Plataforma de gestão criativa para agências e times de marketing, com foco em agilidade e inteligência visual.",
        industry: "SaaS & Marketing",
        accent: "from-blue-100 via-blue-300 to-blue-500",
        image: "/images/projects/adgile-image.webp",
        link: "/adgile/",
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
            "Fiz dois projetos com o Gustavo. Começamos com um design de marca e depois partimos para uma landing page. Durante todo esse processo, o trabalho dele foi incrível, não apenas pelos resultados, mas também pelo profissionalismo que demonstrou em cada etapa. Sempre trazendo atualizações sobre o andamento do projeto e mantendo ótimas relações interpessoais.",
        name: "Vitor Lostada",
        company: "orçamenta.ai",
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

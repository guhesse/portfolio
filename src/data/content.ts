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
        subtitle?: string
        concept?: string
        applications?: string
        logo?: string
        typography?: string
        graphics?: string
        voice?: string
        pitch?: string
        showcase?: string
        comparison?: string
        facts?: { label: string; value: string }[]
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
        title: "Orçamenta.AI — Identidade Visual",
        description:
            "Identidade visual para a Orçamenta.AI, plataforma de automação que gera orçamentos instantâneos e padronizados para hotéis e centros de convenções. A marca nasceu de mais de três décadas de experiência no setor e precisava traduzir essa combinação de legado e tecnologia. O resultado é uma identidade técnica e madura, com um toque de frescor que comunica inovação.",
        industry: "SaaS & Hotelaria",
        accent: "from-[#0F223A] via-[#244971] to-[#B3C495]",
        image: "/images/projects/orcamenta-ai-image.webp",
        slug: "orcamenta-ai",
        details: {
            year: "2025",
            services: ["Identidade Visual"],
            subtitle: "Precisão, controle e legado para a hotelaria",
            challenge:
                "Na hotelaria, um orçamento lento é uma venda perdida. A Orçamenta.AI chega para eliminar a burocracia comercial, mas competia com a imagem fria e genérica de “mais uma ferramenta de IA”. A marca precisava transmitir autoridade de quem veio de dentro do setor e, ao mesmo tempo, a agilidade de uma tecnologia nova: confiável para gestores, moderna para o mercado.",
            concept:
                "“A tecnologia deve ser invisível e eficiente.” A identidade parte de três pilares: Organização, Assertividade e Inteligência. Eles se materializam num símbolo tridimensional, um cubo isométrico que encaixa as iniciais da marca e representa estrutura, solidez e a caixa onde dados viram propostas impecáveis.",
            logo:
                "O símbolo foi construído a partir dos três pilares. Cada face do cubo representa um deles e, juntas, formam a assinatura completa. Um sistema de proporções matemáticas define medidas e área de proteção, para que a marca mantenha força e clareza em qualquer aplicação. A família inclui versões horizontal e vertical, positiva e negativa, além de monocromáticas para uso restrito.",
            typography:
                "A Sora fica nos títulos e nos destaques, com geometria limpa e presença marcante, o tom de vanguarda da IA. A Synonym fica no corpo de texto e nos dados, com leitura fluida e desenho atemporal, a estabilidade técnica da marca. A combinação traduz a proposta da Orçamenta.AI: a agilidade do novo com a solidez de 32 anos de experiência.",
            graphics:
                "Os fragmentos do símbolo viram formas gráficas independentes que dão ritmo e movimento aos layouts. Aplicados em grandes recortes ou em padrões repetidos, eles guiam o olhar e reforçam a marca em dashboards, materiais institucionais e peças de comunicação, sempre com alto contraste.",
            voice:
                "O brandbook também define propósito, o porquê, o como e o quê, além da personalidade e do tom de voz: assertiva, madura e facilitadora. Exemplo: “Orçamentos prontos em segundos. Sem erros, sem atrasos.”",
            showcase:
                "Outdoor, site e interface no notebook, telas mobile, cartões de visita, papelaria, boné e ecobag. As peças levam a marca do digital ao físico, com a mesma consistência. A landing page está no ar em orcamenta.ai.",
            colors: [
                { name: "Abissal", hex: "#0F223A", role: "Maturidade, tecnologia e segurança" },
                { name: "Sereno", hex: "#173A52", role: "Maturidade, tecnologia e segurança" },
                { name: "Mirtilo", hex: "#244971", role: "Maturidade, tecnologia e segurança" },
                { name: "Ardósia", hex: "#387088", role: "Maturidade, tecnologia e segurança" },
                { name: "Matcha", hex: "#B3C495", role: "O brilho da inovação" },
                { name: "Hortelã", hex: "#D8E3BB", role: "Energia" },
                { name: "Botânico", hex: "#94B088", role: "Frescor" },
                { name: "Névoa", hex: "#D8D8E0", role: "Respiro" },
                { name: "Alvor", hex: "#E7EAE9", role: "Organização nas interfaces" },
            ],
            facts: [
                { label: "Cliente", value: "Orçamenta.AI" },
                { label: "Ano", value: "2025" },
                { label: "Escopo", value: "Identidade visual, logotipo, sistema de proporções, paleta, tipografia, elementos de apoio, aplicações, brandbook e landing page" },
                { label: "Design", value: "Gustavo Hesse" },
            ],
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
        title: "Jessica Carvalho — Identidade Visual",
        description:
            "Identidade visual para Jessica Carvalho, consultora de Departamento Pessoal. O desafio era mostrar que DP vai além da burocracia: é a área que conecta pessoas, processos e estratégia. A marca une seriedade e calor humano, com uma linguagem visual inspirada em organização e na abelha como símbolo de trabalho em conjunto.",
        industry: "Departamento pessoal & RH",
        accent: "from-amber-100 via-orange-300 to-amber-500",
        image: "/images/projects/beehelp-image.webp",
        slug: "beehelp",
        details: {
            services: ["Identidade Visual"],
            subtitle: "Uma marca para quem transforma o Departamento Pessoal em estratégia",
            challenge:
                "Departamento Pessoal costuma ser visto como uma área técnica, fria e cheia de papelada. A Jessica queria se posicionar de outro jeito: como parceira estratégica, que cuida da folha e dos documentos com precisão, mas que também entende que as pessoas são o maior ativo de uma empresa. A identidade precisava passar confiança e proximidade ao mesmo tempo.",
            concept:
                "A colmeia virou a metáfora central: cada parte funciona em harmonia para o todo prosperar, assim como um DP eficiente conecta todos os departamentos. Daí vieram o amarelo, os padrões hexagonais e os ícones de abelha. A estrutura visual buscou referências em ferramentas de organização, como o Notion, e na estética amigável do Mailchimp.",
            logo:
                "A logo combina Hepta Slab e Superpop. A slab traz o lado clássico e equilibrado; a Superpop, um toque descontraído e humano. Esse contraste traduz os dois valores da marca: estabilidade e proximidade. A família tem quatro versões de cor para se adaptar a fundos e contextos diferentes.",
            typography:
                "A Hepta Slab fica nos títulos e reforça seriedade e equilíbrio. A Sofia Pro fica no corpo de texto: é geométrica, legível e não compete com as cores vibrantes da paleta.",
            graphics:
                "Caixas com contorno e checkboxes remetem a organização e controle. Padrões leves de colmeia aparecem nos fundos sem sobrecarregar. Há também um set de ícones próprio para os serviços: pessoas, estratégia, cálculos e comunicação.",
            showcase:
                "Para mostrar a marca em uso, o sistema foi para posts de redes sociais, slides de apresentação, capa de LinkedIn e cartão de visitas. Todos seguem as caixas, os ícones e as cores do guia.",
            colors: [
                { name: "Amarelo", hex: "#F1B42F", role: "Xanthous. Energia e a simbologia da abelha" },
                { name: "Coral", hex: "#D38B7A", role: "Dinamismo e movimento, ligado ao lado esportivo e de corrida da Jessica" },
                { name: "Midnight Green", hex: "#0F585C", role: "Solidez e estabilidade" },
                { name: "Gunmetal", hex: "#243033", role: "Solidez e estabilidade" },
                { name: "Sépia", hex: "#8C6239", role: "O solo, a base firme da marca" },
                { name: "Linen", hex: "#F4EFE6", role: "Respiro e leveza nos fundos" },
            ],
            facts: [
                { label: "Cliente", value: "Jessica Carvalho — Consultoria em Departamento Pessoal" },
                { label: "Marca", value: "BeeHelp" },
                { label: "Escopo", value: "Logotipo, paleta, tipografia, elementos gráficos, iconografia, aplicações e guia de bolso" },
                { label: "Design", value: "Gustavo Hesse" },
            ],
            gallery: [
                "/images/projects/beehelp/bone-beehelp.webp",
                "/images/projects/beehelp/cartao-de-visitas-beehelp.webp",
                "/images/projects/beehelp/celulares-beehelp.webp",
                "/images/projects/beehelp/copo-beehelp.webp",
            ],
        },
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
        title: "Angélica Neiva — Identidade Visual",
        description:
            "Identidade visual para Angélica Neiva, escritora especializada em escrita criativa, storytelling e conteúdo para a geração Z. A proposta era traduzir o trabalho dela em marca: textos artesanais, únicos e humanos, longe da comunicação engessada e genérica. O resultado é uma identidade quente, ilustrada e cheia de personalidade, construída a partir da própria Angélica.",
        industry: "Escrita criativa & Storytelling",
        accent: "from-[#F6EBDA] via-[#B72227] to-[#551613]",
        image: "/images/projects/angelica-image.webp",
        slug: "angelica-neiva",
        details: {
            year: "2025",
            services: ["Identidade Visual", "Ilustração"],
            subtitle: "Conteúdo de gente pra gente",
            challenge:
                "A identidade anterior, com degradê lilás e tipografia fina, era delicada, mas genérica, e não mostrava quem a Angélica é. Ela precisava de uma marca que se destacasse num mercado cheio de textos profissionais demais e de conteúdo produzido em série por IA, e que comunicasse o diferencial dela: escrita feita com sensibilidade, conceito e atenção aos detalhes.",
            concept:
                "“Conteúdo de gente pra gente.” Se o trabalho é artesanal, a marca também tinha que ser. Toda a identidade parte de uma ilustração autoral da Angélica, com traço solto e expressivo, que vira assinatura, mascote e elemento gráfico. A personalidade dela, das tatuagens ao cabelo ruivo, do humor a um certo overthinking, aparece nos detalhes, e o tom de voz é descontraído e direto, como uma conversa.",
            logo:
                "A família de logos tem versões com e sem o retrato ilustrado, em formatos horizontal e vertical, para funcionar do avatar de rede social às assinaturas de post. O lettering combina um peso mais firme no sobrenome com um traço leve no nome, o mesmo equilíbrio entre seriedade e leveza que a escrita dela tem.",
            typography:
                "Parkinsans, em Semibold e Regular, fica nos títulos e nos textos: moderna, arredondada e acessível. A Shantell Sans entra como o toque manuscrito, em notas e frases de apoio, para reforçar o feito à mão.",
            graphics:
                "Ilustrações autorais da Angélica em diferentes versões, incluindo uma releitura de uma obra clássica com o rosto dela. Há também rabiscos, estrelas, corações e anotações à mão, um cérebro ilustrado que brinca com o overthinking, e texturas com palavras-chave da marca: artesanal, storytelling, histórias, gen z, à mão.",
            showcase:
                "Capa para redes sociais, posts de feed e carrosséis com tom conversacional, como “Cansado de textos engessados?” e “Mudar de ideia é gostoso demais”. O sistema tem quatro variações de fundo, que dão flexibilidade ao feed sem perder a unidade: Branco Encardido, Bege Artesã, Darkinho e Muito Dark.",
            comparison:
                "A comparação mostra a mudança de uma estética genérica e etérea para uma marca com rosto, voz e personalidade próprias.",
            colors: [
                { name: "Branco Rústico", hex: "#F6EBDA", role: "Fundo com textura de papel" },
                { name: "Areia do Deserto", hex: "#EAD5BC", role: "Fundo de artesanato" },
                { name: "Chá de Rosas", hex: "#9B5D54", role: "Delicadeza" },
                { name: "Rosa Melão", hex: "#E1B4AC", role: "Afeto" },
                { name: "Vermelho Cardinal", hex: "#B72227", role: "Energia e destaque" },
                { name: "Vermelho Sangue", hex: "#800000", role: "Profundidade e intensidade" },
                { name: "Café Torrado", hex: "#551613", role: "Contraste" },
            ],
            facts: [
                { label: "Cliente", value: "Angélica Neiva — Escrita Criativa e Storytelling" },
                { label: "Ano", value: "2025" },
                { label: "Escopo", value: "Rebranding, logotipo, ilustração autoral, paleta, tipografia, elementos gráficos, aplicações para redes sociais e guia de bolso" },
                { label: "Design e ilustração", value: "Gustavo Hesse" },
                { label: "Ferramentas", value: "Illustrator e Photoshop" },
            ],
            gallery: [
                "/images/projects/angelica/angelica-1.webp",
                "/images/projects/angelica/angelica-2.webp",
                "/images/projects/angelica/angelica-3.webp",
                "/images/projects/angelica/angelica-4.webp",
            ],
        },
    },
    {
        title: "PetCare — Pitch Deck",
        description:
            "Pitch deck da PetCare, uma startup de saúde pet que une uma coleira inteligente a um app de acompanhamento. A coleira monitora atividade, temperatura, batimentos e localização, e o app reúne tudo isso com consultas, vacinas, exames e documentos. O deck precisava traduzir um produto tecnológico em algo emocional para tutores e claro o bastante para convencer investidores.",
        industry: "Pets",
        accent: "from-[#002650] via-[#002650] to-[#F8A018]",
        image: "/images/projects/petcare-image.webp",
        slug: "petcare",
        details: {
            year: "2025",
            services: ["Pitch Deck"],
            subtitle: "Tecnologia que cuida, dados que protegem",
            challenge:
                "A PetCare precisava de um pitch que traduzisse um produto tecnológico em algo emocional e fácil de entender. Do lado do tutor, a dor é descobrir um problema de saúde tarde demais. Do lado do investidor, a pergunta é por que esse mercado e por que agora.",
            concept:
                "“Tecnologia que cuida, dados que protegem.” O deck apoia a narrativa nesse contraste: o cuidado com o pet de um lado, a precisão dos dados do outro.",
            pitch:
                "O deck foi construído como uma narrativa em quatro atos. Conexão: abre com o lado emocional. “Imagine não ser recebido pelo seu melhor amigo.” Problema: doenças silenciosas e gastos imprevistos. “Quando você descobrir, pode ser tarde demais.” Os dados de saúde animal aparecem com fontes acadêmicas. Solução: a coleira e o app, com as funcionalidades apresentadas sobre os próprios pets da equipe, o que deixa o produto real e próximo. Oportunidade: o mercado, o Brasil é o 3º maior mercado pet do mundo, segundo a Abinpet, uma lista de possíveis parceiros para prospecção, não parcerias fechadas, e o fechamento com a marca.",
            showcase:
                "Pitch deck completo, interface do app (home, atividades, gráficos de saúde, GPS, calendário e vermífugos), mockup da coleira e peças de apresentação. O mockup da coleira e algumas fotos de pets foram gerados com inteligência artificial.",
            facts: [
                { label: "Cliente", value: "PetCare" },
                { label: "Ano", value: "2025" },
                { label: "Escopo", value: "Pitch deck e mockups do produto" },
                { label: "Design", value: "Gustavo Hesse" },
            ],
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

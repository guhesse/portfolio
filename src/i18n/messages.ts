export type Messages = {
    metaTitle: string
    metaDescription: string
    marquee: string[]
    hero: {
        eyebrow: string
        titleLine1: string
        titleLine2: string
        bodyLine1: string
        bodyLine2: string
        ctaProject: string
        ctaPortfolio: string
        toolCreate: string
        toolCreateHint: string
        toolDelete: string
        toolDeleteHint: string
        toolBlow: string
        toolBlowHint: string
        toolMagnet: string
        toolMagnetHint: string
        toolGravity: string
        toolGravityHint: string
        toolGravityHintUp: string
    }
    header: {
        chat: string
        openMenu: string
        navigation: string
        language: string
    }
    footer: {
        blurb: string
        sections: string
        contact: string
        rights: string
    }
    projects: {
        eyebrow: string
        title: string
        description: string
        viewProject: string
        previous: string
        next: string
    }
    about: {
        eyebrow: string
        title: string
        description: string
        quoteLine1: string
        quoteLine2: string
        photoAlt: string
    }
    process: {
        eyebrow: string
        title: string
        description: string
        keyDelivery: string
    }
    testimonials: {
        eyebrow: string
        title: string
        description: string
        readMore: string
        readLess: string
        previous: string
        next: string
        dot: (index: number) => string
    }
    contact: {
        eyebrow: string
        title: string
        description: string
        prompt: string
        reply: string
        send: string
        book: string
    }
    project: {
        notFoundTitle: string
        notFoundBody: string
        back: string
        allProjects: string
        challenge: string
        solution: string
        gallery: string
        previousImage: string
        nextImage: string
        thumb: (index: number) => string
        nextStep: string
        together: string
        seeLive: string
        book: string
    }
}

const pt: Messages = {
    metaTitle: "Gustavo Hesse - Branding & Direção Criativa",
    metaDescription: "Crio marcas que fazem sentido. Por dentro e por fora. Designer especializado em branding, identidade visual e direção criativa.",
    marquee: [
        "BRANDING E IDENTIDADE",
        "DIREÇÃO CRIATIVA",
        "DESIGN COM INTENÇÃO",
        "PROJETOS AUTORAIS",
        "MARQUE UMA CONVERSA",
        "MARCA COM PERSONALIDADE",
        "ESTRATÉGIA DE MARCA",
        "COMUNICAÇÃO VISUAL",
        "DESIGN PARA IMPACTO",
        "MARQUE UMA CONVERSA",
    ],
    hero: {
        eyebrow: "Branding & Direção Criativa",
        titleLine1: "Crio marcas que fazem sentido.",
        titleLine2: "Por dentro e por fora.",
        bodyLine1: "Cada projeto é único. Tem seu próprio comportamento, linguagem e emoção.",
        bodyLine2: "O resultado? É sempre o mesmo. Marcas com alma e coerência visual.",
        ctaProject: "Iniciar um projeto",
        ctaPortfolio: "Ver portfólio",
        toolCreate: "Criar tag",
        toolCreateHint: "Clique onde quiser soltar uma tag nova.",
        toolDelete: "Apagar tag",
        toolDeleteHint: "Clique ou arraste por cima de uma tag para removê-la.",
        toolBlow: "Assoprar",
        toolBlowHint: "Arraste para empurrar o grupo inteiro na direção do gesto.",
        toolMagnet: "Imã",
        toolMagnetHint: "Arraste para puxar as tags na direção do cursor.",
        toolGravity: "Gravidade",
        toolGravityHint: "Inverte o peso e faz as tags subirem.",
        toolGravityHintUp: "Devolve a queda normal.",
    },
    header: {
        chat: "Bater um papo",
        openMenu: "Abrir menu",
        navigation: "Navegação",
        language: "Idioma",
    },
    footer: {
        blurb: "Estratégia, identidade visual e direção criativa para marcas autorais que querem ocupar seu espaço com personalidade.",
        sections: "Sessões",
        contact: "Contato",
        rights: "Todos os direitos reservados.",
    },
    projects: {
        eyebrow: "Portfólio",
        title: "Identidades visuais que viraram pontos de conexão reais.",
        description: "Cada projeto nasce de uma imersão profunda na essência da marca e é lançado com um manual vivo para manter a consistência no dia a dia.",
        viewProject: "Ver projeto →",
        previous: "Anterior",
        next: "Próximo",
    },
    about: {
        eyebrow: "Sobre",
        title: "Sou Gustavo, designer estrategista.",
        description: "Gosto de entender o porquê por trás das formas e transformar intenção em linguagem visual. Trabalho com branding, identidade e direção criativa. Minha abordagem mistura pesquisa, percepção e estética. Sempre com atenção a como a marca respira no dia a dia.",
        quoteLine1: "Design bom faz sentido antes de ficar bonito.",
        quoteLine2: "Quando faz sentido, o bonito dura.",
        photoAlt: "Gustavo Hesse, designer",
    },
    process: {
        eyebrow: "Processo",
        title: "Uma jornada colaborativa em três atos para dar vida à sua marca.",
        description: "Cada fase tem objetivos, rituais e entregas claras para garantir que você participe das decisões e se sinta seguro na implementação.",
        keyDelivery: "Entrega-chave",
    },
    testimonials: {
        eyebrow: "Depoimentos",
        title: "Projetos construídos com confiança e parceria de longo prazo.",
        description: "Clientes que se tornam guardiões da marca e seguem colhendo resultados consistentes no pós-lançamento.",
        readMore: "Ler mais ↓",
        readLess: "Ler menos ↑",
        previous: "Anterior",
        next: "Próximo",
        dot: (index) => `Depoimento ${index}`,
    },
    contact: {
        eyebrow: "Próximo passo",
        title: "Uma conversa para entender sua marca, desafios e visão de futuro.",
        description: "Traga seus objetivos e perguntas. Eu levo repertório, metodologia e um plano claro de como podemos construir essa história juntos.",
        prompt: "Me chame no WhatsApp, ou podemos marcar um papo!",
        reply: "Respondo em até 24 horas úteis.",
        send: "Enviar mensagem",
        book: "Marcar papo",
    },
    project: {
        notFoundTitle: "Projeto não encontrado",
        notFoundBody: "O projeto que você procura não existe ou foi removido.",
        back: "Voltar ao portfólio",
        allProjects: "Todos os projetos",
        challenge: "Desafio",
        solution: "Solução",
        gallery: "Galeria",
        previousImage: "Imagem anterior",
        nextImage: "Próxima imagem",
        thumb: (index) => `Ver imagem ${index}`,
        nextStep: "Próximo passo",
        together: "Vamos criar algo assim juntos?",
        seeLive: "Ver projeto ao vivo",
        book: "Agendar conversa",
    },
}

const en: Messages = {
    metaTitle: "Gustavo Hesse - Branding & Creative Direction",
    metaDescription: "I make brands that make sense. Inside and out. Designer focused on branding, visual identity, and creative direction.",
    marquee: [
        "BRANDING & IDENTITY",
        "CREATIVE DIRECTION",
        "DESIGN WITH INTENTION",
        "ORIGINAL PROJECTS",
        "BOOK A CONVERSATION",
        "A BRAND WITH PERSONALITY",
        "BRAND STRATEGY",
        "VISUAL COMMUNICATION",
        "DESIGN FOR IMPACT",
        "BOOK A CONVERSATION",
    ],
    hero: {
        eyebrow: "Branding & Creative Direction",
        titleLine1: "I make brands that make sense.",
        titleLine2: "Inside and out.",
        bodyLine1: "Every project is unique. It has its own behavior, language, and emotion.",
        bodyLine2: "The result? It's always the same. Brands with soul and visual coherence.",
        ctaProject: "Start a project",
        ctaPortfolio: "See the portfolio",
        toolCreate: "Add a tag",
        toolCreateHint: "Click wherever you want to drop a new tag.",
        toolDelete: "Remove a tag",
        toolDeleteHint: "Click or drag across a tag to remove it.",
        toolBlow: "Blow",
        toolBlowHint: "Drag to push the whole group in that direction.",
        toolMagnet: "Magnet",
        toolMagnetHint: "Drag to pull the tags toward the cursor.",
        toolGravity: "Gravity",
        toolGravityHint: "Flip the weight so the tags rise.",
        toolGravityHintUp: "Bring the normal fall back.",
    },
    header: {
        chat: "Let's talk",
        openMenu: "Open menu",
        navigation: "Navigation",
        language: "Language",
    },
    footer: {
        blurb: "Strategy, visual identity, and creative direction for original brands that want to take up space with personality.",
        sections: "Sections",
        contact: "Contact",
        rights: "All rights reserved.",
    },
    projects: {
        eyebrow: "Portfolio",
        title: "Visual identities that became real points of connection.",
        description: "Each project starts with a deep immersion in the brand's essence and launches with a living manual to keep everyday consistency.",
        viewProject: "View project →",
        previous: "Previous",
        next: "Next",
    },
    about: {
        eyebrow: "About",
        title: "I'm Gustavo, a strategist designer.",
        description: "I like to understand the why behind the forms and turn intention into visual language. I work with branding, identity, and creative direction. My approach mixes research, perception, and aesthetics, always paying attention to how a brand breathes day to day.",
        quoteLine1: "Good design makes sense before it looks beautiful.",
        quoteLine2: "When it makes sense, the beauty lasts.",
        photoAlt: "Gustavo Hesse, designer",
    },
    process: {
        eyebrow: "Process",
        title: "A collaborative journey in three acts to bring your brand to life.",
        description: "Each phase has clear goals, rituals, and deliverables so you take part in the decisions and feel confident putting them into practice.",
        keyDelivery: "Key deliverable",
    },
    testimonials: {
        eyebrow: "Testimonials",
        title: "Projects built on trust and a long-term partnership.",
        description: "Clients who become guardians of the brand and keep seeing consistent results after launch.",
        readMore: "Read more ↓",
        readLess: "Read less ↑",
        previous: "Previous",
        next: "Next",
        dot: (index) => `Testimonial ${index}`,
    },
    contact: {
        eyebrow: "Next step",
        title: "A conversation to understand your brand, challenges, and vision.",
        description: "Bring your goals and questions. I bring repertoire, method, and a clear plan for how we can build this story together.",
        prompt: "Message me on WhatsApp, or we can book a chat.",
        reply: "I reply within 24 business hours.",
        send: "Send a message",
        book: "Book a chat",
    },
    project: {
        notFoundTitle: "Project not found",
        notFoundBody: "The project you're looking for doesn't exist or was removed.",
        back: "Back to the portfolio",
        allProjects: "All projects",
        challenge: "Challenge",
        solution: "Solution",
        gallery: "Gallery",
        previousImage: "Previous image",
        nextImage: "Next image",
        thumb: (index) => `View image ${index}`,
        nextStep: "Next step",
        together: "Shall we create something like this together?",
        seeLive: "See it live",
        book: "Book a conversation",
    },
}

export const messages: Record<"pt" | "en", Messages> = { pt, en }

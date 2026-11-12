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
        toolPaint: string
        toolPaintHint: string
        toolGravity: string
        toolGravityHint: string
        toolGravityHintUp: string
    }
    header: {
        chat: string
        openMenu: string
        navigation: string
        language: string
        navBrand: string
        role: string
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
        index: string
        filterAll: string
        filterBrand: string
        filterOps: string
    }
    about: {
        eyebrow: string
        title: string
        description: string
        quoteLine1: string
        quoteLine2: string
        photoAlt: string
        index: string
        tags: string[]
    }
    process: {
        eyebrow: string
        title: string
        description: string
        keyDelivery: string
        index: string
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
        index: string
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
    ops: {
        metaTitle: string
        metaDescription: string
        heroTitle: string
        heroSubtitle: string
        ctaLinkedin: string
        ctaProjects: string
        treeHint: string
        treeStages: string[]
        treeMarks: string[]
        treeStyleOutline: string
        treeStyleFill: string
        navCreative: string
        navContact: string
        navTestimonials: string
        marquee: string[]
        numbersLabel: string
        stats: { value: number; suffix: string; label: string; context: string }[]
        aboutLabel: string
        aboutBody: string
        casesLabel: string
        resultLabel: string
        cases: { title: string; tag: string; description: string; result: string }[]
        stackLabel: string
        stack: string[]
        backToBranding: string
        linkedin: string
        sectionIndex: string
        sectionTitle: string
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
        bodyLine1: "Cada projeto é único.\nTem seu próprio comportamento, linguagem e emoção.",
        bodyLine2: "O resultado? É sempre o mesmo.\nMarcas com alma e coerência visual.",
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
        toolPaint: "Pintar",
        toolPaintHint: "Clique numa tag para trocar a cor. Arraste para pintar várias.",
        toolGravity: "Gravidade",
        toolGravityHint: "Inverte o peso e faz as tags subirem.",
        toolGravityHintUp: "Devolve a queda normal.",
    },
    header: {
        chat: "Vamos conversar",
        openMenu: "Abrir menu",
        navigation: "Navegação",
        language: "Idioma",
        navBrand: "Portfólio",
        role: "Designer & operação criativa",
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
        index: "01  /  Trabalhos",
        filterAll: "Todos",
        filterBrand: "Marcas",
        filterOps: "Operação",
    },
    about: {
        eyebrow: "Sobre",
        title: "Sou Gustavo, designer estrategista.",
        description: "Gosto de entender o porquê por trás das formas e transformar intenção em linguagem visual. Trabalho com branding, identidade e direção criativa. Minha abordagem mistura pesquisa, percepção e estética. Sempre com atenção a como a marca respira no dia a dia. Fora dos projetos autorais, coordeno operações criativas globais na VML, onde também construo as ferramentas que fazem a produção escalar.",
        quoteLine1: "Design bom faz sentido antes de ficar bonito.",
        quoteLine2: "Quando faz sentido, o bonito dura.",
        photoAlt: "Gustavo Hesse, designer",
        index: "02  /  Sobre",
        tags: ["Branding", "Direção criativa", "Identidade visual", "Operação criativa"],
    },
    process: {
        eyebrow: "Processo",
        title: "Uma jornada colaborativa em três atos para dar vida à sua marca.",
        description: "Cada fase tem objetivos, rituais e entregas claras para garantir que você participe das decisões e se sinta seguro na implementação.",
        keyDelivery: "Entrega-chave",
        index: "04  /  Processo",
    },
    testimonials: {
        eyebrow: "Depoimentos",
        title: "Projetos construídos com confiança e parceria de longo prazo.",
        description: "Clientes que se tornam guardiões da marca e seguem colhendo resultados consistentes no pós-lançamento.",
        readMore: "Ler mais",
        readLess: "Ler menos",
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
        index: "05  /  Contato",
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
    ops: {
        metaTitle: "Gustavo Hesse — Creative Operations & Automation",
        metaDescription: "Coordeno produção criativa e construo as ferramentas que fazem ela escalar. Operação da Dell na VML, automação e business intelligence.",
        heroTitle: "Creative Operations & Automation",
        heroSubtitle: "Coordeno produção criativa e construo as ferramentas que fazem ela escalar.",
        ctaLinkedin: "Ver no LinkedIn",
        ctaProjects: "Ver projetos ↓",
        treeHint: "Clique para crescer",
        treeStages: ["Semente", "Broto", "Muda", "Árvore"],
        treeMarks: ["Workflow", "Processos", "Criatividade"],
        treeStyleOutline: "Contorno",
        treeStyleFill: "Preenchido",
        navCreative: "Creative Operations",
        navContact: "Contato",
        navTestimonials: "Depoimentos",
        marquee: [
            "CREATIVE OPERATIONS",
            "PRODUÇÃO QUE ESCALA",
            "WORKFLOW",
            "PROCESSOS",
            "CRIATIVIDADE",
            "AUTOMAÇÃO",
            "ENTREGA NO PRAZO",
            "FERRAMENTAS INTERNAS",
            "BRIEFING AO ASSET",
            "OPERAÇÃO GLOBAL",
        ],
        numbersLabel: "Números",
        stats: [
            { value: 2300, suffix: "+", label: "jobs coordenados", context: "desde abr/2023" },
            { value: 830, suffix: "", label: "assets em um trimestre", context: "Black Friday 2025" },
            { value: 89, suffix: "%", label: "entregas no prazo", context: "no trimestre de maior volume" },
            { value: 2, suffix: " dias úteis", label: "até a primeira entrega", context: "mediana em 300+ jobs" },
        ],
        aboutLabel: "Sobre",
        aboutBody: "Comecei como designer em gráfica rápida em 2016, passei por direção de arte, motion e UI, e hoje coordeno a operação criativa da Dell na VML. São 10 anos de experiência em design e operações — aprendi a programar para resolver os gargalos que eu mesmo vivia.",
        casesLabel: "Cases de operação",
        resultLabel: "Resultado",
        cases: [
            {
                title: "VML Workfront Manager",
                tag: "Automação · Google Apps Script",
                description: "Ferramenta interna que automatiza geração de briefings e abertura de requests no Workfront, integrando planilha e sistema de gestão da Dell.",
                result: "Eliminou etapas manuais do fluxo de localização de campanhas.",
            },
            {
                title: "B.I. da Operação Dell",
                tag: "Business Intelligence · Google Apps Script",
                description: "Dashboard que rastreia cada job por round de aprovação, separando tempo de agência e tempo de cliente, em 100% dos jobs da operação.",
                result: "Primeira versão entregue em 2 dias úteis (mediana em 300+ jobs).",
            },
            {
                title: "Cores que Tocam (Coral × VML)",
                tag: "UI/UX · Acessibilidade",
                description: "Primeiro sistema de cores não visual do mundo, criado para pessoas cegas ou com baixa visão explorarem e escolherem cores de forma autônoma.",
                result: "Shortlist no Cannes Lions 2025 · Industry Craft",
            },
        ],
        stackLabel: "Stack",
        stack: ["JavaScript", "Google Apps Script", "HTML5", "CSS", "Workfront", "Figma", "Adobe CC", "IA Generativa", "Python (básico)"],
        backToBranding: "← Ver portfólio de branding",
        linkedin: "LinkedIn",
        sectionIndex: "03  /  Operação",
        sectionTitle: "Produção que escala.",
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
        bodyLine1: "Every project is unique.\nIt has its own behavior, language, and emotion.",
        bodyLine2: "The result? It's always the same.\nBrands with soul and visual coherence.",
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
        toolPaint: "Paint",
        toolPaintHint: "Click a tag to change its color. Drag to paint several.",
        toolGravity: "Gravity",
        toolGravityHint: "Flip the weight so the tags rise.",
        toolGravityHintUp: "Bring the normal fall back.",
    },
    header: {
        chat: "Let's talk",
        openMenu: "Open menu",
        navigation: "Navigation",
        language: "Language",
        navBrand: "Portfolio",
        role: "Designer & creative operations",
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
        index: "01  /  Work",
        filterAll: "All",
        filterBrand: "Brands",
        filterOps: "Operations",
    },
    about: {
        eyebrow: "About",
        title: "I'm Gustavo, a strategist designer.",
        description: "I like to understand the why behind the forms and turn intention into visual language. I work with branding, identity, and creative direction. My approach mixes research, perception, and aesthetics, always paying attention to how a brand breathes day to day. Outside of original projects, I coordinate global creative operations at VML, where I also build the tools that make production scale.",
        quoteLine1: "Good design makes sense before it looks beautiful.",
        quoteLine2: "When it makes sense, the beauty lasts.",
        photoAlt: "Gustavo Hesse, designer",
        index: "02  /  About",
        tags: ["Branding", "Creative direction", "Visual identity", "Creative operations"],
    },
    process: {
        eyebrow: "Process",
        title: "A collaborative journey in three acts to bring your brand to life.",
        description: "Each phase has clear goals, rituals, and deliverables so you take part in the decisions and feel confident putting them into practice.",
        keyDelivery: "Key deliverable",
        index: "04  /  Process",
    },
    testimonials: {
        eyebrow: "Testimonials",
        title: "Projects built on trust and a long-term partnership.",
        description: "Clients who become guardians of the brand and keep seeing consistent results after launch.",
        readMore: "Read more",
        readLess: "Read less",
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
        index: "05  /  Contact",
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
    ops: {
        metaTitle: "Gustavo Hesse — Creative Operations & Automation",
        metaDescription: "I coordinate creative production and build the tools that make it scale. Dell operation at VML, automation, and business intelligence.",
        heroTitle: "Creative Operations & Automation",
        heroSubtitle: "I coordinate creative production and build the tools that make it scale.",
        ctaLinkedin: "See on LinkedIn",
        ctaProjects: "See the work ↓",
        treeHint: "Click to grow",
        treeStages: ["Seed", "Sprout", "Sapling", "Tree"],
        treeMarks: ["Workflow", "Processes", "Creativity"],
        treeStyleOutline: "Outline",
        treeStyleFill: "Filled",
        navCreative: "Creative Operations",
        navContact: "Contact",
        navTestimonials: "Testimonials",
        marquee: [
            "CREATIVE OPERATIONS",
            "PRODUCTION THAT SCALES",
            "WORKFLOW",
            "PROCESSES",
            "CREATIVITY",
            "AUTOMATION",
            "ON-TIME DELIVERY",
            "INTERNAL TOOLS",
            "BRIEF TO ASSET",
            "GLOBAL OPERATIONS",
        ],
        numbersLabel: "Numbers",
        stats: [
            { value: 2300, suffix: "+", label: "jobs coordinated", context: "since Apr 2023" },
            { value: 830, suffix: "", label: "assets in one quarter", context: "Black Friday 2025" },
            { value: 89, suffix: "%", label: "on-time deliveries", context: "in the highest-volume quarter" },
            { value: 2, suffix: " business days", label: "to the first delivery", context: "median across 300+ jobs" },
        ],
        aboutLabel: "About",
        aboutBody: "I started as a designer in a quick-print shop in 2016, moved through art direction, motion, and UI, and today I coordinate Dell's creative operation at VML. That's 10 years of experience in design and operations. I learned to code to fix the bottlenecks I was living through.",
        casesLabel: "Operation cases",
        resultLabel: "Result",
        cases: [
            {
                title: "VML Workfront Manager",
                tag: "Automation · Google Apps Script",
                description: "An internal tool that automates briefing generation and request creation in Workfront, connecting a spreadsheet with Dell's project system.",
                result: "Removed manual steps from the campaign localization flow.",
            },
            {
                title: "Dell Operations B.I.",
                tag: "Business Intelligence · Google Apps Script",
                description: "A dashboard that tracks every job by approval round, separating agency time and client time, across 100% of the operation's jobs.",
                result: "First version delivered in 2 business days (median across 300+ jobs).",
            },
            {
                title: "Touching Colors (Coral × VML)",
                tag: "UI/UX · Accessibility",
                description: "The first non-visual color system, created so blind and low-vision people can explore and choose colors on their own.",
                result: "Cannes Lions 2025 shortlist · Industry Craft",
            },
        ],
        stackLabel: "Stack",
        stack: ["JavaScript", "Google Apps Script", "HTML5", "CSS", "Workfront", "Figma", "Adobe CC", "Generative AI", "Python (basic)"],
        backToBranding: "← See the branding portfolio",
        linkedin: "LinkedIn",
        sectionIndex: "03  /  Operations",
        sectionTitle: "Production that scales.",
    },
}

export const messages: Record<"pt" | "en", Messages> = { pt, en }

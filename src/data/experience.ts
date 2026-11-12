export type ExperienceItem = {
    role: string
    org: string
    when: string
    summary: string
    body: string
}

export type ExperienceCopy = {
    eyebrow: string
    title: string
    description: string
    resume: string
    metaTitle: string
    metaDescription: string
    items: ExperienceItem[]
}

const pt: ExperienceCopy = {
    eyebrow: "Experiência",
    title: "Da gráfica à coordenação de uma operação global.",
    description: "Dez anos entre marca, produção e as ferramentas que fazem a entrega escalar.",
    resume: "Baixar currículo",
    metaTitle: "Gustavo Hesse — Experiência",
    metaDescription: "Dez anos entre marca, produção e as ferramentas que fazem a entrega escalar. Trajetória de Gustavo Hesse, da gráfica à coordenação criativa.",
    items: [
        {
            role: "Coordenador de Projetos",
            org: "VML",
            when: "set. 2025 — agora",
            summary: "Coordeno a localização de campanhas de Social e Banner da Dell para o Brasil, do briefing ao QA final.",
            body: "Coordeno a localização de campanhas de Social e Banner da Dell para o Brasil, do briefing ao QA final, em contato direto com o time da Dell em Miami.\n\nBlack Friday 2025: 168 jobs e 830 assets em um trimestre, com pico de 37 jobs abertos em uma semana e 89% das entregas no prazo.\n\nConstruí o B.I. da operação, que acompanha cada job por round de aprovação e separa tempo de agência e tempo de cliente. Primeira versão entregue em 2 dias úteis (mediana).\n\nAutomatizei a geração de briefings e a abertura de requests a partir de planilha, eliminando etapas manuais do fluxo no Workfront.\n\nFaço o QA técnico e estético das entregas dentro das diretrizes Dell e Alienware, em campanhas com parceiros como Microsoft, Intel e NVIDIA.",
        },
        {
            role: "Senior Visual Designer",
            org: "VML",
            when: "abr. 2023 — set. 2025",
            summary: "Produzi mais de 500 jobs e 3.500 assets para a Dell, entre estáticos, vídeo e banners HTML5.",
            body: "Produzi mais de 500 jobs e 3.500 assets para a Dell: estáticos, vídeo e banners HTML5 para Social, Display e E-mail.\n\nCriei scripts em Google Apps Script que automatizam o desdobramento de banners HTML5.\n\nUI/UX Designer em Cores que Tocam (Coral), shortlist no Cannes Lions 2025 em Industry Craft, com foco em acessibilidade e arquitetura de informação.\n\nMantive as bibliotecas de componentes e assets de Dell e Alienware usadas por todo o time de produção.",
        },
        {
            role: "Co-founder · Produto e marca",
            org: "Floume",
            when: "ago. 2026 — agora · Remoto",
            summary: "Plataforma de multiatendimento para WhatsApp, Instagram e Messenger, sobre a API Oficial da Meta.",
            body: "O Floume é uma plataforma de multiatendimento para WhatsApp, Instagram e Messenger, construída sobre a API Oficial da Meta.\n\nCriado para empresas que perdem venda por demora no atendimento: a IA responde na hora, a equipe inteira atende no mesmo número, e a agenda se preenche sozinha pelo WhatsApp, sem o cliente ver um sistema por trás.\n\nA conexão usa a API Oficial sem desconectar o celular, o agendamento entra no Google Calendar e na agenda do telefone, e um servidor MCP liga Claude e ChatGPT direto à operação. Planos em reais, sem fidelidade, a partir de R$ 69 por mês.",
        },
        {
            role: "Designer de marca e identidade visual",
            org: "Freelance",
            when: "nov. 2016 — agora · Remoto",
            summary: "Identidades visuais e brandbooks para pequenas empresas e marcas pessoais, em paralelo à agência.",
            body: "Crio identidades visuais e brandbooks para pequenas empresas e marcas pessoais, como orçamenta.ai, Beehelp, Elixir e Espresso Estoico, em paralelo à atuação em agência.\n\nDesenvolvo landing pages e pitch decks, conduzindo o projeto direto com o cliente, do briefing à entrega.",
        },
        {
            role: "Senior Visual Designer",
            org: "Charlie",
            when: "mai. 2021 — abr. 2023 · São Paulo",
            summary: "Reestruturei o time de criação e conduzi workshops de front-end e animação para o squad.",
            body: "Reestruturei o time de criação e conduzi workshops de front-end e animação para o squad.\n\nCriei a identidade visual e o motion branding da marca, em uso até hoje.\n\nDesenhei os pitch decks usados nas rodadas de captação com fundos de venture capital.\n\nMontei bibliotecas de templates em HTML/CSS e PowerPoint e fluxos com IA generativa para landing pages e e-mail marketing.",
        },
        {
            role: "Visual Designer",
            org: "Óticas Diniz",
            when: "mar. 2020 — mar. 2021 · Arujá",
            summary: "Unidade visual e desdobramento de campanhas para 17 franquias, direto com os franqueados.",
            body: "Responsável pela unidade visual e pelo desdobramento de campanhas para 17 franquias, direto com os franqueados.\n\nCriei campanhas para digital, social e ponto de venda, em estático e motion.\n\nGerenciei os perfis de Google Business de todas as unidades.",
        },
        {
            role: "Visual Designer",
            org: "Sultan Indústria Têxtil",
            when: "jun. 2019 — mar. 2020 · Itaquaquecetuba",
            summary: "Comunicação visual de 7 marcas do grupo, cada uma com voz e estética próprias.",
            body: "Cuidei da comunicação visual de 7 marcas do grupo, cada uma com voz e estética próprias.\n\nCriei e codifiquei campanhas de e-mail marketing em HTML/CSS no RD Station, com testes A/B.\n\nProduzi vídeos e animações de produto para YouTube e redes sociais.",
        },
        {
            role: "Designer gráfico",
            org: "Tower Gráfica e Informática",
            when: "set. 2017 — jul. 2018 · Arujá",
            summary: "Folhetos, cartões e brindes em CorelDraw, do atendimento à arte final para impressão.",
            body: "Criei folhetos, cartões de visita e brindes personalizados, como canecas e camisetas, em CorelDraw, do atendimento ao cliente até a arte final para impressão.",
        },
    ],
}

const en: ExperienceCopy = {
    eyebrow: "Experience",
    title: "From the print shop to running a global operation.",
    description: "Ten years between brand, production, and the tools that make delivery scale.",
    resume: "Download CV",
    metaTitle: "Gustavo Hesse — Experience",
    metaDescription: "Ten years between brand, production, and the tools that make delivery scale. Gustavo Hesse's path from the print shop to creative operations.",
    items: [
        {
            role: "Project Coordinator",
            org: "VML",
            when: "Sep 2025 — present",
            summary: "I coordinate localization of Dell's Social and Banner campaigns for Brazil, from the brief through final QA.",
            body: "I coordinate localization of Dell's Social and Banner campaigns for Brazil, from the brief through final QA, in direct contact with the Dell team in Miami.\n\nBlack Friday 2025: 168 jobs and 830 assets in one quarter, peaking at 37 open jobs in a week, with 89% delivered on time.\n\nI built the operation's BI, tracking each job by approval round and separating agency time from client time. The first version shipped in 2 business days (median).\n\nI automated briefing generation and request creation from a spreadsheet, removing manual steps from the Workfront flow.\n\nI handle technical and aesthetic QA against Dell and Alienware guidelines, on campaigns with partners such as Microsoft, Intel, and NVIDIA.",
        },
        {
            role: "Senior Visual Designer",
            org: "VML",
            when: "Apr 2023 — Sep 2025",
            summary: "I produced 500+ jobs and 3,500 assets for Dell, across statics, video, and HTML5 banners.",
            body: "I produced 500+ jobs and 3,500 assets for Dell: statics, video, and HTML5 banners for Social, Display, and Email.\n\nI built Google Apps Script tools that automate HTML5 banner resizing.\n\nUI/UX designer on Touching Colors (Coral), shortlisted at Cannes Lions 2025 in Industry Craft, focused on accessibility and information architecture.\n\nI maintained the Dell and Alienware component and asset libraries used by the whole production team.",
        },
        {
            role: "Co-founder · Product and brand",
            org: "Floume",
            when: "Aug 2026 — present · Remote",
            summary: "A shared inbox for WhatsApp, Instagram, and Messenger, built on Meta's Official API.",
            body: "Floume is a shared inbox for WhatsApp, Instagram, and Messenger, built on Meta's Official API.\n\nIt is for companies that lose sales to slow replies: AI answers immediately, the whole team shares one number, and the calendar fills itself over WhatsApp, without the customer seeing a system behind it.\n\nThe connection uses the Official API without unplugging the phone, scheduling lands in Google Calendar and the phone calendar, and an MCP server connects Claude and ChatGPT straight to the operation. Plans in reais, no lock-in, from R$69 a month.",
        },
        {
            role: "Brand and identity designer",
            org: "Freelance",
            when: "Nov 2016 — present · Remote",
            summary: "Visual identities and brand books for small companies and personal brands, alongside agency work.",
            body: "I design visual identities and brand books for small companies and personal brands, including orçamenta.ai, Beehelp, Elixir, and Espresso Estoico, alongside agency work.\n\nI also build landing pages and pitch decks, running the project directly with the client from brief to delivery.",
        },
        {
            role: "Senior Visual Designer",
            org: "Charlie",
            when: "May 2021 — Apr 2023 · São Paulo",
            summary: "I rebuilt the creative team and ran front-end and animation workshops for the squad.",
            body: "I rebuilt the creative team and ran front-end and animation workshops for the squad.\n\nI created the brand identity and motion branding still in use today.\n\nI designed the pitch decks used in venture fundraising rounds.\n\nI built HTML/CSS and PowerPoint template libraries, and generative-AI flows for landing pages and email.",
        },
        {
            role: "Visual Designer",
            org: "Óticas Diniz",
            when: "Mar 2020 — Mar 2021 · Arujá",
            summary: "Visual system and campaign rollout for 17 franchises, working directly with franchisees.",
            body: "I owned the visual system and campaign rollout for 17 franchises, working directly with franchisees.\n\nI created campaigns for digital, social, and point of sale, in static and motion.\n\nI managed the Google Business profiles for every unit.",
        },
        {
            role: "Visual Designer",
            org: "Sultan Indústria Têxtil",
            when: "Jun 2019 — Mar 2020 · Itaquaquecetuba",
            summary: "Visual communication for 7 group brands, each with its own voice and aesthetic.",
            body: "I looked after the visual communication of 7 group brands, each with its own voice and aesthetic.\n\nI designed and coded email campaigns in HTML/CSS on RD Station, with A/B tests.\n\nI produced product videos and animations for YouTube and social.",
        },
        {
            role: "Graphic designer",
            org: "Tower Gráfica e Informática",
            when: "Sep 2017 — Jul 2018 · Arujá",
            summary: "Flyers, cards, and custom gifts in CorelDraw, from the client conversation to print-ready art.",
            body: "I designed flyers, business cards, and custom gifts, such as mugs and t-shirts, in CorelDraw, from the client conversation to print-ready art.",
        },
    ],
}

export const experienceCopy = { pt, en }

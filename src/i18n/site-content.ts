import {
    navigation,
    process,
    projects,
    testimonials,
    type NavigationItem,
    type ProcessStep,
    type Project,
    type Testimonial,
} from "@/data/content"
import type { Locale } from "@/i18n/locale"

export type SiteContent = {
    navigation: NavigationItem[]
    projects: Project[]
    process: ProcessStep[]
    testimonials: Testimonial[]
}

const navigationEn: NavigationItem[] = [
    { label: "Home", href: "#inicio" },
    { label: "Projects", href: "#projetos" },
    { label: "About", href: "#sobre" },
    { label: "Process", href: "#processo" },
    { label: "Testimonials", href: "#depoimentos" },
]

const serviceEn: Record<string, string> = {
    "Identidade Visual": "Visual Identity",
    "Marca Pessoal": "Personal Brand",
}

type ProjectCopy = {
    description: string
    industry: string
    challenge?: string
    solution?: string
}

const projectEn: Record<string, ProjectCopy> = {
    "Dell & Alienware": {
        industry: "Computers and Technology",
        description: "A seaside café with a relaxed look that celebrates sunny mornings and easy conversation.",
    },
    "Charlie": {
        industry: "Hospitality & Tourism",
        description: "A brand that redefined urban hospitality, bringing design, technology, and experience into one ecosystem.",
        challenge: "Build an identity that captured the sophistication of a premium urban hostel, setting it apart from the competition and attracting a cosmopolitan audience.",
        solution: "A visual system between warmth and contemporary design, with a rosé palette, display typography with personality, and architectural iconography.",
    },
    "orçamenta.ai": {
        industry: "SaaS & Hospitality",
        description: "Visual identity and brand system for a startup that automates quotes for hospitality, where technology and precision become visual language.",
        challenge: "Create a brand that translated technical trust and modernity for hotel managers, an audience that lives in numbers but still needs to be reached by aesthetics.",
        solution: "A dual visual system: navy as the pillar of seriousness and authority, lime as the accent of innovation and speed. The isometric cube symbol with the letters OAI reinforces structure, organization, and artificial intelligence. Applied to a billboard, a cap, social media, and a pitch deck, the brand shows that automation can, and should, be beautiful.",
    },
    "Coral": {
        industry: "Paint",
        description: "The Touching Colors campaign, celebrating diversity and the beauty of colors heard as chromopoems.",
    },
    "Jéssica Carvalho - Beehelp": {
        industry: "People Operations & HR",
        description: "An HR platform with a warm, professional identity, focused on connecting talent with the right opportunities.",
    },
    "Elixir": {
        industry: "Human Resources",
        description: "A human resources brand that connects exceptional talent with innovative companies.",
    },
    "Angélica Neiva": {
        industry: "Copywriting & Social Media",
        description: "A guided meditation platform with a serene, enveloping visual identity.",
        challenge: "Create a visual presence that translated Angélica's meditative, welcoming essence, communicating her authority without losing softness.",
        solution: "A serene identity in violet and lavender, with editorial typography and a visual system that keeps content and personal brand consistent.",
    },
    "Adgile": {
        industry: "SaaS & Marketing",
        description: "A creative management platform for agencies and marketing teams, focused on speed and visual intelligence.",
    },
    "Espresso Estoico": {
        industry: "Stoicism & Careers in Games",
        description: "A playful brand that matches Vitória, with a unique take on stoicism and careers in games.",
    },
    "Petcare": {
        industry: "Pets",
        description: "A pitch deck for a pet care startup, designed to highlight the value proposition and attract investors.",
    },
    "All Ways Instituto": {
        industry: "Children's support institute",
        description: "A visual system that turns love into a tool for social change.",
    },
    "Micro Saas - Dell": {
        industry: "Process Automation",
        description: "An automation that makes design project management more fluid, connecting creative teams and clients with efficiency and clarity.",
    },
}

const processEn: Pick<ProcessStep, "title" | "description" | "deliverable">[] = [
    {
        title: "Immersion & Direction",
        description: "A dive into the brand's essence: conversations, visual research, and strategic alignment to define how the creative process will run.",
        deliverable: "Intention map with moodboard",
    },
    {
        title: "Creation & Refinement",
        description: "Visual exploration and application tests to turn concepts into form. Each adjustment brings the brand closer to its most authentic expression.",
        deliverable: "Partial visual system for feedback",
    },
    {
        title: "Activation & Follow-through",
        description: "A guided presentation, support materials, and follow-through on the first communications to keep consistency and clarity.",
        deliverable: "Launch kit + living manual",
    },
]

const quoteEn: Record<string, string> = {
    "Vitória Lopes": "Gus isn't just a designer. He's a psychologist, an artist, an alchemist. Seriously, he catches the essence of your brand and turns it into something clear, practical, and striking. I spent sleepless nights with my design nightmares, and in one conversation with him everything lined up in quality and practicality. I recommend him completely, and I'm already looking forward to working with him again.",
    "Vitor Lostada": "I did two projects with Gustavo. We started with a brand design and then moved on to a landing page. Through the whole process his work was incredible, not only for the results, but for the professionalism he showed at every step. He always sent updates on how the project was going and kept a great relationship.",
    "Angélica Neiva": "Gus had a really good production process with me from the start. The result surprised me and went well beyond what I expected. He was quick, practical, understood what was hard for me, and saw clearly what I needed. Beyond the impeccable visual quality, Gus is sincere and fair. Everything landed on the agreed deadline and matched what my brand needed. Everything he made looks like me, haha. Only praise for this work.",
    "Lola Cirino": "Working with Gus was light from start to finish. He understood exactly what I wanted and had enormous patience with every adjustment. Getting the open files, being able to adapt them, and seeing everything work so well was a huge help. It turned out lovely. I'll think of him whenever I need this again.",
    "Gabriela Costa": "Gustavo's work is simply impeccable. He was very attentive and managed to capture exactly what I wanted my personal brand to say.",
    "Guilherme Farias": "Working with Gus was clear and light at the same time. He listens closely, understands the context before proposing solutions, and delivers with precision. The new identity brought clarity to what I wanted to communicate, and that made all the difference. Besides being an excellent professional, Gus is kind, patient, and genuine. You can tell every project he makes carries intention and care.",
}

function localizeProject(project: Project): Project {
    const copy = projectEn[project.title]
    if (!copy) return project

    return {
        ...project,
        description: copy.description,
        industry: copy.industry,
        details: project.details
            ? {
                ...project.details,
                services: project.details.services?.map((service) => serviceEn[service] ?? service),
                challenge: copy.challenge ?? project.details.challenge,
                solution: copy.solution ?? project.details.solution,
            }
            : undefined,
    }
}

export function getSiteContent(locale: Locale): SiteContent {
    if (locale === "pt") {
        return { navigation, projects, process, testimonials }
    }

    return {
        navigation: navigationEn,
        projects: projects.map(localizeProject),
        process: process.map((step, index) => ({ ...step, ...processEn[index] })),
        testimonials: testimonials.map((item) => ({
            ...item,
            quote: quoteEn[item.name] ?? item.quote,
            company: item.company === "Marca Pessoal" ? "Personal Brand" : item.company,
        })),
    }
}

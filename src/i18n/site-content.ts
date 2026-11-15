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
    { label: "Work", href: "#projetos" },
    { label: "About", href: "#sobre" },
    { label: "Experience", href: "/experiencia" },
    { label: "Operations", href: "#operacao" },
    { label: "Process", href: "#processo" },
]

const serviceEn: Record<string, string> = {
    "Identidade Visual": "Visual Identity",
    "Manual de identidade": "Identity manual",
    "Ilustração": "Illustration",
    "Pitch Deck": "Pitch Deck",
}

type ProjectCopy = {
    description: string
    industry: string
    subtitle?: string
    challenge?: string
    solution?: string
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
    colors?: { name: string; role: string }[]
}

const projectEn: Record<string, ProjectCopy> = {
    "Floume": {
        industry: "SaaS & Customer Support",
        description: "A shared inbox for WhatsApp, Instagram, and Messenger, built on Meta's Official API.",
    },
    "Charlie": {
        industry: "Hospitality & Tourism",
        description: "A brand that redefined urban hospitality, bringing design, technology, and experience into one ecosystem.",
        challenge: "Build an identity that captured the sophistication of a premium urban hostel, setting it apart from the competition and attracting a cosmopolitan audience.",
        solution: "A visual system between warmth and contemporary design, with a rosé palette, display typography with personality, and architectural iconography.",
    },
    "Orçamenta.AI — Identidade Visual": {
        industry: "SaaS & Hospitality",
        description: "Visual identity for Orçamenta.AI, an automation platform that generates instant, standardized quotes for hotels and convention centers. The brand comes from more than three decades in the industry and had to translate that mix of legacy and technology. The result is a technical, mature identity, with a note of freshness that communicates innovation.",
        subtitle: "Precision, control, and legacy for hospitality",
        challenge: "In hospitality, a slow quote is a lost sale. Orçamenta.AI exists to remove commercial bureaucracy, but it was competing with the cold, generic image of yet another AI tool. The brand had to carry the authority of someone from inside the industry and, at the same time, the speed of a new technology: trustworthy for managers, modern for the market.",
        concept: "“Technology should be invisible and efficient.” The identity starts from three pillars: Organization, Accuracy, and Intelligence. They take shape in a three-dimensional symbol, an isometric cube that locks the brand's initials together and stands for structure, solidity, and the box where data becomes a flawless proposal.",
        logo: "The symbol was built from the three pillars. Each face of the cube stands for one of them, and together they form the full signature. A system of mathematical proportions sets the measurements and the clear space, so the brand keeps its strength and clarity in any application. The family includes horizontal and vertical versions, positive and negative, plus monochrome versions for restricted use.",
        typography: "Sora is used for headlines and emphasis, with clean geometry and a strong presence, the forward tone of the AI. Synonym is used for body text and data, with a fluid read and a timeless drawing, the technical stability of the brand. Together they translate what Orçamenta.AI proposes: the speed of the new with the solidity of 32 years of experience.",
        graphics: "Fragments of the symbol become independent graphic shapes that give rhythm and movement to the layouts. Used as large crops or as repeating patterns, they guide the eye and reinforce the brand in dashboards, institutional materials, and communication pieces, always in high contrast.",
        voice: "The brandbook also sets the purpose, the why, the how, and the what, along with the personality and the voice: assertive, mature, and facilitating. Example: “Quotes ready in seconds. No errors, no delays.”",
        showcase: "A billboard, the website and the interface on a laptop, mobile screens, business cards, stationery, a cap, and a tote bag. The pieces carry the brand from digital to physical with the same consistency. The landing page is live at orcamenta.ai.",
        colors: [
            { name: "Abyssal", role: "Maturity, technology, and trust" },
            { name: "Serene", role: "Maturity, technology, and trust" },
            { name: "Bilberry", role: "Maturity, technology, and trust" },
            { name: "Slate", role: "Maturity, technology, and trust" },
            { name: "Matcha", role: "The glow of innovation" },
            { name: "Mint", role: "Energy" },
            { name: "Botanical", role: "Freshness" },
            { name: "Mist", role: "Breathing room" },
            { name: "Dawn", role: "Order in the interfaces" },
        ],
        facts: [
            { label: "Client", value: "Orçamenta.AI" },
            { label: "Year", value: "2025" },
            { label: "Scope", value: "Visual identity, logo, proportion system, palette, typography, supporting elements, applications, brandbook, and landing page" },
            { label: "Design", value: "Gustavo Hesse" },
        ],
    },
    "Coral": {
        industry: "Paint",
        description: "The Touching Colors campaign, celebrating diversity and the beauty of colors heard as chromopoems.",
    },
    "Jessica Carvalho — Identidade Visual": {
        industry: "People Operations & HR",
        description: "Visual identity for Jessica Carvalho, a people-operations consultant. The challenge was to show that the work goes beyond paperwork: it connects people, process, and strategy. The brand joins seriousness and warmth, with a visual language drawn from organization and from the bee as a symbol of working together.",
        subtitle: "A brand for someone who turns people operations into strategy",
        challenge: "People operations is often seen as a technical, cold area, buried in paperwork. Jessica wanted a different position: a strategic partner who handles payroll and documents with precision, and who also understands that people are a company's greatest asset. The identity had to feel trustworthy and close at the same time.",
        concept: "The hive became the central metaphor: every part works in harmony so the whole can thrive, just as an effective people team connects every department. That led to the yellow, the hexagonal patterns, and the bee icons. The visual structure looked to organization tools such as Notion, and to Mailchimp's friendly aesthetic.",
        logo: "The logo combines Hepta Slab and Superpop. The slab carries the classic, balanced side; Superpop adds a relaxed, human touch. That contrast translates the brand's two values: stability and closeness. The family has four color versions, so it can sit on different backgrounds.",
        typography: "Hepta Slab is used for headlines and reinforces seriousness and balance. Sofia Pro is used for body text: it is geometric, readable, and does not compete with the palette's vivid colors.",
        graphics: "Outlined boxes and checkboxes point to organization and control. Light hive patterns sit in the backgrounds without taking over. There is also a custom icon set for the services: people, strategy, calculations, and communication.",
        showcase: "To show the brand in use, the system went onto social posts, presentation slides, a LinkedIn cover, and a business card. All of them follow the boxes, icons, and colors from the guide.",
        facts: [
            { label: "Client", value: "Jessica Carvalho — People operations consulting" },
            { label: "Brand", value: "BeeHelp" },
            { label: "Scope", value: "Logo, palette, typography, graphic elements, iconography, applications, and a pocket guide" },
            { label: "Design", value: "Gustavo Hesse" },
        ],
        colors: [
            { name: "Yellow", role: "Xanthous. Energy and the bee" },
            { name: "Coral", role: "Pace and movement, tied to Jessica's running" },
            { name: "Midnight Green", role: "Solidity and stability" },
            { name: "Gunmetal", role: "Solidity and stability" },
            { name: "Sepia", role: "The ground, the brand's firm base" },
            { name: "Linen", role: "Breathing room and lightness in the backgrounds" },
        ],
    },
    "Elixir": {
        industry: "Human Resources",
        description: "A human resources brand that connects exceptional talent with innovative companies.",
    },
    "Angélica Neiva — Identidade Visual": {
        industry: "Creative writing & Storytelling",
        description: "Visual identity for Angélica Neiva, a writer focused on creative writing, storytelling, and content for Gen Z. The brief was to turn her work into a brand: handmade, singular, human texts, far from stiff and generic communication. The result is a warm, illustrated identity full of personality, built from Angélica herself.",
        subtitle: "Content from people, for people",
        challenge: "The previous identity, with a lilac gradient and thin type, was delicate but generic, and it didn't show who Angélica is. She needed a brand that could stand out in a market full of overly “professional” writing and content produced in bulk by AI, and that could communicate her difference: writing made with sensitivity, concept, and attention to detail.",
        concept: "“Content from people, for people.” If the work is handmade, the brand had to be too. The whole identity starts from an original illustration of Angélica, with a loose, expressive line that becomes a signature, a mascot, and a graphic element. Her personality, from the tattoos to the red hair, the humor, and a certain overthinking, shows up in the details, and the voice is relaxed and direct, like a conversation.",
        logo: "The logo family has versions with and without the illustrated portrait, in horizontal and vertical formats, so it works from a social avatar to the signature on a post. The lettering pairs a firmer weight in the surname with a lighter stroke in the first name, the same balance of seriousness and ease that her writing has.",
        typography: "Parkinsans, in Semibold and Regular, is used for headlines and text: modern, rounded, and accessible. Shantell Sans is the handwritten touch, used in notes and supporting lines, to reinforce the handmade feel.",
        graphics: "Original illustrations of Angélica in different versions, including a rereading of a classic painting with her face. There are also scribbles, stars, hearts, and handwritten notes, an illustrated brain that plays with overthinking, and textures carrying the brand's keywords: handmade, storytelling, stories, gen z, by hand.",
        showcase: "A social cover, feed posts, and carousels in a conversational tone, such as “Tired of stiff writing?” and “Changing your mind feels too good.” The system has four background variations, which give the feed flexibility without losing unity: Off White, Artisan Beige, Darkish, and Very Dark.",
        comparison: "The comparison shows the shift from a generic, ethereal look to a brand with a face, a voice, and a personality of its own.",
        facts: [
            { label: "Client", value: "Angélica Neiva — Creative writing and storytelling" },
            { label: "Year", value: "2025" },
            { label: "Scope", value: "Rebranding, logo, original illustration, palette, typography, graphic elements, social applications, and a pocket guide" },
            { label: "Design and illustration", value: "Gustavo Hesse" },
            { label: "Tools", value: "Illustrator and Photoshop" },
        ],
        colors: [
            { name: "Rustic White", role: "Paper-textured background" },
            { name: "Desert Sand", role: "Craft background" },
            { name: "Rose Tea", role: "Delicacy" },
            { name: "Melon Pink", role: "Affection" },
            { name: "Cardinal Red", role: "Energy and emphasis" },
            { name: "Blood Red", role: "Depth and intensity" },
            { name: "Roasted Coffee", role: "Contrast" },
        ],
    },
    "Adgile": {
        industry: "SaaS & Marketing",
        description: "A creative management platform for agencies and marketing teams, focused on speed and visual intelligence.",
    },
    "Espresso Estoico": {
        industry: "Stoicism & Careers in Games",
        description: "A playful brand that matches Vitória, with a unique take on stoicism and careers in games.",
    },
    "PetCare — Pitch Deck": {
        industry: "Pets",
        description: "Pitch deck for PetCare, a pet health startup that pairs a smart collar with a companion app. The collar tracks activity, temperature, heart rate, and location, and the app brings that together with vet visits, vaccines, exams, and documents. The deck had to turn a technology product into something emotional for pet owners and clear enough to convince investors.",
        subtitle: "Technology that cares, data that protects",
        challenge: "PetCare needed a pitch that turned a technology product into something emotional and easy to understand. For the owner, the pain is finding a health problem too late. For the investor, the question is why this market, and why now.",
        concept: "“Technology that cares, data that protects.” The deck builds the story on that contrast: care for the pet on one side, the precision of the data on the other.",
        pitch: "The deck is built as a story in four acts. Connection: it opens on the emotional side. “Imagine not being greeted by your best friend.” Problem: silent diseases and unexpected costs. “By the time you find out, it may be too late.” The animal health data is shown with academic sources. Solution: the collar and the app, with the features presented on the team's own pets, which makes the product feel real and close. Opportunity: the market, Brazil as the 3rd largest pet market in the world according to Abinpet, a prospecting list of possible partners rather than closed partnerships, and a close on the brand.",
        showcase: "The full pitch deck, the app interface (home, activity, health charts, GPS, calendar, and deworming), the collar mockup, and presentation pieces. The collar mockup and some of the pet photos were generated with artificial intelligence.",
        facts: [
            { label: "Client", value: "PetCare" },
            { label: "Year", value: "2025" },
            { label: "Scope", value: "Pitch deck and product mockups" },
            { label: "Design", value: "Gustavo Hesse" },
        ],
    },
    "All Ways Instituto": {
        industry: "Children's nonprofit",
        description: "Visual identity for All Ways, a nonprofit for children. The brand starts from a simple idea: happiness on every path.",
        concept: "The logo joins two symbols: arrows, for paths and directions, and a smile, which takes the place of the letters “ll”. It reads as a name and an expression at once, easy to recognize and to remember.",
        applications: "The system was tested on Instagram posts and the profile, T-shirts, a lanyard badge, and business cards, always switching between the Linen and Petrol backgrounds and the organic shapes of the symbols.",
        colors: [
            { name: "Welcoming Linen", role: "Light background, simplicity and warmth" },
            { name: "Elegant Petrol", role: "Dark background, sophistication" },
            { name: "Radiant Orange", role: "Main accent of the “ll”" },
            { name: "Cheerful Yellow", role: "Support" },
            { name: "Soft Blue", role: "Support" },
            { name: "Safe Blue", role: "Support" },
            { name: "Hope Green", role: "Support" },
        ],
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
                subtitle: copy.subtitle ?? project.details.subtitle,
                concept: copy.concept ?? project.details.concept,
                applications: copy.applications ?? project.details.applications,
                logo: copy.logo ?? project.details.logo,
                typography: copy.typography ?? project.details.typography,
                graphics: copy.graphics ?? project.details.graphics,
                voice: copy.voice ?? project.details.voice,
                pitch: copy.pitch ?? project.details.pitch,
                showcase: copy.showcase ?? project.details.showcase,
                comparison: copy.comparison ?? project.details.comparison,
                facts: copy.facts ?? project.details.facts,
                colors: project.details.colors?.map((color, index) => ({
                    ...color,
                    name: copy.colors?.[index]?.name ?? color.name,
                    role: copy.colors?.[index]?.role ?? color.role,
                })),
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

export interface MischiefTheme {
  id: string;
  title: string;
  caption: string;
  mood: string;
  accessories: string[];
  environment: string;
  visualStyle: string;
}

export const FAREWELL_THEMES: MischiefTheme[] = [
  {
    id: "campus-queen",
    title: "CAMPUS QUEEN",
    caption: "Walks into class 20 minutes late with iced coffee and zero regrets.",
    mood: "glamorous, confident, stylish, radiant",
    accessories: ["sparkling golden tiara", "designer sunglasses", "fancy iced latte with purple straw", "glitter aura"],
    environment: "luxurious VIP red carpet corridor with paparazzi flashbulbs and velvet ropes",
    visualStyle: "premium colorful 3D caricature art with rich lighting and glossy finish"
  },
  {
    id: "tech-wizard",
    title: "TECH WIZARD",
    caption: "404: Senior not found (probably writing a script to automate attendance).",
    mood: "confident, playful, futuristic, genius",
    accessories: ["holographic mechanical keyboard", "floating glowing syntax code", "cyberpunk neon glasses", "USB magic wand"],
    environment: "stylized high-tech futuristic university computer lab with glowing server racks",
    visualStyle: "vibrant neon cyberpunk cartoon illustration with high-fidelity glow"
  },
  {
    id: "certified-chaos",
    title: "CERTIFIED CHAOS",
    caption: "Never knows what syllabus is being taught, still tops the presentation.",
    mood: "unpredictable, energetic, mischievous, hilarious",
    accessories: ["confetti explosion hat", "energy drink storm in hands", "tangled multi-colored cables", "mischievous grinning emoji pin"],
    environment: "dynamic swirling comic book explosion with floating question marks and lightning bolts",
    visualStyle: "high-energy stylized comic-book cartoon with dramatic action lines"
  },
  {
    id: "caffeine-commander",
    title: "CAFFEINE COMMANDER",
    caption: "Blood type: Espresso positive. Hasn't slept since semester one.",
    mood: "hyper-focused, wide-eyed, unstoppable, heroic",
    accessories: ["bandolier of espresso cups", "giant ceremonial coffee mug", "steam rising in skull shapes", "caffeine molecular structure halo"],
    environment: "cozy apocalyptic artisanal coffee shop with mountains of coffee beans and latte art clouds",
    visualStyle: "rich warm cartoon character art with whimsical coffee smoke dynamics"
  },
  {
    id: "department-don",
    title: "DEPARTMENT DON",
    caption: "Doesn't need an ID card. The department security salutes first.",
    mood: "commanding, legendary, mafia boss charisma, suave",
    accessories: ["gold-trimmed graduation trenchcoat", "fancy vintage fedora", "golden fountain pen cigar", "gold chain with GMU crest"],
    environment: "luxurious mahogany-paneled faculty lounge with cinematic warm spotlight and leather throne",
    visualStyle: "dramatic mafia-inspired caricaturist art with deep shadows and gold highlights"
  },
  {
    id: "gaming-legend",
    title: "GAMING LEGEND",
    caption: "Master in Computer Applications, Grandmaster in late night lobbies.",
    mood: "hyper-competitive, victorious, neon gamer aura",
    accessories: ["RGB glowing headset with cat ears", "golden gaming controller", "floating health bar at 100%", "pixel art trophy"],
    environment: "epic esports championship arena with laser light show and cheering crowd stadium",
    visualStyle: "crisp anime-inspired pop-art caricature with RGB chromatic aberration effects"
  },
  {
    id: "last-minute-legend",
    title: "LAST-MINUTE LEGEND",
    caption: "Started 10-page project report at 11:45 PM. Submitted at 11:59 PM.",
    mood: "thrill-seeker, triumphant, adrenaline-fueled, smirk",
    accessories: ["burning stopwatch", "turbo rocket propulsion backpack", "flying PDF submission papers", "flaming keyboard keys"],
    environment: "mission control countdown room with warning sirens and digital clock frozen at 23:59:59",
    visualStyle: "turbo speed dynamic illustration with motion blur and flame accents"
  },
  {
    id: "future-ceo",
    title: "FUTURE CEO",
    caption: "Already practicing their LinkedIn 'I am humbled to announce' victory speech.",
    mood: "visionary, ambitious, polished, charismatic",
    accessories: ["bespoke Italian tailored blazer", "tablet showing stonks going up to outer space", "golden Forbes 30 Under 30 badge"],
    environment: "glass-walled penthouse boardroom overlooking a futuristic skyline with private helipad",
    visualStyle: "sleek Pixar-like 3D character render with polished corporate aesthetics"
  },
  {
    id: "attendance-ninja",
    title: "ATTENDANCE NINJA",
    caption: "Maintains exactly 75.01% attendance through quantum teleportation.",
    mood: "stealthy, mysterious, calculating, smooth",
    accessories: ["ninja headband with attendance percentage glyph", "smoke bombs shaped like proxy signatures", "shadow cloak"],
    environment: "misty lecture hall hallway stepping out of shadows behind the professor's back",
    visualStyle: "stylized ninja anime-caricature with purple smoke effects"
  },
  {
    id: "assignment-survivor",
    title: "ASSIGNMENT SURVIVOR",
    caption: "Survived 48 lab internals, 12 viva interrogations, and zero merge conflicts.",
    mood: "battle-hardened, proud, triumphant warrior",
    accessories: ["armor crafted from printed spiral bindings", "shield made of certified lab manuals", "victorious glowing flag"],
    environment: "epic fantasy battlefield littered with vanquished stack traces and compiler error flags",
    visualStyle: "heroic fantasy cartoon character style with epic rim lighting"
  },
  {
    id: "department-celebrity",
    title: "DEPARTMENT CELEBRITY",
    caption: "Known by every junior, senior, professor, canteen chef, and campus cat.",
    mood: "dazzling, universally loved, theatrical, glowing",
    accessories: ["golden megaphone", "autograph pen with trailing sparks", "star-shaped halo glasses"],
    environment: "campus amphitheater packed with screaming juniors holding up banner signs",
    visualStyle: "celebrity pop art caricature with sparkles, confetti, and bright stadium illumination"
  },
  {
    id: "alien-exchange-student",
    title: "ALIEN EXCHANGE STUDENT",
    caption: "Calculates time complexity in alien base-12 arithmetic. We suspect they came from Mars.",
    mood: "quirky, extraterrestrial genius, cosmic chill",
    accessories: ["cute neon green antennae", "floating holographic UFO coaster", "intergalactic laser pen"],
    environment: "retro-futuristic flying saucer cockpit hovering over the university campus lawn",
    visualStyle: "quirky sci-fi retro-cartoon with cosmic stars and nebula colors"
  },
  {
    id: "super-senior",
    title: "SUPER SENIOR",
    caption: "Legends say when they graduate, the department will name a lab after them.",
    mood: "mythical, timeless, revered, chill elder god",
    accessories: ["flowing velvet cape with graduation scrolls", "golden chalice of wisdom", "floating vintage textbooks"],
    environment: "ancient Greek temple of Computer Science with marble pillars and eternal flame",
    visualStyle: "mythological stylized caricature with golden celestial aura"
  },
  {
    id: "deadline-destroyer",
    title: "DEADLINE DESTROYER",
    caption: "Deadlines don't scare them. They scare the deadlines.",
    mood: "fierce, unstoppable, superhero confidence",
    accessories: ["cracked stone sledgehammer with 'SUBMIT' written on it", "superhero cape made of Git commit logs"],
    environment: "shattered digital fortress with glowing defeated bug monsters and green pass checks",
    visualStyle: "punchy superhero comic illustration with energetic action lines"
  },
  {
    id: "campus-detective",
    title: "CAMPUS DETECTIVE",
    caption: "Knows who leaked the question bank before the professor even printed it.",
    mood: "observant, cunning, mysterious, stylish",
    accessories: ["houndstooth detective trenchcoat", "magnifying glass revealing hidden Easter eggs", "top-secret case file labeled 'MCA Gossip'"],
    environment: "noir-lit campus library corner with rainy neon reflection on window pane",
    visualStyle: "vintage film-noir cartoon illustration with high-contrast dramatic lighting"
  },
  {
    id: "main-character",
    title: "MAIN CHARACTER",
    caption: "Every college event has background music when they walk into the room.",
    mood: "cinematic, magnetic, effortless main character energy",
    accessories: ["cinematic lens flare aura", "floating anime cherry blossom petals", "designer sunglasses resting on head"],
    environment: "golden-hour university courtyard with sunbeams streaming down dramatically",
    visualStyle: "cinematic anime-inspired 3D rendered caricature with warm sunset lighting"
  },
  {
    id: "four-semester-survivor",
    title: "FOUR-SEMESTER SURVIVOR",
    caption: "Came for the degree, stayed for the canteen maggi, leaving with pure glory.",
    mood: "proud, nostalgic, triumphant, immortal",
    accessories: ["golden survivor medallion", "laurel wreath woven from fiber optic cables", "victory salute"],
    environment: "graduation stage covered in fireworks and ceremonial confetti showers",
    visualStyle: "celebratory heroic illustration with warm festival glow"
  },
  {
    id: "professional-napper",
    title: "PROFESSIONAL NAPPER",
    caption: "Can sleep through 3 continuous theory lectures and wake up just for attendance.",
    mood: "serene, cozy, blissfully unbothered, zen master",
    accessories: ["plush cloud neck pillow", "silken eye mask with cartoon open eyes painted on it", "floating tiny snoring 'Zzz' clouds"],
    environment: "dreamy pastel classroom floating on literal fluffy clouds with sunset vibes",
    visualStyle: "cozy aesthetic cartoon with soft dreamy glow and pastel tones"
  },
  {
    id: "walking-plot-twist",
    title: "WALKING PLOT TWIST",
    caption: "Said 'I didn't study anything bro', ended up with a 9.8 SGPA.",
    mood: "unbelievable, cheeky, smug, delightfully chaotic",
    accessories: ["spinning question mark aura", "deck of trick UNO reverse cards", "smug golden grin"],
    environment: "surrealist MC Escher-style classroom with upside-down staircases and floating books",
    visualStyle: "vibrant pop-surrealism caricature with bright complementary colors"
  },
  {
    id: "corporate-ceo",
    title: "CORPORATE CEO",
    caption: "Already scheduling Zoom calls during final semester lab viva.",
    mood: "executive, sharp, authoritative, billionaire aura",
    accessories: ["platinum smartwatch", "crypto portfolio holographic projection", "ultra-sleek minimalist briefcase"],
    environment: "glass-walled modern tech skyscraper office looking down on Silicon Valley",
    visualStyle: "ultra-modern premium 3D character caricature with metallic sheen"
  },
  {
    id: "canteen-food-critic",
    title: "CANTEEN FOOD CRITIC",
    caption: "Knows the exact hour when the samosas are crispest. Respected by the canteen chief.",
    mood: "gourmet, enthusiastic, joyful, connoisseur",
    accessories: ["golden chef hat", "maggi fork sceptre", "mini spice shakers floating in air"],
    environment: "bustling cheerful university food court with aromatic steam and festive flags",
    visualStyle: "heartwarming colorful cartoon with delicious food aesthetics"
  },
  {
    id: "debugging-diva",
    title: "DEBUGGING DIVA",
    caption: "One look at the terminal and 50 syntax errors fix themselves out of respect.",
    mood: "flawless, fierce, brilliant, unstoppable",
    accessories: ["sparkling chrome bug zapper", "matrix code pattern sunglasses", "diamond-studded keyboard"],
    environment: "sleek command center with green and violet holographic error terminal screens resolving to green",
    visualStyle: "glamorous cyberpunk caricature with radiant luminescence"
  }
];

export const BATCH_DETAILS = {
  batch: "MCA 2ND BATCH • 2024–2026",
  department: "FACULTY OF COMPUTING AND IT",
  university: "GM UNIVERSITY"
};

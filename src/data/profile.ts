// Single source of truth for every piece of copy, link and stat on the page.

export const profile = {
  name: { first: 'NGUYỄN', last: 'MINH TÂN', full: 'Nguyễn Minh Tân' },
  location: 'Da Nang, Vietnam',
  coords: '16.07°N 108.22°E',
  school: 'University of Science and Technology — The University of Danang',
  schoolShort: 'DUT',
  program: 'Talent Engineer Program — Information Technology (Data Science & Artificial Intelligence Orientation)',
  positioning:
    '1st-year student at Da Nang University of Science and Technology (DUT), enrolled in the Talent Engineer Program — Information Technology (Data Science & Artificial Intelligence Orientation). Competitive programmer building production web applications that real people use every day.',
  offTheClock: 'Tactical FPS, chess & long-form anime.',
  roles: ['COMPETITIVE PROGRAMMING', 'DATA & AI ENGINEERING', 'WEB CRAFT'],
  email: 'minhtankaito@gmail.com',
  phone: { display: '033 728 6745', href: 'tel:+84337286745' },
} as const

export const links = {
  github: { label: 'GitHub', href: 'https://github.com/OriGiri1' },
  codeforces: { label: 'Codeforces', href: 'https://codeforces.com/profile/OriGiri' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/minh-tan-nguyen-6961112a4/' },
  facebook: { label: 'Facebook', href: 'https://www.facebook.com/nguyen.minh.tan.238066/' },
  vocabApp: 'https://vocabappp.web.app',
  // TODO: update with exact VocabApp repository URL
  vocabAppSource: 'https://github.com/OriGiri1',
} as const

export type StackGroup = { id: string; title: string; items: { name: string; evidence: string }[] }

/** Tech stack as proof, not scores: each tool is paired with where it was actually used. */
export const stackGroups: StackGroup[] = [
  {
    id: 'systems',
    title: 'Systems & Algorithms',
    items: [
      { name: 'C++', evidence: 'ICPC Vietnam National Round (DUT team) & 25-page STL/algorithm notebook.' },
      { name: 'C & Data Structures', evidence: 'Algorithmic problem-solving on Codeforces/CSES & core CS coursework.' },
    ],
  },
  {
    id: 'web',
    title: 'Frontend & Web',
    items: [
      { name: 'HTML, CSS, Vanilla JS', evidence: 'Shipped VocabApp solo (~500 active users) with zero framework overhead.' },
      { name: 'React, TypeScript, Tailwind CSS, Vite', evidence: 'Built this portfolio & interactive web applications.' },
    ],
  },
  {
    // TODO: customize backend & infra stack
    id: 'backend',
    title: 'Backend & Infrastructure',
    items: [
      { name: 'Firebase / Firestore', evidence: 'Real-time quiz state sync and live user progress backend for VocabApp.' },
      { name: 'NestJS & REST APIs', evidence: 'Modular full-stack CRUD services and typed backend endpoints.' },
      { name: 'Docker & Git', evidence: 'Containerized local development environments and version-controlled workflows.' },
    ],
  },
  {
    id: 'data',
    title: 'Data & AI',
    items: [
      {
        name: 'Python (NumPy, Pandas, Matplotlib)',
        evidence: 'DUT Data Science & AI orientation coursework and AI Olympiad preparation.',
      },
    ],
  },
]

export const vocabApp = {
  title: 'VocabApp',
  url: 'vocabappp.web.app',
  summary:
    'A live English vocabulary testing web app. Students drill word meanings in timed quiz rounds, and their progress syncs through a Firebase backend.',
  detail:
    'Shipped and maintained solo with no framework: hand-written HTML, Vanilla CSS and JavaScript, tuned to load fast on mid-range phones.',
  stack: ['HTML', 'Vanilla CSS', 'JavaScript', 'Firebase'],
  badges: ['~500 ACTIVE USERS', 'FIREBASE BACKEND', 'VANILLA CSS'],
} as const

export type Achievement = {
  id: string
  index: string
  kicker: string
  title: string
  detail: string
  /** Optional big numeral rendered with a count-up. */
  stat?: { value: number; max: number; decimals?: number; suffix?: string }
}

export const achievements: Achievement[] = [
  {
    id: 'icpc',
    index: '01',
    kicker: 'ICPC // DUT TRAINING TEAM',
    title: 'ICPC National Round',
    detail:
      'Qualified for the ICPC Vietnam National Round with the DUT ICPC Training Team. Three people, one keyboard, five hours.',
  },
  {
    id: 'talent',
    index: '02',
    kicker: 'DUT // TALENT ENGINEER',
    title: 'Talent Engineer — Data Science & AI',
    detail:
      '1st-year student at Da Nang University of Science and Technology (DUT), enrolled in the Talent Engineer Program — Information Technology (Data Science & Artificial Intelligence Orientation).',
  },
  {
    id: 'hsg',
    index: '03',
    kicker: 'CITY OLYMPIAD // INFORMATICS',
    title: '2nd Prize, City Informatics Olympiad',
    detail: 'City-level excellent-student competition in Informatics (HSG Tin học).',
  },
  {
    id: 'gdgoc',
    index: '04',
    kicker: 'COMMUNITY // GDGOC',
    title: 'Google Developer Group on Campus — DUT',
    detail: 'Member of the campus developer community.',
  },
  {
    id: 'ielts',
    index: '05',
    kicker: 'ENGLISH // IELTS',
    title: 'IELTS',
    detail: 'Overall band score.',
    stat: { value: 7.5, max: 9, decimals: 1 },
  },
  {
    id: 'thpt',
    index: '06',
    kicker: 'NATIONAL EXAM // THPT',
    title: 'THPT Graduation Exam',
    detail: 'National High School Graduation Exam, block total.',
    stat: { value: 28, max: 30, suffix: '/30' },
  },
]

export type AfkEntry = {
  id: string
  label: string
  code: string
  line: string
  fields: { k: string; v: string }[]
  /** Optional personal fields. Fill these in to have them rendered; empty strings are hidden. */
  personal: { k: string; v: string }[]
}

export const afk: AfkEntry[] = [
  {
    id: 'valorant',
    label: 'Valorant',
    code: 'VAL',
    line: 'Tactical FPS: crosshair discipline, utility timing and fast reads under pressure.',
    fields: [
      { k: 'GENRE', v: 'TACTICAL FPS' },
      { k: 'FORMAT', v: '5V5 // ROUND-BASED' },
      { k: 'TRAINS', v: 'REACTION + COMMS' },
    ],
    personal: [
      { k: 'MAIN', v: '' },
      { k: 'RANK', v: '' },
    ],
  },
  {
    id: 'lol',
    label: 'League of Legends',
    code: 'LOL',
    line: 'A MOBA where macro decisions compound: tempo, vision and win conditions.',
    fields: [
      { k: 'GENRE', v: 'MOBA' },
      { k: 'FORMAT', v: '5V5 // SUMMONER’S RIFT' },
      { k: 'TRAINS', v: 'MACRO + DRAFTING' },
    ],
    personal: [
      { k: 'ROLE', v: '' },
      { k: 'RANK', v: '' },
    ],
  },
  {
    id: 'fc27',
    label: 'FC27',
    code: 'FC',
    line: 'Football sim nights: build-up patterns, pressing triggers and late winners.',
    fields: [
      { k: 'GENRE', v: 'FOOTBALL SIM' },
      { k: 'FORMAT', v: '1V1 // 90 MIN' },
      { k: 'TRAINS', v: 'PATTERN READING' },
    ],
    personal: [
      { k: 'CLUB', v: '' },
      { k: 'MODE', v: '' },
    ],
  },
  {
    id: 'anime',
    label: 'Anime',
    code: 'ANI',
    line: 'Where the off-duty hours go: arcs, soundtracks and the occasional rewatch.',
    fields: [
      { k: 'MEDIUM', v: 'ANIMATION // SERIES' },
      { k: 'SESSION', v: 'EPISODIC' },
      { k: 'TRAINS', v: 'STORY INSTINCT' },
    ],
    personal: [
      { k: 'ALL-TIME', v: '' },
      { k: 'WATCHING', v: '' },
    ],
  },
]

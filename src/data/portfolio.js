/**
 * Single source of truth for every piece of content on the site.
 *
 * The site reads from Supabase when it is configured; whenever it is not
 * (missing env vars, paused project, network failure) the exact same shapes
 * below are used as the fallback so the UI never renders empty.
 */
import heroPortrait from '../assets/hero-portrait.jpeg'

export const profile = {
  name: 'Atharv Gidde',
  firstName: 'ATHARV',
  lastName: 'GIDDE',
  initials: 'AG',
  role: 'Full-Stack Developer · CS Undergraduate',
  tagline:
    'Developing with Purpose | CS Student @ SKN Sinhgad College of Engineering',
  education: 'B.Tech — Computer Science & Engineering',
  college: 'SKN Sinhgad College of Engineering, Pandharpur',
  location: 'Pandharpur, Maharashtra, India',
  status: 'Available for internships & collaborations',
  email: 'giddeatharv2007@gmail.com',
  resumeUrl: '/resume.pdf',
  heroImage: heroPortrait,
  localHeroImage: heroPortrait,
  aboutImage: null,
  techStrip: ['Python', 'C', 'React', 'Django', 'PostgreSQL', 'AWS'],
  socials: {
    linkedin: 'https://www.linkedin.com/in/atharv-gidde-460329381',
    github: 'https://github.com/giddeatharv2007-art',
  },
}

export const navLinks = [
  { index: '01', id: 'home', label: 'Home' },
  { index: '02', id: 'about', label: 'About' },
  { index: '03', id: 'projects', label: 'Projects' },
  { index: '04', id: 'writing', label: 'Writing' },
  { index: '05', id: 'proofs', label: 'Proofs' },
  { index: '06', id: 'contact', label: 'Contact' },
]

export const about = {
  index: '02',
  label: 'About',
  title: 'Engineering with intent, shipped with evidence.',
  paragraphs: [
    'I am Atharv Gidde, a B.Tech Computer Science & Engineering student at SKN Sinhgad College of Engineering, Pandharpur, Maharashtra. I build full-stack systems end to end — from PostgreSQL schemas and Django APIs to React interfaces that stay fast on a 375px screen.',
    'My work sits at the intersection of three interests: AI & Data Science, cloud infrastructure, and practical software that solves a problem somebody actually has. I would rather ship a smaller system that works under real load than a demo that only survives a screenshot.',
    'Right now I am deepening that stack through structured coursework (NPTEL, Cisco, TCS iON), national-level hackathons, and writing — because an engineer who can explain a system clearly can usually also debug it faster.',
  ],
  facts: [
    { label: 'Based in', value: 'Pandharpur, Maharashtra, India' },
    { label: 'Studying', value: 'B.Tech CSE — SKN Sinhgad College of Engineering' },
    { label: 'Focused on', value: 'Full-stack systems · AI & Data Science' },
    { label: 'Currently', value: 'Available for internships & collaborations' },
  ],
}

export const focusAreas = [
  {
    index: '01',
    title: 'Full-Stack Web',
    note: 'React front ends wired to Django/Node services, built for real deployment from day one.',
  },
  {
    index: '02',
    title: 'AI & Data Science',
    note: 'Data preparation, statistical reasoning and applied machine learning — with explainability in mind.',
  },
  {
    index: '03',
    title: 'PostgreSQL & APIs',
    note: 'Relational modelling, row level security and REST APIs that stay predictable under load.',
  },
  {
    index: '04',
    title: 'Cloud & DevOps',
    note: 'AWS fundamentals, deployment pipelines, environment hygiene and observability.',
  },
  {
    index: '05',
    title: 'Embedded / IoT',
    note: 'Arduino and RFID hardware layers, sensor pipelines and physical-to-digital integration.',
  },
  {
    index: '06',
    title: 'Technical Writing',
    note: 'Turning dense systems into published, readable prose for an engineering audience.',
  },
]

export const craft = {
  index: '02',
  label: 'Areas of Craft',
  items: [
    {
      index: '01',
      title: 'Web Engineering',
      summary:
        'Composable React interfaces with deliberate typography, motion and accessibility baked in.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
    },
    {
      index: '02',
      title: 'AI & Data Science',
      summary:
        'From raw datasets to models and insights: cleaning, features, evaluation and honest reporting.',
      tags: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
    },
    {
      index: '03',
      title: 'Backend & Databases',
      summary:
        'Schemas designed before endpoints, with access rules enforced at the database, not the UI.',
      tags: ['Django', 'PostgreSQL', 'REST APIs', 'Supabase'],
    },
    {
      index: '04',
      title: 'Cloud & Tooling',
      summary:
        'Deployable environments, reproducible builds and the tooling that keeps releases boring.',
      tags: ['AWS', 'Git', 'CI/CD', 'Linux'],
    },
    {
      index: '05',
      title: 'Hardware & IoT',
      summary:
        'Microcontroller prototypes that bridge physical sensors into useful, queryable data.',
      tags: ['Arduino', 'C/C++', 'RFID', 'Sensors'],
    },
  ],
}

export const marqueeItems = [
  'Developing with Purpose',
  'Clean Architecture',
  'Scalable Systems',
  'Data-Driven Engineering',
  'Built to Ship',
]

export const projectCategories = ['All', 'Full-Stack', 'IoT / Hardware', 'Web']

export const projects = [
  {
    id: 'p1',
    title: 'EduNexus',
    slug: 'academia-portal',
    category: 'Full-Stack',
    featured: true,
    tagline: 'Smart India Hackathon prototype',
    description:
      'Smart India Hackathon prototype bringing together AI-driven skill mapping, personalized learning, internships & job opportunities, verified profiles and industry–academia collaboration on one platform.',
    stack: ['React', 'Vite', 'Django', 'PostgreSQL'],
    github_url: 'https://github.com/giddeatharv2007-art/academia-portal',
    live_url: null,
    created_at: '2026-03-15T00:00:00Z',
  },
  {
    id: 'p2',
    title: 'NextGen Attendance System',
    slug: 'nextgen-attendance-system',
    category: 'IoT / Hardware',
    featured: false,
    tagline: 'Ideathon 2k26 build',
    description:
      'Automated RFID attendance management system built with Arduino microcontrollers, MFRC522 RFID modules, LEDs and active buzzers for Ideathon 2k26.',
    stack: ['Arduino', 'C/C++', 'MFRC522 RFID', 'Hardware'],
    github_url: null,
    live_url: null,
    localImage: null,
    created_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'p3',
    title: 'Editorial Developer Portfolio',
    slug: 'editorial-developer-portfolio',
    category: 'Web',
    featured: false,
    tagline: 'This site',
    description:
      'Dark editorial portfolio featuring GSAP scroll choreography, Lenis smooth scroll, sleep-proof Supabase PostgreSQL integration and Vercel Analytics.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
    github_url: 'https://github.com/giddeatharv2007-art',
    live_url: null,
    created_at: '2026-01-10T00:00:00Z',
  },
]

/** Simulated walkthrough scenes used by the 15-second demo player. */
export const demoScenes = {
  'academia-portal': [
    {
      key: 'skill-map',
      label: 'Student Skill Map',
      caption:
        'Every learner profile is scored against role requirements, so gaps are visible instead of guessed.',
      metrics: [
        { name: 'Python', value: 82 },
        { name: 'React', value: 68 },
        { name: 'SQL', value: 74 },
        { name: 'System Design', value: 41 },
      ],
    },
    {
      key: 'learning-path',
      label: 'Personalized Learning Path',
      caption:
        'Gaps convert into an ordered path — courses, projects and checkpoints generated from the skill map.',
      steps: [
        'Foundations of Relational Modelling',
        'Django REST — serializers & auth',
        'Capstone: verified profile service',
      ],
    },
    {
      key: 'industry-portal',
      label: 'Industry–Academia Portal',
      caption:
        'Verified profiles meet verified openings: internships, jobs and sponsored problem statements.',
      cards: [
        { title: 'Verified Profile', meta: 'Faculty-endorsed' },
        { title: 'Internship Match', meta: '92% fit score' },
        { title: 'Industry Brief', meta: 'Sponsored problem' },
      ],
    },
  ],
}

export const writing = {
  index: '04',
  label: 'Published Writing',
  article: {
    title: 'The Expanding World of Data Science',
    publication: 'TECHNOVA 2026 – Vol. 2',
    publisher:
      'Department of Computer Engineering, SKN Sinhgad College of Engineering',
    byline: 'Authored as SY-CSE',
    excerpt:
      'A structured survey of data science — from core concepts and ML techniques through statistical foundations, real-world applications, tooling and ethics, to edge computing, real-time analytics, AutoML and Explainable AI.',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'Data has become one of the most valuable resources of the modern economy, and data science is the discipline that turns that raw resource into decisions. Where traditional analytics stopped at describing what already happened, data science closes the loop: it predicts what is likely to happen next and recommends what should be done about it.',
          'The field draws simultaneously on statistics, computer science and domain expertise. That combination is exactly why it is expanding so quickly — and why it resists being reduced to a single tool or technique.',
        ],
      },
      {
        heading: 'Core Concepts of Data Science',
        paragraphs: [
          'At its core, data science is a pipeline rather than a single act. Data is collected from structured sources such as relational databases and unstructured sources such as text, images and sensor streams, then cleaned, transformed and explored before any modelling begins.',
          'Exploratory analysis is where most of the real insight is produced: distributions, correlations, outliers and missingness usually reveal more than a sophisticated model applied to misunderstood data. Feature engineering follows, translating raw attributes into signals a model can actually use.',
        ],
        bullets: [
          'Data collection and integration from heterogeneous sources',
          'Cleaning, normalization and handling of missing values',
          'Exploratory data analysis and visualization',
          'Feature engineering and selection',
          'Model training, validation and evaluation',
          'Deployment, monitoring and iteration',
        ],
      },
      {
        heading: 'Machine Learning and AI Techniques',
        paragraphs: [
          'Machine learning supplies the algorithms that let systems improve from experience rather than from explicitly coded rules. The three dominant paradigms are supervised learning, which learns from labelled examples; unsupervised learning, which discovers structure in unlabelled data; and reinforcement learning, which optimizes behaviour through interaction and reward.',
          'Supervised methods such as linear and logistic regression, decision trees, random forests and gradient boosting remain the workhorses of industry because they are interpretable and reliable. Unsupervised methods including clustering, dimensionality reduction and association rule mining are used for segmentation, anomaly detection and compression of high-dimensional data.',
          'Deep learning extends these ideas with neural architectures capable of learning hierarchical representations — convolutional networks for images, recurrent and transformer models for sequences, and large language models for text. Natural language processing and data mining apply these foundations to human language and to the discovery of non-obvious patterns in large datasets respectively.',
        ],
      },
      {
        heading: 'Statistical and Mathematical Methods',
        paragraphs: [
          'Statistics remains the backbone of the discipline. Probability theory quantifies uncertainty; descriptive statistics summarize it; inferential statistics — hypothesis testing, confidence intervals and p-values — allow conclusions to be drawn from samples and generalized with a stated degree of confidence.',
          'Linear algebra and calculus make learning possible at scale: matrices represent data and parameters, while gradients drive optimization. Bayesian reasoning allows prior knowledge to be updated as evidence arrives, which is particularly valuable in domains where data is scarce.',
        ],
        bullets: [
          'Probability distributions and random variables',
          'Hypothesis testing, confidence intervals and significance',
          'Regression and correlation analysis',
          'Linear algebra for representation and transformation',
          'Optimization and gradient-based learning',
          'Bayesian inference and uncertainty quantification',
        ],
      },
      {
        heading: 'Applications of Data Science',
        paragraphs: [
          'The practical reach of data science is broad because almost every domain now generates data faster than humans can interpret it unaided.',
          'In healthcare, predictive analytics supports early risk detection and hospital resource planning, while genomics applies statistical and machine learning methods to sequence data at a scale that manual analysis could never reach. In finance, algorithmic trading executes strategies in milliseconds and fraud detection models flag anomalous transactions in real time, protecting both institutions and customers.',
          'In retail, customer segmentation and recommendation systems convert browsing behaviour into relevance, reducing decision fatigue and improving conversion. In precision agriculture, data from IoT soil sensors combined with satellite imagery guides irrigation, fertilization and yield forecasting at field level — improving output while reducing waste.',
        ],
        bullets: [
          'Healthcare — predictive analytics, diagnostics and genomics',
          'Finance — algorithmic trading and fraud detection',
          'Retail — customer segmentation and recommendation engines',
          'Agriculture — IoT soil sensors and satellite imagery for precision farming',
        ],
      },
      {
        heading: 'Skills, Tools and Ethics',
        paragraphs: [
          'Practitioners work primarily in Python and R for modelling, SQL for data retrieval, and distributed engines such as Hadoop and Spark when datasets outgrow a single machine. Visualization and reporting are typically handled through Tableau and Power BI, which translate analytical output into something a decision maker can act on.',
          'Ethics is not an optional appendix to this toolchain. Data privacy requires that personal information be collected lawfully, minimized and protected. Algorithmic bias can be inherited from historical data and then amplified at scale, so fairness must be measured rather than assumed. Transparency and explainability matter because a model that cannot be interrogated cannot be responsibly deployed in decisions that affect people.',
        ],
      },
      {
        heading: 'Future of Data Science',
        paragraphs: [
          'The next phase of the field is being shaped by where computation happens and how much of the pipeline can be automated. Edge computing moves inference closer to the data source, reducing latency and bandwidth while keeping sensitive data local — a natural fit for IoT and industrial deployments.',
          'Real-time analytics is replacing batch-only reporting, enabling systems that respond within the window in which a decision still matters. Automated Machine Learning (AutoML) is compressing the model-selection and tuning work that previously demanded specialist effort, letting domain experts build competent baselines themselves.',
          'Explainable AI (XAI) is evolving in parallel, focused on making complex models — particularly deep networks — interpretable enough to be trusted, audited and, where necessary, challenged.',
        ],
      },
      {
        heading: 'Summary',
        paragraphs: [
          'Data science is not a single technology but a discipline that connects statistics, software engineering and domain knowledge into a working pipeline from raw data to dependable decisions. Its techniques have already restructured healthcare, finance, retail and agriculture, and its frontier is moving steadily toward the edge, toward real time, and toward automation with accountability.',
          'For students entering the field, the durable advantage is not familiarity with one library. It is the ability to reason about data carefully, build systems end to end, and remain honest about the limits of what a model can claim.',
        ],
      },
    ],
  },
}

export const journey = {
  index: '05',
  label: 'Academic Journey, Hackathons & Verified Proofs',
  phases: [
    {
      phase: 'Phase I',
      kicker: 'Undergraduate',
      title: 'B.Tech — Computer Science & Engineering',
      org: 'SKN Sinhgad College of Engineering, Pandharpur',
      note: 'Core coursework in data structures, databases, operating systems, computer networks and software engineering, supported by self-directed full-stack and data science work.',
    },
  ],
  hackathons: [
    {
      badge: 'Hackathon Highlight',
      title: 'Sinhgad Hackathon 2026 (National Level)',
      award: 'Certificate of Participation',
      org: 'Organized by ACSES & Dept. of CSE, SKN Sinhgad College of Engineering, Korti, Pandharpur',
      date: 'March 13–14, 2026',
    },
  ],
  proofs: [
    {
      index: '01',
      title: 'Python for Data Science (Elite)',
      issuer: 'IIT Madras — NPTEL',
      date: 'Jul – Aug 2026',
      highlight: 'Elite · 63%',
      details: [
        '4-week course, 2 credits recommended',
        'Consolidated score: 63%',
        'Online Assignments: 22.67 / 25',
        'Proctored Exam: 39.75 / 75',
        'Among 16,840 certified candidates',
        'Roll No: NPTEL26CS107S165100006',
      ],
    },
    {
      index: '02',
      title: '100 Days of Code™: The Complete Python Pro Bootcamp',
      issuer: 'Udemy — Dr. Angela Yu',
      date: 'Completed June 21, 2026',
      highlight: '57 total hours',
      details: [
        'Complete Python Pro Bootcamp curriculum',
        '57 total hours of structured instruction',
        'Completed June 21, 2026',
      ],
    },
    {
      index: '03',
      title: 'Introduction to Data Science',
      issuer: 'Cisco Networking Academy',
      date: 'Student-level credential',
      highlight: 'Credential earned',
      details: [
        'Data analytics fundamentals',
        'The role of data in AI & Machine Learning',
        'Data Analytics career pathways',
      ],
    },
    {
      index: '04',
      title: 'TCS iON Career Edge — Young Professional',
      issuer: 'Tata Consultancy Services',
      date: 'Apr 20 – May 4, 2026',
      highlight: 'Career readiness',
      details: [
        'Communication Skills',
        'Thinking Skills',
        'Problem-Solving Mindset',
        'IT Foundational Skills',
        'Overview of AI',
      ],
    },
  ],
}

export const contact = {
  index: '06',
  label: 'Contact',
  title: 'Let’s build something worth shipping.',
  blurb:
    'Internships, collaborations, or a product idea you want pressure-tested — the fastest way to reach me is email.',
  topics: ['Build a product', 'Project idea', 'Internship / Role', 'Just say hello'],
}

export const resume = {
  summary:
    'B.Tech Computer Science & Engineering undergraduate building full-stack systems with React, Django and PostgreSQL, with applied AI/Data Science grounding and hands-on embedded/IoT prototyping.',
  skills: [
    'Python',
    'C',
    'JavaScript',
    'React',
    'Django',
    'PostgreSQL',
    'Tailwind CSS',
    'REST APIs',
    'Git',
    'AWS',
    'Arduino / C++',
  ],
  highlights: [
    'EduNexus — Smart India Hackathon prototype unifying AI skill mapping, personalized learning and industry–academia opportunity matching.',
    'NextGen Attendance System — RFID + Arduino attendance automation built for Ideathon 2k26.',
    'Published technical article: “The Expanding World of Data Science”, TECHNOVA 2026 – Vol. 2.',
    'NPTEL Elite certification (IIT Madras) — Python for Data Science; Cisco and TCS iON credentials.',
  ],
}

export const footer = {
  note: 'Available for internships & collaborations',
  copyright: '© 2026 Atharv Gidde',
}

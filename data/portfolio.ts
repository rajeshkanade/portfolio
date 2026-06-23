import type { PortfolioData } from '@/types'

/**
 * Single source of truth for all site content, extracted from Rajesh Kanade's
 * résumé. Edit here to update the entire site — every component reads from this.
 */
export const portfolio: PortfolioData = {
  profile: {
    name: 'Rajesh Kanade',
    title: 'Generative AI Engineer · Full Stack Developer',
    tagline:
      'I design, build, and ship production-grade LLM applications, RAG pipelines, and agentic AI systems.',
    location: 'Pune, India',
    email: 'rajeshkanade121@gmail.com',
    phone: '+91 7385028130',
    photo: '/profile.png',
    resumeUrl: '/resume.pdf',
    bio: [
      'Generative AI Engineer with 1+ year of production experience designing, developing, and deploying LLM applications, RAG pipelines, and agentic AI systems. I work fluently across LangChain, LangGraph, and LlamaIndex, paired with the OpenAI, Anthropic, and Gemini APIs and Docker-based FastAPI microservices.',
      'My focus is reliability: prompt engineering and versioning, structured outputs with Pydantic and JSON Schema, semantic and hybrid search over vector databases, fine-tuning with LoRA/QLoRA, and rigorous LLM evaluation and observability with DeepEval, Ragas, LangSmith, and LangFuse — backed by a co-authored BERT-based NLP research paper.',
    ],
  },

  github: {
    username: 'rajeshkanade',
    // Hidden from the live grid: the profile README repo and this portfolio repo.
    excludeRepos: ['rajeshkanade', 'portfolio'],
  },

  socials: [
    { label: 'GitHub', href: 'https://github.com/rajeshkanade', icon: 'Github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajesh-kanade', icon: 'Linkedin' },
    { label: 'Email', href: 'mailto:rajeshkanade121@gmail.com', icon: 'Mail' },
    { label: 'Phone', href: 'tel:+917385028130', icon: 'Phone' },
  ],

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#research' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],

  stats: [
    { value: 1, suffix: '+', label: 'Years Building GenAI' },
    { value: 3, suffix: '+', label: 'Production AI Projects' },
    { value: 40, suffix: '+', label: 'AI Tools & Frameworks' },
    { value: 30, suffix: '%', label: 'Fewer LLM Hallucinations' },
  ],

  experience: [
    {
      role: 'Generative AI Engineer / Full Stack Developer',
      company: 'Studium Tech Pvt. Ltd.',
      location: 'Pune',
      period: 'June 2025 – Present',
      current: true,
      highlights: [
        'Designed and deployed production-grade LLM pipelines using LangChain, RAG, and OpenAI/Gemini APIs integrated into enterprise SaaS workflows serving thousands of users.',
        'Built agentic AI workflows with LangChain tool-calling and agent loops for multi-step reasoning and dynamic document search — aligned to AutoGen/CrewAI patterns.',
        'Implemented RAG architectures (chunking → embedding → vector store → retrieval) with ChromaDB, achieving sub-2s query response time and ~40% improvement in answer relevance.',
        'Engineered prompt versioning and structured output strategies (Pydantic, JSON Schema) to reduce LLM hallucinations ~30% and standardize downstream parsing.',
        'Built scalable async FastAPI and Node.js microservices for AI/LLM API integration into multi-tenant SaaS systems with JWT auth, RBAC, and Docker containerization.',
        'Integrated LangSmith and LangFuse for LLM observability, token/cost tracking, and pipeline debugging; collaborated in Agile/Scrum teams with CI/CD pipelines (GitHub Actions) and Git version control.',
      ],
    },
    {
      role: 'AI Training Data Annotator',
      company: 'Innodata Inc.',
      location: 'Freelance · Remote',
      period: 'Dec 2025 – Present',
      current: true,
      summary: 'RLHF Annotation · Prompt Engineering · Multimodal Data · LLM Alignment',
      highlights: [
        'Contributed to multimodal AI model training pipelines via structured data annotation, including image inpainting prompt generation for diffusion model fine-tuning.',
        'Performed RLHF preference annotation — evaluated and ranked model-generated response pairs across accuracy, helpfulness, and safety to support LLM alignment workflows.',
        'Authored precise image reconstruction and object-removal prompts, and extracted visual pattern prompts from clothing/texture images to support dataset diversity for generative models.',
      ],
    },
  ],

  skills: [
    {
      title: 'GenAI / LLMs',
      icon: 'Brain',
      skills: [
        'LangChain',
        'LangGraph',
        'LlamaIndex',
        'OpenAI API',
        'Anthropic API',
        'Gemini API',
        'Azure OpenAI',
        'Hugging Face',
        'Ollama',
        'Prompt Engineering',
        'Prompt Versioning',
        'Structured Output (Pydantic, JSON Schema)',
        'Function Calling',
        'Tool Use',
        'Agentic Workflows',
      ],
    },
    {
      title: 'RAG & Vector DBs',
      icon: 'Database',
      skills: [
        'RAG Pipeline Design',
        'Chunking',
        'Embeddings',
        'Semantic Search',
        'BM25 Hybrid Search',
        'Re-ranking',
        'FAISS',
        'ChromaDB',
        'Pinecone',
        'pgvector',
        'Weaviate',
      ],
    },
    {
      title: 'Agentic Frameworks',
      icon: 'Workflow',
      skills: [
        'LangChain Agents',
        'LangGraph (StateGraph)',
        'Conditional Edges',
        'Tool Nodes',
        'Checkpointing',
        'Human-in-the-Loop',
        'AutoGen',
        'CrewAI',
        'MCP Server/Client',
        'Supervisor Patterns',
        'Multi-Agent Orchestration',
      ],
    },
    {
      title: 'Fine-Tuning',
      icon: 'SlidersHorizontal',
      skills: [
        'LoRA',
        'QLoRA',
        'Hugging Face PEFT',
        'SFT (Supervised Fine-Tuning)',
        'Instruction Tuning',
        'Transformer Internals',
      ],
    },
    {
      title: 'Evaluation & Guardrails',
      icon: 'ShieldCheck',
      skills: [
        'DeepEval',
        'Ragas',
        'LangSmith',
        'LangFuse',
        'Guardrails AI',
        'NeMo Guardrails',
        'Custom Validators',
        'Token & Cost Observability',
      ],
    },
    {
      title: 'Backend & APIs',
      icon: 'Server',
      skills: [
        'Python',
        'FastAPI (Async)',
        'Node.js',
        'Fastify',
        'REST APIs',
        'gRPC',
        'Microservices',
        'JWT Authentication',
        'RBAC',
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'Cloud',
      skills: [
        'Docker',
        'AWS S3',
        'Azure Services',
        'GCP Services',
        'Git',
        'GitHub Actions',
        'GitOps/FluxCD',
        'CI/CD',
        'PM2',
      ],
    },
    {
      title: 'Databases',
      icon: 'HardDrive',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis (Caching, Pub/Sub)'],
    },
    {
      title: 'Frontend',
      icon: 'LayoutDashboard',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Material UI', 'Tailwind CSS', 'Streamlit'],
    },
    {
      title: 'Domain',
      icon: 'Boxes',
      skills: [
        'Domain-Driven Design (DDD)',
        'Multi-tenant SaaS',
        'NBA/NAAC Accreditation Systems',
        'Enterprise Integrations (Jira, GitHub)',
      ],
    },
  ],

  projects: [
    {
      title: 'AI Web Page Assistant & Video Explainer',
      kind: 'Chrome Extension · PageMind',
      stack: [
        'Python',
        'LangChain',
        'LangGraph',
        'OpenAI API',
        'FastAPI',
        'ChromaDB',
        'React.js',
        'Pydantic',
      ],
      link: 'https://github.com/rajeshkanade/pagemind',
      highlights: [
        'Designed an end-to-end RAG pipeline with ChromaDB for webpage/video transcript ingestion, improving answer relevance ~40% vs. direct LLM calls.',
        'Applied prompt versioning and Pydantic-enforced structured output, reducing hallucinations ~30% and enabling reliable downstream parsing.',
        'Integrated the OpenAI API for real-time summarization, contextual Q&A, and multi-modal content analysis (text + video transcripts).',
        'Added LangSmith tracing for observability — token-usage dashboards and latency profiling across agent steps.',
      ],
    },
    {
      title: 'Multi-Modal Document Intelligence Platform',
      kind: 'Enterprise Document AI',
      stack: [
        'Python',
        'LangChain',
        'LlamaIndex',
        'AutoGen',
        'OpenAI API',
        'FastAPI',
        'ChromaDB',
        'Redis',
        'Docker',
        'Streamlit',
      ],
      link: 'https://github.com/rajeshkanade/doc-intelligence',
      highlights: [
        'Implemented hybrid search (semantic + BM25 + re-ranking) over ChromaDB with Redis caching, reducing query latency ~45% at enterprise scale.',
        'Built an agentic reasoning loop (AutoGen-style) for multi-document cross-referencing and intelligent summarization across 100+ page documents; containerized the full stack with Docker.',
        'Implemented RBAC-secured document access with Guardrails AI validators and a Streamlit UI for real-time querying.',
        'Integrated DeepEval for automated RAG evaluation — achieving a 0.87 faithfulness score with precision/recall scoring.',
      ],
    },
    {
      title: 'Accreditation Insight Generator',
      kind: 'LangGraph Agentic Pipeline',
      stack: [
        'Python',
        'LangGraph',
        'LangChain',
        'OpenAI API',
        'FastAPI',
        'PostgreSQL',
        'MongoDB',
        'Pydantic',
      ],
      link: 'https://github.com/rajeshkanade/accreditation-ai',
      highlights: [
        'Architected a multi-node LangGraph StateGraph pipeline with conditional edges — a Planner agent breaks an NBA/NAAC SAR into C1–C7 criteria, sub-agents process each in parallel, and a Critic node validates compliance before final report generation.',
        'Built an LLM-driven gap-analysis system over structured institutional data (CO-PO mappings, CAY/CAYm1/CAYm2 metrics), improving reporting efficiency ~70% and cutting manual analysis time ~60%.',
        'Implemented a human-in-the-loop approval node (interrupt_before) and LangGraph MemorySaver checkpointing for stateful multi-session workflows, with Pydantic schemas for consistent JSON output to a React UI.',
        'Integrated PostgreSQL and MongoDB via custom MCP-style tool connectors in LangChain, enabling real-time institutional data queries within agent steps.',
      ],
    },
  ],

  research: [
    {
      title: 'BERT-Based Fake News Detection Using NLP',
      venue: 'Co-authored under Prof. Kalpana Joshi · Fergusson College (Autonomous), Pune',
      description:
        'Applied a BERT transformer for fake news classification, achieving high accuracy on benchmark datasets through fine-tuned contextual language understanding.',
      tags: ['BERT', 'Transformers', 'NLP', 'Text Classification', 'PyTorch'],
      year: '2025',
    },
  ],

  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Fergusson College, Pune University',
      score: 'CGPA: 9.10',
      period: '2024 – 2026',
    },
    {
      degree: 'Bachelor of Science (Computer Science)',
      institution: 'Savitribai Phule Pune University',
      score: 'CGPA: 8.87',
      period: '2021 – 2024',
    },
  ],

  certifications: [
    { name: 'LangChain for LLM Application Development', issuer: 'DeepLearning.AI' },
    { name: 'Building Systems with the ChatGPT API', issuer: 'DeepLearning.AI' },
    { name: 'Python Developer', issuer: 'Udemy' },
    { name: 'JavaScript (Intermediate)', issuer: 'HackerRank' },
  ],

  languages: [
    { name: 'English', proficiency: 'Professional' },
    { name: 'Hindi', proficiency: 'Native' },
    { name: 'Marathi', proficiency: 'Native' },
  ],
}

export default portfolio

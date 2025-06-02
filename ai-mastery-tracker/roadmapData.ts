
import { RoadmapStructure, RoadmapItemType } from './types';

// Helper to define item types more easily
const T = {
  SKILL: 'Skill' as RoadmapItemType,
  AI_BASICS: 'AI Basics' as RoadmapItemType,
  SOFT_SKILLS: 'Soft Skills' as RoadmapItemType,
  RESOURCE: 'Resource' as RoadmapItemType,
  PROJECT: 'Project' as RoadmapItemType,
  BRANDING: 'Branding' as RoadmapItemType,
  EVIL_EDGE: 'EvilEdge' as RoadmapItemType,
  MILESTONE: 'Milestone' as RoadmapItemType,
  NLP: 'NLP' as RoadmapItemType,
  SYSTEM_DESIGN: 'System Design' as RoadmapItemType,
  RAG: 'RAG' as RoadmapItemType,
  MLOPS: 'MLOps' as RoadmapItemType,
  AGENTIC_AI: 'Agentic AI' as RoadmapItemType,
  MCP: 'MCP' as RoadmapItemType,
  INTERVIEW_PREP: 'Interview Prep' as RoadmapItemType,
  DELIVERABLES: 'Deliverables' as RoadmapItemType,
};


export const NEW_ROADMAP_DATA: RoadmapStructure = [
  {
    id: "phase1",
    title: "Phase 1: Foundations (June–Aug 2025)",
    objective: "Master core programming and intro AI.",
    categories: [
      {
        id: "p1c1", title: "Skills", items: [
          { id: "p1c1i1", text: "Programming", subText: "Python (Pandas, FastAPI), JavaScript (React, Node.js), SQL, C++ (optimization).", type: T.SKILL, xp: 50 },
          { id: "p1c1i2", text: "AI Basics", subText: "Algorithms, data structures, basic ML (regression, classification).", type: T.AI_BASICS, xp: 50 },
          { id: "p1c1i3", text: "Soft Skills", subText: "Problem-solving, time management.", type: T.SOFT_SKILLS, xp: 30 },
        ]
      },
      {
        id: "p1c2", title: "Resources", items: [
          { id: "p1c2i1", text: "MIT 6.0001 (OpenCourseWare)", subText: "Python, algorithms, data structures.", type: T.RESOURCE, xp: 20, url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" },
          { id: "p1c2i2", text: "FreeCodeCamp (Full Curriculum)", subText: "Python, JavaScript, SQL. 10 projects (e.g., REST API).", type: T.RESOURCE, xp: 30, url: "https://www.freecodecamp.org/" },
          { id: "p1c2i3", text: "CS50 (Harvard, YouTube)", subText: "C, Python, SQL fundamentals.", type: T.RESOURCE, xp: 30, url: "https://www.youtube.com/c/cs50" },
          { id: "p1c2i4", text: "Coursera's Learning How to Learn (audit free)", subText: "Critical thinking, study hacks.", type: T.RESOURCE, xp: 15, url: "https://www.coursera.org/learn/learning-how-to-learn" },
        ]
      },
      {
        id: "p1c3", title: "Projects", items: [
          { id: "p1c3i1", text: "Python: Data analysis dashboard", subText: "Pandas, FastAPI, AWS.", type: T.PROJECT, xp: 70 },
          { id: "p1c3i2", text: "JavaScript: IoT web app", subText: "React, Node.js.", type: T.PROJECT, xp: 60 },
          { id: "p1c3i3", text: "SQL: Healthcare database", subText: "PostgreSQL, API integration.", type: T.PROJECT, xp: 60 },
        ]
      },
      {
        id: "p1c4", title: "Branding", items: [
          { id: "p1c4i1", text: "Create GitHub/LinkedIn/X profiles.", type: T.BRANDING, xp: 20 },
          { id: "p1c4i2", text: "Share 5 X posts on Python progress (tag @MITOCW).", type: T.BRANDING, xp: 25 },
          { id: "p1c4i3", text: "Join 2 online hackathons (HackerRank, Devpost).", type: T.BRANDING, xp: 40 },
        ]
      },
      {
        id: "p1c5", title: "Evil Edge", items: [
          { id: "p1c5i1", text: "Scrape LinkedIn for MIT/Stanford alumni at Google/Anthropic (50 connections).", type: T.EVIL_EDGE, xp: 30 },
          { id: "p1c5i2", text: "Outdo peers' GitHub projects with cleaner code, 3D visuals (Three.js).", type: T.EVIL_EDGE, xp: 35 },
        ]
      }
    ]
  },
  {
    id: "phase2",
    title: "Phase 2: NLP and System Design (Sep–Nov 2025)",
    objective: "Master NLP and system design for FAANG readiness.",
    categories: [
      {
        id: "p2c1", title: "Skills", items: [
          { id: "p2c1i1", text: "NLP", subText: "Text preprocessing, transformers (BERT, GPT), sentiment analysis, question-answering.", type: T.NLP, xp: 60 },
          { id: "p2c1i2", text: "System Design", subText: "Microservices, API design, scalability.", type: T.SYSTEM_DESIGN, xp: 50 },
          { id: "p2c1i3", text: "Soft Skills", subText: "Communication, teamwork.", type: T.SOFT_SKILLS, xp: 30 },
        ]
      },
      {
        id: "p2c2", title: "Resources", items: [
          { id: "p2c2i1", text: "Stanford CS224N (YouTube)", subText: "Deep learning for NLP (transformers, BERT).", type: T.RESOURCE, xp: 30, url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z" },
          { id: "p2c2i2", text: "DeepLearning.AI NLP Specialization (Coursera, audit free)", subText: "Practical NLP with TensorFlow, Hugging Face.", type: T.RESOURCE, xp: 40, url: "https://www.deeplearning.ai/courses/natural-language-processing-specialization/" },
          { id: "p2c2i3", text: "Hugging Face Course (GitHub)", subText: "Transformers, tokenization.", type: T.RESOURCE, xp: 35, url: "https://huggingface.co/course" },
          { id: "p2c2i4", text: "Grokking the System Design Interview (Educative, free trial)", subText: "Scalable architectures.", type: T.RESOURCE, xp: 30, url: "https://www.educative.io/courses/grokking-the-system-design-interview" },
          { id: "p2c2i5", text: "Toastmasters Online (free)", subText: "Public speaking for pitches.", type: T.RESOURCE, xp: 20, url: "https://www.toastmasters.org/" },
        ]
      },
      {
        id: "p2c3", title: "Projects", items: [
          { id: "p2c3i1", text: "NLP: Multilingual sentiment analyzer for X posts", subText: "BERT, spaCy.", type: T.PROJECT, xp: 70 },
          { id: "p2c3i2", text: "NLP: Healthcare Q&A chatbot", subText: "TensorFlow, AWS Lambda.", type: T.PROJECT, xp: 70 },
          { id: "p2c3i3", text: "System Design: Scalable NLP API architecture (documented on GitHub).", type: T.PROJECT, xp: 60 },
        ]
      },
      {
        id: "p2c4", title: "Branding", items: [
          { id: "p2c4i1", text: "Publish 5 X posts/Medium articles on NLP (e.g., “BERT vs. GPT: A Deep Dive”).", type: T.BRANDING, xp: 30 },
          { id: "p2c4i2", text: "Present NLP project at a virtual AI meetup (Meetup.com).", type: T.BRANDING, xp: 40 },
        ]
      },
      {
        id: "p2c5", title: "Evil Edge", items: [
          { id: "p2c5i1", text: "Contribute to Hugging Face repos for visibility (e.g., transformer pipelines).", type: T.EVIL_EDGE, xp: 40 },
          { id: "p2c5i2", text: "Cold-DM 20 Google/OpenAI engineers with project demos.", type: T.EVIL_EDGE, xp: 35 },
        ]
      }
    ]
  },
  {
    id: "phase3",
    title: "Phase 3: RAG and MLOps (Dec 2025–Feb 2026)",
    objective: "Master RAG and MLOps for cutting-edge differentiation.",
    categories: [
      {
        id: "p3c1", title: "Skills", items: [
          { id: "p3c1i1", text: "RAG", subText: "LangChain, Pinecone, FAISS, neural retrieval (DPR, ColBERT).", type: T.RAG, xp: 60 },
          { id: "p3c1i2", text: "MLOps", subText: "AWS SageMaker, Docker, Kubernetes, CI/CD.", type: T.MLOPS, xp: 50 },
          { id: "p3c1i3", text: "Soft Skills", subText: "Adaptability, critical thinking.", type: T.SOFT_SKILLS, xp: 30 },
        ]
      },
      {
        id: "p3c2", title: "Resources", items: [
          { id: "p3c2i1", text: "LangChain Docs (GitHub)", subText: "RAG pipelines, vector databases.", type: T.RESOURCE, xp: 30, url: "https://python.langchain.com/docs/get_started/introduction"},
          { id: "p3c2i2", text: "NVIDIA RAG 101 (Blog)", subText: "Pipeline design, real-time data.", type: T.RESOURCE, xp: 25, url: "https://developer.nvidia.com/blog/build-rag-app-with-nvidia-neva-models/" }, // Example recent NVIDIA RAG blog
          { id: "p3c2i3", text: "AWS Machine Learning University (free)", subText: "SageMaker, model deployment.", type: T.RESOURCE, xp: 30, url: "https://aws.amazon.com/machine-learning/mlu/" },
          { id: "p3c2i4", text: "DataCamp MLOps Fundamentals (free tier)", subText: "Docker, CI/CD.", type: T.RESOURCE, xp: 25, url: "https://www.datacamp.com/courses/understanding-mlops" }, // Example MLOps course
          { id: "p3c2i5", text: "Yale Introduction to Psychology (YouTube)", subText: "Behavioral insights.", type: T.RESOURCE, xp: 20, url: "https://www.youtube.com/playlist?list=PL6A08EB4EEFF3E91F" },
        ]
      },
      {
        id: "p3c3", title: "Projects", items: [
          { id: "p3c3i1", text: "RAG: Enterprise Q&A chatbot for finance", subText: "LangChain, Pinecone, AWS.", type: T.PROJECT, xp: 80 },
          { id: "p3c3i2", text: "RAG: Real-time news summarizer", subText: "FAISS, Hugging Face embeddings.", type: T.PROJECT, xp: 70 },
          { id: "p3c3i3", text: "MLOps: Deploy NLP chatbot with CI/CD", subText: "Docker, SageMaker.", type: T.PROJECT, xp: 60 },
        ]
      },
      {
        id: "p3c4", title: "Branding", items: [
          { id: "p3c4i1", text: "Publish 5 X posts/Medium articles on RAG (e.g., “RAG: Grounding LLMs in Truth”).", type: T.BRANDING, xp: 35 },
          { id: "p3c4i2", text: "Win a global hackathon (Devpost) with RAG project.", type: T.BRANDING, xp: 50 },
        ]
      },
      {
        id: "p3c5", title: "Evil Edge", items: [
          { id: "p3c5i1", text: "Post RAG demos on X, tagging @NVIDIA, @LangChainAI.", type: T.EVIL_EDGE, xp: 30 },
          { id: "p3c5i2", text: "Analyze top GitHub RAG repos to build superior pipelines.", type: T.EVIL_EDGE, xp: 35 },
        ]
      }
    ]
  },
  {
    id: "phase4",
    title: "Phase 4: Agentic AI, MCP, and Interview Mastery (Mar–June 2026)",
    objective: "Master Agentic AI, MCP, and dominate interviews.",
    categories: [
      {
        id: "p4c1", title: "Skills", items: [
          { id: "p4c1i1", text: "Agentic AI", subText: "ReAct, CrewAI, multi-agent systems, autonomous reasoning.", type: T.AGENTIC_AI, xp: 70 },
          { id: "p4c1i2", text: "MCP", subText: "Anthropic APIs, tool-augmented LLMs.", type: T.MCP, xp: 60 },
          { id: "p4c1i3", text: "Interview Prep", subText: "LeetCode (hard), NLP/RAG questions, behavioral skills.", type: T.INTERVIEW_PREP, xp: 50 },
          { id: "p4c1i4", text: "Soft Skills", subText: "Leadership, negotiation.", type: T.SOFT_SKILLS, xp: 40 },
        ]
      },
      {
        id: "p4c2", title: "Resources", items: [
          { id: "p4c2i1", text: "SuperAGI Tutorials (GitHub)", subText: "Agentic AI with ReAct, CrewAI.", type: T.RESOURCE, xp: 30, url: "https://github.com/TransformerOptimus/SuperAGI" },
          { id: "p4c2i2", text: "Anthropic Docs (Claude API)", subText: "MCP for tool integration.", type: T.RESOURCE, xp: 25, url: "https://docs.anthropic.com/" },
          { id: "p4c2i3", text: "DigitalOcean Agentic RAG (Blog)", subText: "Multi-agent orchestration.", type: T.RESOURCE, xp: 20, url: "https://www.digitalocean.com/community/tutorials/how-to-build-an-agentic-rag-system-with-langchain-and-digitalocean-functions"}, // Example blog
          { id: "p4c2i4", text: "LeetCode (free tier)", subText: "150 hard problems (graphs, AI-focused).", type: T.RESOURCE, xp: 40, url: "https://leetcode.com/" },
          { id: "p4c2i5", text: "Coursera's Leadership Skills (audit free)", subText: "Negotiation, influence.", type: T.RESOURCE, xp: 25, url: "https://www.coursera.org/courses?query=leadership" },
        ]
      },
      {
        id: "p4c3", title: "Projects", items: [
          { id: "p4c3i1", text: "Agentic AI: Autonomous research assistant", subText: "CrewAI, RAG integration.", type: T.PROJECT, xp: 90 },
          { id: "p4c3i2", text: "MCP: AI-powered IDE plugin with real-time data", subText: "Anthropic API.", type: T.PROJECT, xp: 80 },
          { id: "p4c3i3", text: "Portfolio: React portfolio site", subText: "Tailwind CSS, Three.js visuals.", type: T.PROJECT, xp: 70 },
        ]
      },
      {
        id: "p4c4", title: "Branding", items: [
          { id: "p4c4i1", text: "Publish 5 X posts/Medium articles on Agentic AI (e.g., \"Building Autonomous AI Agents\").", type: T.BRANDING, xp: 35 },
          { id: "p4c4i2", text: "Speak at a global AI conference (virtual, e.g., NVIDIA GTC).", type: T.BRANDING, xp: 50 },
          { id: "p4c4i3", text: "Apply to 300+ roles (Google, Anthropic, OpenAI) via LinkedIn, AngelList.", type: T.BRANDING, xp: 30 },
        ]
      },
      {
        id: "p4c5", title: "Evil Edge", items: [
          { id: "p4c5i1", text: "Research recruiters on X/LinkedIn for tailored pitches (@GoogleCareers).", type: T.EVIL_EDGE, xp: 30 },
          { id: "p4c5i2", text: "Time interviews to create bidding wars (Google vs. Anthropic).", type: T.EVIL_EDGE, xp: 40 },
          { id: "p4c5i3", text: "Negotiate offers using levels.fyi (aim 20–30% above base).", type: T.EVIL_EDGE, xp: 35, url: "https://www.levels.fyi/" },
        ]
      }
    ]
  },
  {
    id: "deliverables",
    title: "Overall Deliverables",
    // No objective, direct categories
    categories: [
        {
            id: "delcat1", title: "Portfolio", items: [
                { id: "delc1i1", text: "8-10 GitHub projects", subText:"(4 NLP, 2 RAG, 2 Agentic AI, 1–2 MCP), deployed on AWS.", type: T.DELIVERABLES, xp: 200 },
            ]
        },
        {
            id: "delcat2", title: "Brand", items: [
                { id: "delc2i1", text: "20 X posts, 6 Medium articles, 2–3 hackathon wins.", type: T.DELIVERABLES, xp: 100 },
            ]
        },
        {
            id: "delcat3", title: "Network", items: [
                { id: "delc3i1", text: "600 LinkedIn connections, 50+ industry contacts (Google, Anthropic).", type: T.DELIVERABLES, xp: 80 },
            ]
        },
        {
            id: "delcat4", title: "Offers", items: [
                { id: "delc4i1", text: "2–5 roles at $100K–$300K by June 2026.", type: T.DELIVERABLES, xp: 500 },
            ]
        }
    ]
  }
];

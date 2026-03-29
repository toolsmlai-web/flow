export const DEMO_PROMPTS = [
  {
    id: 1,
    icon: "🚀",
    text: "Launch an AI SaaS on Vercel + Supabase",
    category: "Development"
  },
  {
    id: 2,
    icon: "📈",
    text: "Build an automated SEO content engine",
    category: "Marketing"
  },
  {
    id: 3,
    icon: "🛒",
    text: "Set up an e-commerce store with Stripe",
    category: "E-commerce"
  },
  {
    id: 4,
    icon: "📱",
    text: "Deploy a mobile app with marketing launch",
    category: "Mobile"
  },
  {
    id: 5,
    icon: "🤖",
    text: "Create AI customer support workflow",
    category: "Automation"
  },
  {
    id: 6,
    icon: "📧",
    text: "Design email nurture campaign sequence",
    category: "Marketing"
  }
];

export const FEATURES = [
  {
    id: 1,
    icon: "Sparkles",
    title: "AI-Powered Generation",
    description: "Describe your goal in plain English. Our AI architect generates a complete workflow with nodes, connections, and checklists in seconds.",
    gradient: "from-violet-500 to-purple-600",
    stat: "10x",
    statLabel: "faster planning"
  },
  {
    id: 2,
    icon: "GitBranch",
    title: "Visual Workflow Canvas",
    description: "Interactive node-based interface with live connections. Drag, drop, and connect steps visually. No code required.",
    gradient: "from-blue-500 to-cyan-500",
    stat: "100+",
    statLabel: "node types"
  },
  {
    id: 3,
    icon: "CheckCircle",
    title: "Smart Checklists",
    description: "Every node has intelligent checklists that track progress. Auto-check items when connected automations complete.",
    gradient: "from-emerald-500 to-teal-500",
    stat: "95%",
    statLabel: "completion rate"
  },
  {
    id: 4,
    icon: "Zap",
    title: "Live Automations",
    description: "Connect Slack, GitHub, Vercel, OpenAI, and more. Trigger actions automatically as you complete checklist items.",
    gradient: "from-amber-500 to-orange-500",
    stat: "50+",
    statLabel: "integrations"
  },
  {
    id: 5,
    icon: "Users",
    title: "Team Collaboration",
    description: "Share workflows with your team. Real-time sync, comments, and role-based permissions for seamless collaboration.",
    gradient: "from-rose-500 to-pink-500",
    stat: "Unlimited",
    statLabel: "team members"
  },
  {
    id: 6,
    icon: "BarChart3",
    title: "Analytics Dashboard",
    description: "Track workflow execution, completion rates, and team productivity. Optimize your processes with data insights.",
    gradient: "from-indigo-500 to-blue-600",
    stat: "Real-time",
    statLabel: "reporting"
  }
];

export const STEPS = [
  {
    id: 1,
    number: "01",
    title: "Describe Your Goal",
    description: "Type what you want to achieve in plain English. Our AI understands context, requirements, and best practices.",
    icon: "MessageSquare",
    color: "bg-violet-500",
    mockVisual: "prompt"
  },
  {
    id: 2,
    number: "02",
    title: "AI Generates Workflow",
    description: "In seconds, get a complete visual workflow with connected nodes, checklists, and suggested automations.",
    icon: "Cpu",
    color: "bg-blue-500",
    mockVisual: "generation"
  },
  {
    id: 3,
    number: "03",
    title: "Execute & Automate",
    description: "Follow the checklist, trigger automations, and track progress. Share with your team for collaboration.",
    icon: "Rocket",
    color: "bg-emerald-500",
    mockVisual: "execution"
  }
];

export const INTEGRATIONS = [
  { name: "Slack", icon: "slack", color: "#4A154B", category: "Communication" },
  { name: "GitHub", icon: "github", color: "#181717", category: "Development" },
  { name: "Vercel", icon: "vercel", color: "#000000", category: "Deployment" },
  { name: "OpenAI", icon: "openai", color: "#412991", category: "AI" },
  { name: "Stripe", icon: "stripe", color: "#635BFF", category: "Payments" },
  { name: "Supabase", icon: "supabase", color: "#3ECF8E", category: "Database" },
  { name: "Notion", icon: "notion", color: "#000000", category: "Productivity" },
  { name: "Figma", icon: "figma", color: "#F24E1E", category: "Design" },
  { name: "Linear", icon: "linear", color: "#5E6AD2", category: "Project Management" },
  { name: "Discord", icon: "discord", color: "#5865F2", category: "Communication" },
  { name: "Twitter", icon: "twitter", color: "#1DA1F2", category: "Social" },
  { name: "Gmail", icon: "mail", color: "#EA4335", category: "Communication" }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "CheckFlow AI turned our 2-week planning process into 30 minutes. The AI-generated workflows are incredibly accurate and actionable.",
    author: "Sarah Chen",
    role: "Product Manager at Vercel",
    avatar: "SC",
    company: "vercel",
    metrics: { label: "Time saved", value: "90%" }
  },
  {
    id: 2,
    quote: "We use it for every product launch now. The visual canvas makes complex processes simple, and the automations save hours of manual work.",
    author: "Marcus Johnson",
    role: "Head of Engineering at Stripe",
    avatar: "MJ",
    company: "stripe",
    metrics: { label: "Launches completed", value: "25+" }
  },
  {
    id: 3,
    quote: "Finally, a tool that bridges the gap between ideation and execution. Our marketing workflows are now 10x more efficient.",
    author: "Emily Rodriguez",
    role: "CMO at Linear",
    avatar: "ER",
    company: "linear",
    metrics: { label: "ROI increase", value: "340%" }
  }
];

export const FAQS = [
  {
    id: 1,
    question: "How does the AI workflow generation work?",
    answer: "Simply describe your goal in natural language. Our AI analyzes your prompt, identifies required steps, and generates a visual workflow with connected nodes. Each node includes a smart checklist and suggested automations based on best practices from thousands of successful projects."
  },
  {
    id: 2,
    question: "Do I need coding experience to use CheckFlow AI?",
    answer: "Not at all. CheckFlow AI is designed for everyone - product managers, marketers, founders, and operations teams. The visual canvas is completely no-code. If you want to add automations, we provide simple configuration forms for 50+ integrations without writing a single line of code."
  },
  {
    id: 3,
    question: "What integrations are supported?",
    answer: "We support 50+ popular tools including Slack, GitHub, Vercel, OpenAI, Stripe, Supabase, Notion, Linear, Discord, Gmail, and many more. New integrations are added weekly based on user requests."
  },
  {
    id: 4,
    question: "Can I collaborate with my team?",
    answer: "Absolutely. Share workflows via link or invite team members directly. Everyone sees real-time updates, can complete checklist items, and leave comments. We support role-based permissions for secure collaboration."
  },
  {
    id: 5,
    question: "Is my data secure?",
    answer: "Security is our top priority. We use enterprise-grade encryption, SOC 2 Type II compliance, and never store your integration credentials in plain text. You can also self-host CheckFlow AI for complete data control."
  },
  {
    id: 6,
    question: "What's the pricing structure?",
    answer: "We offer a generous free tier for personal use (3 workflows, basic integrations). Pro is $12/month for unlimited workflows and advanced automations. Team plans start at $29/month for 5 members. Enterprise plans with SSO and SLA are available on request."
  }
];

export const STATS = [
  { value: "10,000+", label: "Workflows Created" },
  { value: "500+", label: "Teams Onboarded" },
  { value: "95%", label: "Completion Rate" },
  { value: "4.9/5", label: "User Rating" }
];

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Integrations", href: "#integrations" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" }
];

export const MOCK_WORKFLOW = {
  nodes: [
    {
      id: "1",
      type: "trigger",
      label: "New SaaS Idea",
      description: "Product concept and market research",
      status: "completed",
      checklist: [
        { id: "c1", task: "Define target audience", isDone: true },
        { id: "c2", task: "Validate problem/solution fit", isDone: true },
        { id: "c3", task: "Research competitors", isDone: true }
      ],
      position: { x: 100, y: 200 },
      icon: "💡"
    },
    {
      id: "2",
      type: "action",
      label: "Setup Infrastructure",
      description: "Vercel + Supabase configuration",
      status: "running",
      checklist: [
        { id: "c4", task: "Create Vercel project", isDone: true },
        { id: "c5", task: "Setup Supabase DB", isDone: true },
        { id: "c6", task: "Configure auth", isDone: false }
      ],
      position: { x: 420, y: 200 },
      icon: "⚙️",
      automation: "vercel_deploy"
    },
    {
      id: "3",
      type: "action",
      label: "Build Core Features",
      description: "MVP development and testing",
      status: "idle",
      checklist: [
        { id: "c7", task: "Design database schema", isDone: false },
        { id: "c8", task: "Build API endpoints", isDone: false },
        { id: "c9", task: "Create frontend UI", isDone: false }
      ],
      position: { x: 740, y: 200 },
      icon: "🛠️"
    },
    {
      id: "4",
      type: "logic",
      label: "Launch Preparation",
      description: "Marketing and go-live checklist",
      status: "idle",
      checklist: [
        { id: "c10", task: "Write landing page copy", isDone: false },
        { id: "c11", task: "Setup analytics", isDone: false },
        { id: "c12", task: "Post on Product Hunt", isDone: false }
      ],
      position: { x: 1060, y: 200 },
      icon: "🚀",
      automation: "slack_notify"
    }
  ],
  edges: [
    { id: "e1", source: "1", target: "2", animated: true },
    { id: "e2", source: "2", target: "3", animated: true },
    { id: "e3", source: "3", target: "4", animated: true }
  ]
};

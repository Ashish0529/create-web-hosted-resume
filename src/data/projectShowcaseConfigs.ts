export type ProjectVisual =
  | "member-question"
  | "member-ai"
  | "member-search"
  | "member-dashboard"
  | "model-requirement"
  | "model-design"
  | "model-validation"
  | "model-artifacts"
  | "monitor-running"
  | "monitor-failure"
  | "monitor-alert"
  | "monitor-resolved";

export type ProjectShowcaseStage = {
  icon: string;
  label: string;
  sublabel?: string;
  visual: ProjectVisual;
};

export type ProjectShowcaseConfig = {
  id: string;
  title: string;
  tagline: string;
  accentColor: string;
  stages: [ProjectShowcaseStage, ProjectShowcaseStage, ProjectShowcaseStage, ProjectShowcaseStage];
};

export const memberInsightConfig: ProjectShowcaseConfig = {
  id: "member-insight",
  title: "Member Insight · AI Patient Analytics",
  tagline: "Ask questions in plain English. Get instant, accurate answers from complex healthcare data.",
  accentColor: "#287e88",
  stages: [
    { icon: "💬", label: "Ask in plain English", sublabel: "Show me John's recent prescriptions", visual: "member-question" },
    { icon: "🧠", label: "AI understands & translates", sublabel: "Turns the question into a safe data search", visual: "member-ai" },
    { icon: "▤", label: "Searches the data", sublabel: "Finds matching information across sources", visual: "member-search" },
    { icon: "▥", label: "Get instant answers", sublabel: "A clear summary, ready to explore", visual: "member-dashboard" },
  ],
};

export const modelForgeConfig: ProjectShowcaseConfig = {
  id: "modelforge",
  title: "ModelForge · AI Data Modeling & Governance",
  tagline: "Turns plain business requirements into governed, reusable data models, automatically.",
  accentColor: "#bf7047",
  stages: [
    { icon: "✎", label: "Describe what you need", sublabel: "I need a model for tracking patient visits", visual: "model-requirement" },
    { icon: "✳", label: "AI designs the structure", sublabel: "Organizes concepts into connected fields", visual: "model-design" },
    { icon: "✓", label: "Checks reuse & standards", sublabel: "FHIR ready · No duplicates", visual: "model-validation" },
    { icon: "▣", label: "Delivers ready-to-use models", sublabel: "Tables, definitions, and documentation", visual: "model-artifacts" },
  ],
};

export const etlMonitoringConfig: ProjectShowcaseConfig = {
  id: "etl-monitoring",
  title: "ETL Pipeline Monitoring",
  tagline: "Catches and flags pipeline failures automatically, reducing downtime and manual firefighting.",
  accentColor: "#4d8058",
  stages: [
    { icon: "▦", label: "Pipelines run automatically", sublabel: "Many scheduled data jobs run together", visual: "monitor-running" },
    { icon: "!", label: "Something breaks", sublabel: "One job stops before delivery", visual: "monitor-failure" },
    { icon: "♧", label: "Instantly detected", sublabel: "A clear alert points to the issue", visual: "monitor-alert" },
    { icon: "✓", label: "Fixed & back to normal", sublabel: "The flow is healthy and running again", visual: "monitor-resolved" },
  ],
};

import { useEffect, useState } from "react";
import DataFlowDemo from "./DataFlowDemo";
import ProjectShowcase from "./components/ProjectShowcase";
import { etlMonitoringConfig, memberInsightConfig, modelForgeConfig } from "./data/projectShowcaseConfigs";

type Achievement = {
  outcome: string;
  tools: string[];
};

type Experience = {
  company: string;
  role: string;
  timeline: string;
  location: string;
  points: Achievement[];
};

const experiences: Experience[] = [
  {
    company: "Optum",
    role: "Senior Data Engineer",
    timeline: "Mar 2025 - Present",
    location: "Delhi NCR, India",
    points: [
      { outcome: "Connect healthcare data sources into reliable feeds that support analytics and operations.", tools: ["Databricks", "Snowflake", "Airflow"] },
      { outcome: "Keep large processing jobs within three-hour delivery targets while reducing compute costs.", tools: ["Spark", "Snowflake"] },
      { outcome: "Maintain 200+ scheduled workflows with dependable retries and failure recovery.", tools: ["Airflow"] },
      { outcome: "Make platform releases safer with automated validation across environments.", tools: ["GitHub Actions", "Databricks", "CI/CD"] },
      { outcome: "Improve team delivery quality through workflow reviews and hands-on troubleshooting support.", tools: ["Airflow", "Databricks"] },
    ],
  },
  {
    company: "Optum",
    role: "Data Engineering Analyst",
    timeline: "Jan 2023 - Mar 2025",
    location: "Delhi NCR, India",
    points: [
      { outcome: "Turn files from multiple sources into standardized, analytics-ready healthcare data.", tools: ["Azure", "PySpark", "Parquet"] },
      { outcome: "Process about 1 million records each day across more than 1,000 tables within delivery windows.", tools: ["PySpark", "Snowflake"] },
      { outcome: "Catch missing or inconsistent information with more than 1,200 automated quality checks.", tools: ["SQL", "Databricks", "Data Quality"] },
      { outcome: "Deliver trusted datasets to six healthcare products and partner systems.", tools: ["SQL", "Snowflake", "Azure"] },
      { outcome: "Protect sensitive patient and personal information through secure handling controls.", tools: ["PHI/PII", "Azure"] },
    ],
  },
  {
    company: "Optum",
    role: "Technology Development Program (TDP)",
    timeline: "Aug 2022 - Jan 2023",
    location: "Delhi NCR, India",
    points: [
      { outcome: "Mapped how incoming data relates to business reporting and delivery needs.", tools: ["SQL", "Data Modeling"] },
      { outcome: "Checked transferred records for count and consistency before downstream use.", tools: ["SQL", "Reconciliation"] },
      { outcome: "Resolved release issues by tracing workflow logs and processing runs.", tools: ["Airflow", "Databricks"] },
    ],
  },
  {
    company: "Tredence",
    role: "Analyst",
    timeline: "Jun 2022 - Jul 2022",
    location: "Delhi NCR, India",
    points: [
      { outcome: "Turned business data into clear reports and dashboards for decision-making.", tools: ["SQL", "Databricks", "Power BI", "Excel"] },
    ],
  },
];

const projects = [
  {
    title: "Member Insight - AI-Powered Healthcare Data and Patient Analytics Platform",
    showcase: memberInsightConfig,
    stack: "Python, Flask, Snowflake, Databricks, Azure, Azure OpenAI, SQL",
    timeline: "2024 - 2025",
    points: [
      "Built a platform for member and patient search, real-time analytics, and cross-domain healthcare insights.",
      "Implemented natural-language queries with Azure OpenAI for NL-to-SQL generation and grounded responses.",
      "Delivered interactive patient dashboards and multi-source drill-down analysis for 1000+ internal users.",
    ],
  },
  {
    title: "ModelForge - AI Data Modeling and Governance Assistant",
    showcase: modelForgeConfig,
    stack: "Python, FastAPI, Azure OpenAI, RAG, SQLite, Azure AD, JavaScript, HTML/CSS",
    timeline: "2024",
    points: [
      "Built a tool that converts business requirements into data models, DDL scripts, contracts, and dictionaries.",
      "Added RAG-powered metadata reuse detection to improve model standardization and reduce duplication.",
      "Integrated semantic mapping support and approval workflows with Azure AD-based role access.",
    ],
  },
  {
    title: "ETL Pipeline Monitoring and Operational Visibility",
    showcase: etlMonitoringConfig,
    stack: "Airflow, Databricks, SQL",
    timeline: "2024",
    points: [
      "Standardized SLA and run-status reporting for 200+ Airflow jobs and DAGs.",
      "Identified repeat failure patterns and improved operational triage to reduce MTTR.",
    ],
  },
];

type IconName = "storage" | "processing" | "reliability" | "ai";

const impactStats = [
  { value: "1M+", label: "records processed daily" },
  { value: "1,000+", label: "tables managed" },
  { value: "200+", label: "data pipelines maintained" },
  { value: "1,200+", label: "automated quality checks" },
];

const skillGroups: { title: string; icon: IconName; skills: string[] }[] = [
  { title: "Data Collection & Storage", icon: "storage", skills: ["Azure", "Snowflake", "Delta Lake", "CSV / Excel / Parquet"] },
  { title: "Data Processing & Transformation", icon: "processing", skills: ["Databricks", "PySpark", "Python", "SQL", "Data Modeling"] },
  { title: "Automation & Reliability", icon: "reliability", skills: ["Airflow", "GitHub Actions", "CI/CD", "Data Quality"] },
  { title: "AI & Advanced Analytics", icon: "ai", skills: ["Azure OpenAI", "RAG", "Flask", "FastAPI", "Power BI"] },
];

const skills = skillGroups.flatMap((group) => group.skills);

function ResumeIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "storage" && <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>}
      {name === "processing" && <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /><circle cx="9" cy="6" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="7" cy="18" r="2" /></>}
      {name === "reliability" && <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>}
      {name === "ai" && <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.2L22 17l-1.9.8L19 20l-1.1-2.2L16 17l1.9-.8L19 14Z" /></>}
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

function ImpactStatsSection() {
  return (
    <section id="impact" className="impact-section" aria-label="Delivery impact">
      <div className="section-inner impact-grid">
        {impactStats.map((stat) => (
          <div className="impact-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="recruiter-section experience-section">
      <div className="section-inner">
        <SectionHeading eyebrow="EXPERIENCE" title="Making data dependable for the people who use it" description="Clear outcomes first. The tools behind each result are listed separately." />
        <div className="experience-list">
          {experiences.map((item) => (
            <article className="experience-entry" key={`${item.company}-${item.role}`}>
              <header className="experience-entry-header">
                <div><h3>{item.role}</h3><p>{item.company} <span>{item.location}</span></p></div>
                <time>{item.timeline}</time>
              </header>
              <div className="achievement-list">
                {item.points.map((point) => (
                  <article className="achievement" key={point.outcome}>
                    <p>{point.outcome}</p>
                    <div className="tool-tags" aria-label="Tools used">
                      {point.tools.map((tool) => <span key={tool}>{tool}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="recruiter-section projects-section">
      <div className="section-inner">
        <SectionHeading eyebrow="SELECTED PROJECTS" title="Tools that make complex data easier to use" />
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-item project-showcase-item" key={project.title}>
              <p className="project-timeline">{project.timeline}</p>
              <h3>{project.title}</h3>
              <ul className="project-points">
                {project.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <ProjectShowcase config={project.showcase} />
              <div className="tool-tags">
                {project.stack.split(", ").map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="recruiter-section skills-section">
      <div className="section-inner">
        <SectionHeading eyebrow="SKILLS" title="Tools for the full data journey" />
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <span className="skill-icon"><ResumeIcon name={group.icon} /></span>
              <h3>{group.title}</h3>
              <div className="tool-tags">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-page-inner">
        <header className="resume-page-header">
          <div>
            <p>FULL RESUME</p>
            <h1>Ashish Gaurav</h1>
            <span>Senior Data Engineer · Healthcare Data Platforms</span>
            <a href="mailto:sumitgaurav86@gmail.com">sumitgaurav86@gmail.com</a>
          </div>
          <div className="resume-page-actions">
            <a href={`${import.meta.env.BASE_URL}Ashish_New_Resume_Optum.pdf`} download="Ashish_New_Resume_Optum.pdf">Download PDF ↓</a>
            <a href="#/">Portfolio home ↗</a>
          </div>
        </header>

        <section className="resume-summary">
          <h2>What I do</h2>
          <p>I help organizations turn scattered healthcare data into reliable information for teams, products, and decisions.</p>
        </section>

        <DataFlowDemo />
        <ImpactStatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />

        <section className="resume-details">
          <div>
            <h2>Education</h2>
            <p>National Institute of Technology Jamshedpur · 2018 - 2022</p>
            <p>B.Tech Hons., Electrical and Electronics Engineering · CGPA 8.3/10</p>
          </div>
          <div>
            <h2>Certifications</h2>
            <ul>
              <li>Databricks Certified Data Engineer Associate (2023)</li>
              <li>Optum Specialized AI Dojo Certification</li>
              <li>Data Science and Data Analysis with Python - IBM</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function IntroPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = ["how", "impact", "experience", "projects", "skills"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-24% 0px -64% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#projects") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="portfolio-home">
      <div className="portfolio-wrap">
        <header className="portfolio-header">
          <a className="portfolio-brand" href="#/" aria-label="Ashish Gaurav home">
            <span>AG</span>
            <strong>Ashish Gaurav</strong>
          </a>
          <nav className="portfolio-nav" aria-label="Main navigation">
            <a className={activeSection === "how" ? "is-active" : ""} aria-current={activeSection === "how" ? "location" : undefined} href="#how">How I work</a>
            <a className={activeSection === "experience" ? "is-active" : ""} aria-current={activeSection === "experience" ? "location" : undefined} href="#experience">Experience</a>
            <a className={activeSection === "projects" ? "is-active" : ""} aria-current={activeSection === "projects" ? "location" : undefined} href="#projects">Projects</a>
            <a className={activeSection === "skills" ? "is-active" : ""} aria-current={activeSection === "skills" ? "location" : undefined} href="#skills">Skills</a>
            <a className="nav-download" href={`${import.meta.env.BASE_URL}Ashish_New_Resume_Optum.pdf`} download="Ashish_New_Resume_Optum.pdf">
              Download resume <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </header>

        <section className="portfolio-hero" aria-label="Senior data engineer profile">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span /> DATA ENGINEERING <i /> HEALTHCARE <i /> CLOUD
            </p>
            <h1>Ashish<br /><span>Gaurav</span></h1>
            <p className="hero-role">Senior Data Engineer</p>
            <p className="hero-summary">
              I help organizations turn messy, scattered data into reliable, ready-to-use information.
            </p>
            <div className="hero-actions">
              <a className="button-download" href={`${import.meta.env.BASE_URL}Ashish_New_Resume_Optum.pdf`} download="Ashish_New_Resume_Optum.pdf">
                Download resume <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button-text see-how-link"
                href="#how"
                onClick={() => window.dispatchEvent(new Event("dataflow:replay-on-arrival"))}
              >
                See how I work <span aria-hidden="true">↓</span>
              </a>
              <a className="button-text" href="#experience">Explore experience <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <section className="career-snapshot" aria-label="Career snapshot and delivery impact">
            <img
              src={`${import.meta.env.BASE_URL}images/ashish-resume-preview.png`}
              alt=""
              aria-hidden="true"
            />
            <div className="snapshot-content">
              <p className="snapshot-label">CAREER PROGRESSION</p>
              <h2>Growing responsibility.<br />Trusted delivery.</h2>

              <div className="career-list" aria-label="Recent experience">
                <article>
                  <time>2025 - NOW</time>
                  <div><h3>Optum</h3><p>Senior Data Engineer</p></div>
                </article>
                <article>
                  <time>2023 - 2025</time>
                  <div><h3>Optum</h3><p>Data Engineering Analyst</p></div>
                </article>
                <article>
                  <time>2022</time>
                  <div><h3>Tredence</h3><p>Analyst</p></div>
                </article>
              </div>

              <a className="snapshot-link" href="#experience">View career impact <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </section>

        <DataFlowDemo />
        <ImpactStatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />

        <footer className="portfolio-footer">
          <span>DELHI NCR, INDIA</span>
          <a href="mailto:sumitgaurav86@gmail.com">sumitgaurav86@gmail.com <span aria-hidden="true">↗</span></a>
          <span className="portfolio-social-pending">LinkedIn · profile URL needed</span>
          <span className="portfolio-social-pending">GitHub · profile URL needed</span>
          <a href="#/resume">Education &amp; certifications <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const handleRoute = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", handleRoute);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  const isResumeRoute = route.startsWith("#/resume");
  return isResumeRoute ? <ResumePage /> : <IntroPage />;
}

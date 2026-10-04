import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
};

type Experience = {
  company: string;
  role: string;
  timeline: string;
  location: string;
  points: string[];
};

const slides: Slide[] = [
  {
    title: "Ashish Gaurav",
    subtitle: "Senior Data Engineer building reliable healthcare data platforms at scale.",
  },
  {
    title: "4+ Years in Data Engineering",
    subtitle: "Designed ETL and ELT systems for enterprise healthcare workloads.",
  },
  {
    title: "~1M Records Processed Daily",
    subtitle: "Delivered resilient pipelines with 3-hour SLA support for 1000+ tables.",
  },
  {
    title: "Databricks + Snowflake + Airflow",
    subtitle: "Strong in orchestration, transformation design, and performance optimization.",
  },
  {
    title: "AI-Enabled Data Products",
    subtitle: "Built internal analytics and data-modeling assistants using Azure OpenAI.",
  },
];

const experiences: Experience[] = [
  {
    company: "Optum",
    role: "Senior Data Engineer",
    timeline: "Mar 2025 - Present",
    location: "Delhi NCR, India",
    points: [
      "Contribute to scalable healthcare data integration architecture using Databricks, Snowflake, and Airflow.",
      "Tune Spark workloads, partition layouts, and Snowflake queries to meet 3-hour SLAs while reducing compute cost.",
      "Support 200+ Airflow jobs and DAGs with strong dependency, retry, and failure-handling strategies.",
      "Implement CI/CD with GitHub Actions for Databricks and orchestration validation and deployment across environments.",
      "Mentor engineers through workflow walkthroughs and debugging support to improve release quality.",
    ],
  },
  {
    company: "Optum",
    role: "Data Engineering Analyst",
    timeline: "Jan 2023 - Mar 2025",
    location: "Delhi NCR, India",
    points: [
      "Built ingestion and integration pipelines for TXT, CSV, Excel, and Parquet data from Azure Storage into Bronze and curated layers.",
      "Delivered batch pipelines handling approximately 1M records/day and supporting 1000+ tables inside strict SLA windows.",
      "Implemented a data quality framework with 1200+ automated SQL checks for completeness, integrity, and reconciliation.",
      "Published curated datasets to 6 downstream systems including Curo, CDOS, and Cozeva for operational and analytics usage.",
      "Enabled secure PHI and PII sharing using compliance-aligned workflows and controls.",
    ],
  },
  {
    company: "Optum",
    role: "Technology Development Program (TDP)",
    timeline: "Aug 2022 - Jan 2023",
    location: "Delhi NCR, India",
    points: [
      "Profiled source datasets to understand schema relationships and transformation requirements.",
      "Supported source-to-target mapping and validation for row counts and consistency checks.",
      "Investigated ETL and release issues using Airflow logs and Databricks execution traces.",
    ],
  },
  {
    company: "Tredence",
    role: "Analyst",
    timeline: "Jun 2022 - Jul 2022",
    location: "Delhi NCR, India",
    points: [
      "Performed analysis using Databricks and SQL/MySQL and developed reporting dashboards in Power BI and Excel.",
    ],
  },
];

const projects = [
  {
    title: "Member Insight - AI-Powered Healthcare Data and Patient Analytics Platform",
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
    stack: "Airflow, Databricks, SQL",
    timeline: "2024",
    points: [
      "Standardized SLA and run-status reporting for 200+ Airflow jobs and DAGs.",
      "Identified repeat failure patterns and improved operational triage to reduce MTTR.",
    ],
  },
];

const skills = [
  "Python",
  "PySpark",
  "SQL",
  "Spark SQL",
  "PL/SQL",
  "Databricks",
  "Snowflake",
  "Delta Lake",
  "Apache Airflow",
  "Data Modeling",
  "ETL/ELT",
  "Data Quality",
  "Azure",
  "Azure OpenAI",
  "GitHub Actions",
  "CI/CD",
];

function ResumePage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12 md:px-10 md:pt-16">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-sm font-medium tracking-[0.18em] text-slate-500">RESUME</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Ashish Gaurav</h1>
          <p className="mt-3 text-base text-slate-700 md:text-lg">
            Senior Data Engineer | Data Integration | ETL/ELT | Databricks | Snowflake | Airflow
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <span>+91-708-198-6694</span>
            <a className="hover:text-slate-900" href="mailto:sumitgaurav86@gmail.com">
              sumitgaurav86@gmail.com
            </a>
            <span>LinkedIn: add-your-link</span>
            <span>GitHub: add-your-link</span>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.print()}
              className="cursor-pointer border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-900 hover:text-slate-900"
            >
              Download / Print PDF
            </button>
            <a
              href="#/"
              className="border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Back to Intro
            </a>
          </div>
        </header>

        <section className="border-b border-slate-200 py-8">
          <h2 className="text-lg font-semibold">Profile Summary</h2>
          <p className="mt-3 max-w-4xl text-slate-700">
            Senior Data Engineer with 4+ years of experience building healthcare ETL/ELT and enterprise
            data integration solutions using Databricks, PySpark, SQL, Snowflake, and Apache Airflow on
            Azure. Delivered batch pipelines processing around 1M records per day, supporting 1000+ tables
            and 200+ jobs and DAGs inside 3-hour SLAs. Experienced in data modeling, source-to-target
            mapping, data quality automation, reconciliation, and secure PHI and PII data handling.
          </p>
        </section>

        <section className="border-b border-slate-200 py-8">
          <h2 className="text-lg font-semibold">Experience</h2>
          <div className="mt-5 space-y-8">
            {experiences.map((item) => (
              <article key={`${item.company}-${item.role}`}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.role} - {item.company}
                  </h3>
                  <p className="text-sm text-slate-500">{item.timeline}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.location}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-slate-200 py-8">
          <h2 className="text-lg font-semibold">Projects</h2>
          <div className="mt-5 space-y-8">
            {projects.map((project) => (
              <article key={project.title}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  <p className="text-sm text-slate-500">{project.timeline}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{project.stack}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-slate-200 py-8">
          <h2 className="text-lg font-semibold">Technical Skills</h2>
          <p className="mt-3 text-slate-700">{skills.join(" | ")}</p>
        </section>

        <section className="border-b border-slate-200 py-8">
          <h2 className="text-lg font-semibold">Education</h2>
          <p className="mt-3 text-slate-700">National Institute of Technology Jamshedpur (2018 - 2022)</p>
          <p className="text-slate-700">B.Tech Hons. - Electrical and Electronics Engineering | CGPA: 8.3/10</p>
        </section>

        <section className="py-8">
          <h2 className="text-lg font-semibold">Certifications</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>Databricks Certified Data Engineer Associate (2023)</li>
            <li>Optum Specialized AI Dojo Certification</li>
            <li>Data Science and Data Analysis with Python - IBM</li>
          </ul>
        </section>
      </section>
    </main>
  );
}

function IntroPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <img
        src="/images/ashish-resume-preview.png"
        alt="Ashish Gaurav resume preview"
        className="absolute inset-0 h-full w-full object-cover opacity-35 motion-safe:animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-950/75" />

      <section
        className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10"
        aria-label="Resume slideshow preview"
      >
        <p className="text-sm font-medium tracking-[0.2em] text-sky-200">ASHISH GAURAV</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Senior Data Engineer
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
          Data Integration, ETL/ELT, Databricks, Snowflake, and Airflow for enterprise healthcare
          platforms.
        </p>

        <a
          href="#/resume"
          className="group mt-10 block w-full max-w-3xl border border-white/35 bg-black/25 p-7 backdrop-blur-sm transition hover:border-white/70 hover:bg-black/35"
          aria-label="Open full resume"
        >
          <p className="text-xs tracking-[0.16em] text-sky-200">SLIDESHOW PREVIEW</p>
          <h2
            key={currentSlide.title}
            className="mt-3 text-2xl font-semibold leading-tight motion-safe:animate-[fadeUp_420ms_ease-out]"
          >
            {currentSlide.title}
          </h2>
          <p
            key={currentSlide.subtitle}
            className="mt-2 max-w-2xl text-slate-100 motion-safe:animate-[fadeUp_540ms_ease-out]"
          >
            {currentSlide.subtitle}
          </p>
          <p className="mt-5 text-sm text-sky-100/90 transition group-hover:text-white">
            Click this slideshow to open full resume
          </p>
        </a>

        <div className="mt-6 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 w-10 cursor-pointer transition ${
                index === activeSlide ? "bg-white" : "bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#/resume"
            className="bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-200"
          >
            View Full Resume
          </a>
          <a
            href="mailto:sumitgaurav86@gmail.com"
            className="border border-white/45 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Contact Ashish
          </a>
        </div>
      </section>
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

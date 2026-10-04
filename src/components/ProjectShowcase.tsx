import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { ProjectShowcaseConfig, ProjectVisual } from "../data/projectShowcaseConfigs";

const demoDuration = 5500;
const stagePause = 1300;

function ShowcaseArtwork({ visual }: { visual: ProjectVisual }) {
  switch (visual) {
    case "member-question":
      return <div className="member-chat-bubble"><span>YOU</span><p>Show me John&apos;s recent prescriptions</p><i>•••</i></div>;
    case "member-ai":
      return <div className="member-ai-scene"><span className="member-ai-brain">AI</span><code>SELECT recent_prescriptions</code><code>WHERE member = 'John'</code></div>;
    case "member-search":
      return <div className="member-database-scene"><span className="member-db-cylinder">▤<i /><i /></span><span className="member-scan-line" /><p>Searching connected sources</p></div>;
    case "member-dashboard":
      return <div className="member-dashboard-scene"><header><span>MEMBER OVERVIEW</span><i>● ● ●</i></header><div className="member-dashboard-body"><div><b>Recent prescriptions</b><span>3 active</span><span>Updated today</span></div><div className="member-chart">{[30, 55, 40, 78, 62, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div></div>;
    case "model-requirement":
      return <div className="model-requirement-scene"><span>BUSINESS REQUIREMENT</span><p>I need a model for tracking patient visits</p><i>Text request received</i></div>;
    case "model-design":
      return <div className="model-design-scene"><span className="model-node node-patient">Patient</span><span className="model-node node-visit">Visit</span><span className="model-node node-provider">Provider</span><i className="model-link link-one" /><i className="model-link link-two" /><span className="model-ai-mark">✳</span></div>;
    case "model-validation":
      return <div className="model-validation-scene"><span>✓ <b>FHIR aligned</b></span><span>✓ <b>No duplicate model</b></span><span>✓ <b>Required fields present</b></span></div>;
    case "model-artifacts":
      return <div className="model-artifacts-scene"><span><b>▦</b> TABLE</span><span><b>&lt;/&gt;</b> DDL</span><span><b>▤</b> DICTIONARY</span></div>;
    case "monitor-running":
    case "monitor-failure":
    case "monitor-alert":
    case "monitor-resolved": {
      const failed = visual === "monitor-failure" || visual === "monitor-alert";
      const resolved = visual === "monitor-resolved";
      return <div className={`monitor-scene ${failed ? "has-failure" : ""} ${resolved ? "is-resolved" : ""}`}>
        <div className="monitor-pipeline-grid">{Array.from({ length: 8 }, (_, index) => <span className={`monitor-pipeline ${failed && index === 4 ? "is-failed" : ""}`} key={index}><i /></span>)}</div>
        {visual === "monitor-alert" && <span className="monitor-bell">♧<i>!</i></span>}
        {failed && <span className="monitor-warning">!</span>}
        {resolved && <span className="monitor-resolved-check">✓</span>}
        <span className="monitor-caption">{resolved ? "ALL PIPELINES HEALTHY" : failed ? "ISSUE DETECTED" : "8 PIPELINES RUNNING"}</span>
      </div>;
    }
  }
}

export default function ProjectShowcase({ config }: { config: ProjectShowcaseConfig }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const runDemoRef = useRef<() => void>(() => undefined);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [runId, setRunId] = useState(0);

  const runDemo = () => {
    if (isPlaying) return;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    startedRef.current = true;
    setHasPlayed(true);
    setRunId((current) => current + 1);
    setActiveStage(reduceMotion ? config.stages.length - 1 : 0);
    setIsPlaying(!reduceMotion);

    if (reduceMotion) return;

    config.stages.forEach((_, index) => {
      if (index > 0) {
        timersRef.current.push(window.setTimeout(() => setActiveStage(index), index * stagePause));
      }
    });
    timersRef.current.push(window.setTimeout(() => setIsPlaying(false), demoDuration));
  };

  runDemoRef.current = runDemo;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || startedRef.current || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!startedRef.current) runDemoRef.current();
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const currentStage = Math.max(activeStage, 0);
  const stage = config.stages[currentStage];
  return (
    <section
      className="project-showcase"
      ref={sectionRef}
      aria-label={`${config.title} project walkthrough`}
      style={{ "--project-accent": config.accentColor } as CSSProperties}
    >
      <header className="project-showcase-header">
        <div>
          <p className="project-showcase-eyebrow">INTERACTIVE PROJECT WALKTHROUGH</p>
          <h4>{config.title}</h4>
        </div>
        <button type="button" className="project-showcase-button" onClick={runDemo} disabled={isPlaying} aria-controls={`project-art-${config.id}`}>
          <span aria-hidden="true">▶</span>{isPlaying ? "Replaying..." : "Watch Demo"}
        </button>
      </header>
      <p className="project-showcase-tagline">{config.tagline}</p>

      <div className="project-showcase-track">
        <LayoutGroup id={`project-showcase-${config.id}`}>
          {config.stages.map((item, index) => (
            <div className="project-showcase-track-part" key={item.visual}>
              <article className={`project-showcase-stage ${activeStage === index ? "is-active" : ""}`}>
                <span className="project-showcase-stage-icon">
                  {item.icon}
                  {hasPlayed && activeStage === index && (
                    <motion.span
                      className="project-showcase-traveler"
                      layoutId="shared-project-traveler"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                </span>
                <h5>{item.label}</h5>
                {item.sublabel && <p>{item.sublabel}</p>}
              </article>
              {index < config.stages.length - 1 && (
                <span className="project-showcase-connector" aria-hidden="true">
                  <span className="connector-horizontal">→</span>
                  <span className="connector-vertical">↓</span>
                </span>
              )}
            </div>
          ))}
        </LayoutGroup>
      </div>

      <div className="project-showcase-art" id={`project-art-${config.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className={`project-showcase-artwork artwork-${stage.visual}`}
            key={`${stage.visual}-${runId}`}
            initial={reduceMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
          >
            <ShowcaseArtwork visual={stage.visual} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="project-showcase-footer">
        <div className="project-showcase-dots" role="progressbar" aria-label={`${config.title} demo progress`} aria-valuemin={0} aria-valuemax={config.stages.length} aria-valuenow={activeStage + 1} aria-valuetext={activeStage < 0 ? "Not started" : `${stage.label} stage`}>
          {config.stages.map((item, index) => <span className={activeStage >= index ? "is-reached" : ""} key={item.visual} />)}
        </div>
        <p className="project-showcase-live" aria-live="polite" aria-atomic="true">
          {activeStage < 0 ? "Project walkthrough ready." : `${stage.label}. ${stage.sublabel ?? ""}`}
        </p>
      </div>
    </section>
  );
}
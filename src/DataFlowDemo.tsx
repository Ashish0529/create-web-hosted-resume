import { useEffect, useRef, useState } from "react";

const stages = [
  { name: "Collect", description: "Gathering data from multiple sources", icon: "collect" },
  { name: "Organize", description: "Cleaning and structuring data", icon: "organize" },
  { name: "Validate", description: "Catching errors automatically", icon: "validate" },
  { name: "Deliver", description: "Trusted data ready to use", icon: "deliver" },
] as const;

let hasPlayedThisVisit = false;

function StageIcon({ name }: { name: (typeof stages)[number]["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "collect" && <><path d="M12 3v13" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" /></>}
      {name === "organize" && <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /><circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="7" cy="18" r="1.5" /></>}
      {name === "validate" && <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16.5 9" /></>}
      {name === "deliver" && <><path d="M4 12h14" /><path d="m13 6 6 6-6 6" /><path d="M4 5v14" /></>}
    </svg>
  );
}

export default function DataFlowDemo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const arrivalObserverRef = useRef<IntersectionObserver | null>(null);
  const progressTimersRef = useRef<number[]>([]);
  const isPlayingRef = useRef(false);
  const lastStartTimeRef = useRef(0);
  const startAnimationRef = useRef<() => void>(() => undefined);
  const [runKey, setRunKey] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const [status, setStatus] = useState("Select Watch Data Flow to see how raw information becomes ready to use.");

  const startAnimation = () => {
    const now = Date.now();
    if (isPlayingRef.current || now - lastStartTimeRef.current < 250) return;
    lastStartTimeRef.current = now;

    progressTimersRef.current.forEach(window.clearTimeout);
    progressTimersRef.current = [];
    hasPlayedThisVisit = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isPlayingRef.current = !reducedMotion;
    setRunKey((current) => current + 1);
    setHasPlayed(true);
    setIsPlaying(!reducedMotion);
    setActiveStage(reducedMotion ? stages.length - 1 : 0);
    setStatus(reducedMotion ? "The four data stages are shown without motion." : "Data is moving through the four stages.");

    if (!reducedMotion) {
      progressTimersRef.current = [1400, 2750, 4150].map((delay, index) =>
        window.setTimeout(() => setActiveStage(index + 1), delay),
      );
    }
  };

  startAnimationRef.current = startAnimation;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasPlayedThisVisit || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!hasPlayedThisVisit) startAnimation();
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const requestReplayOnArrival = () => {
      const section = sectionRef.current;
      if (!section) return;

      arrivalObserverRef.current?.disconnect();
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        startAnimationRef.current();
        return;
      }

      if (!("IntersectionObserver" in window)) {
        window.setTimeout(() => startAnimationRef.current(), 500);
        return;
      }

      arrivalObserverRef.current = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          arrivalObserverRef.current?.disconnect();
          arrivalObserverRef.current = null;
          startAnimationRef.current();
        }
      }, { threshold: 0.25 });
      arrivalObserverRef.current.observe(section);
    };

    window.addEventListener("dataflow:replay-on-arrival", requestReplayOnArrival);
    return () => {
      window.removeEventListener("dataflow:replay-on-arrival", requestReplayOnArrival);
      arrivalObserverRef.current?.disconnect();
    };
  }, []);

  useEffect(() => () => {
    progressTimersRef.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timeout = window.setTimeout(() => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setStatus("Flow complete. Trusted data is ready to use.");
    }, 5500);

    return () => window.clearTimeout(timeout);
  }, [isPlaying, runKey]);

  return (
    <section id="how" className="recruiter-section how-section dataflow-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="dataflow-heading">
          <div className="section-heading">
            <p>HOW DATA ENGINEERING WORKS</p>
            <h2>From scattered information to trusted answers</h2>
          </div>
          <button className="dataflow-play" type="button" onClick={startAnimation} disabled={isPlaying} aria-controls="dataflow-visual">
            <span className="dataflow-play-icon" aria-hidden="true">▶</span>
            {isPlaying ? "Replaying..." : "Watch Data Flow"}
          </button>
        </div>

        <div id="dataflow-visual" className={`dataflow-scene ${hasPlayed ? "has-run" : ""} ${isPlaying ? "is-playing" : ""}`} key={runKey}>
          <div className="dataflow-track" aria-hidden="true">
            <div className="dataflow-track-line" />
            {stages.map((stage, index) => <span className={`dataflow-waypoint waypoint-${index + 1}`} key={stage.name} />)}
            <div className="journey-payload">
              <span className="journey-file file-csv">.csv</span>
              <span className="journey-file file-xlsx">.xlsx</span>
              <span className="journey-file file-raw">raw_data</span>
              <span className="journey-file file-record">name: ??</span>
              <span className="journey-warning warning-left">!</span>
              <span className="journey-warning warning-right">!</span>
              <span className="journey-check"><StageIcon name="validate" /></span>
              <div className="journey-delivery">
                <span>READY DATA</span>
                <i /><i /><i />
                <b>✓</b>
              </div>
            </div>
          </div>

          <div className="dataflow-stages">
            {stages.map((stage, index) => (
              <article className={`dataflow-stage stage-${index + 1}`} key={stage.name}>
                <div className="dataflow-stage-title">
                  <span className="dataflow-stage-icon"><StageIcon name={stage.icon} /></span>
                  <h3>{stage.name}</h3>
                </div>
                <p>{stage.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="dataflow-progress" role="progressbar" aria-label="Data flow stage progress" aria-valuemin={0} aria-valuemax={stages.length} aria-valuenow={activeStage + 1} aria-valuetext={activeStage < 0 ? "Not started" : `${stages[activeStage].name} stage`}>
          {stages.map((stage, index) => (
            <span className={`dataflow-progress-dot ${activeStage >= index ? "is-reached" : ""} ${activeStage === index && isPlaying ? "is-current" : ""}`} key={stage.name} />
          ))}
        </div>

        <p className="dataflow-status" role="status" aria-live="polite">{status}</p>
      </div>
    </section>
  );
}
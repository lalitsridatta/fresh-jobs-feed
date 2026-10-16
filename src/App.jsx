import { useEffect, useState, useMemo } from "react";
import { fetchJobs } from "./data/jobs.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import FilterBar from "./components/FilterBar.jsx";
import JobCard from "./components/JobCard.jsx";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useLocalStorage("savedJobs", []);

  function loadJobs() {
    setLoading(true);
    setError(null);
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadJobs, []);

  // Updates instantly in the UI, then persists via the hook.
  function toggleSave(id) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  // Recomputed only when its inputs change.
  const visibleJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((t) => t.toLowerCase().includes(q));
      const matchesType = type === "All" || job.type === type;
      const matchesSaved = !savedOnly || savedIds.includes(job.id);
      return matchesQuery && matchesType && matchesSaved;
    });
  }, [jobs, query, type, savedOnly, savedIds]);

  return (
    <main className="container">
      <header>
        <h1>Fresh Jobs Feed</h1>
        <p className="subtitle">Discover jobs while they're still fresh.</p>
      </header>

      <FilterBar
        query={query} onQuery={setQuery}
        type={type} onType={setType}
        savedOnly={savedOnly} onSavedOnly={setSavedOnly}
      />

      {loading && <p className="status" role="status">Loading jobs...</p>}

      {error && (
        <div className="status error" role="alert">
          {error} <button className="btn" onClick={loadJobs}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="count" aria-live="polite">{visibleJobs.length} job(s) found</p>
          <section className="grid">
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedIds.includes(job.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

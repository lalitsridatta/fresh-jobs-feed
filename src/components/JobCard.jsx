export default function JobCard({ job, isSaved, onToggleSave }) {
  const isFresh = job.postedHoursAgo <= 6;

  return (
    <article className="card">
      <div className="card-top">
        <div>
          <h2>{job.title}</h2>
          <p className="meta">{job.company} · {job.location} · {job.type}</p>
        </div>
        {isFresh && <span className="badge">Fresh</span>}
      </div>

      <ul className="tags">
        {job.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>

      <div className="card-bottom">
        <span className="posted">Posted {job.postedHoursAgo}h ago</span>
        <button
          className={isSaved ? "btn saved" : "btn"}
          onClick={() => onToggleSave(job.id)}
          aria-pressed={isSaved}
        >
          {isSaved ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </article>
  );
}

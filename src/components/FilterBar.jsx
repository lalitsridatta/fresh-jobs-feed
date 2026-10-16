export default function FilterBar({ query, onQuery, type, onType, savedOnly, onSavedOnly }) {
  return (
    <div className="filter-bar" role="search">
      <label className="sr-only" htmlFor="search">Search jobs</label>
      <input
        id="search"
        type="search"
        placeholder="Search title, company or skill..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />

      <label className="sr-only" htmlFor="type">Job type</label>
      <select id="type" value={type} onChange={(e) => onType(e.target.value)}>
        <option value="All">All types</option>
        <option value="Full-time">Full-time</option>
        <option value="Internship">Internship</option>
      </select>

      <label className="checkbox">
        <input type="checkbox" checked={savedOnly} onChange={(e) => onSavedOnly(e.target.checked)} />
        Saved only
      </label>
    </div>
  );
}

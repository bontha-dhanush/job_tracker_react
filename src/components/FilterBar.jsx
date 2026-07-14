import { PLATFORMS, STATUSES } from '../constants/jobOptions';

function FilterBar({ platform, status, onPlatformChange, onStatusChange, onClear }) {
  const hasFilters = platform || status;

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <label htmlFor="platform-filter">Platform</label>
        <select
          id="platform-filter"
          value={platform}
          onChange={(event) => onPlatformChange(event.target.value)}
        >
          <option value="">All Platforms</option>
          {PLATFORMS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="btn btn--outline"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default FilterBar;

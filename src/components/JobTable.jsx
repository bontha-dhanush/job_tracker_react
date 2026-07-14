function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function JobTable({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state card">
        <p>No job applications found.</p>
        <p className="empty-state__hint">Add a new application or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper card">
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Platform</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td data-label="Company">{job.company}</td>
              <td data-label="Job Title">{job.jobTitle}</td>
              <td data-label="Platform">{job.platform}</td>
              <td data-label="Applied Date">{formatDate(job.appliedDate)}</td>
              <td data-label="Status">
                <span className={`status-badge status-badge--${statusClass(job.status)}`}>
                  {job.status}
                </span>
              </td>
              <td data-label="Actions">
                <div className="table-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => onEdit(job)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;

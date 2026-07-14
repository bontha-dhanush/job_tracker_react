import { useMemo, useState } from 'react';
import { useJobs } from '../context/JobContext';
import FilterBar from './FilterBar';
import JobForm from './JobForm';
import JobTable from './JobTable';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import './Dashboard.css';

function Dashboard() {
  const { jobs, addJob, updateJob, removeJob } = useJobs();

  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.company.toLowerCase().includes(query) ||
        job.jobTitle.toLowerCase().includes(query);

      const matchesPlatform = !platformFilter || job.platform === platformFilter;
      const matchesStatus = !statusFilter || job.status === statusFilter;

      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [jobs, search, platformFilter, statusFilter]);

  const handleAddClick = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      removeJob(jobId);
    }
  };

  const handleFormSubmit = (jobData) => {
    if (editingJob) {
      updateJob(editingJob.id, jobData);
    } else {
      addJob(jobData);
    }
  };

  const handleClearFilters = () => {
    setPlatformFilter('');
    setStatusFilter('');
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard__main">
        <div className="dashboard__header">
          <div>
            <h1>Dashboard</h1>
            <p>Track and manage your job applications</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={handleAddClick}>
            + Add Application
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card card">
            <span className="stat-card__label">Total Applications</span>
            <span className="stat-card__value">{jobs.length}</span>
          </div>
        </div>

        <div className="dashboard__toolbar card">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            platform={platformFilter}
            status={statusFilter}
            onPlatformChange={setPlatformFilter}
            onStatusChange={setStatusFilter}
            onClear={handleClearFilters}
          />
        </div>

        <JobTable jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <JobForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialJob={editingJob}
      />
    </div>
  );
}

export default Dashboard;

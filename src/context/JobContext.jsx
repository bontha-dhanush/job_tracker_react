import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as jobService from '../services/jobService';
import { useAuth } from './AuthContext';

const JobContext = createContext(null);

export function JobProvider({ children }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user) {
      setJobs(jobService.getJobs(user.id));
    } else {
      setJobs([]);
    }
  }, [user]);

  const refreshJobs = useCallback(() => {
    if (user) {
      setJobs(jobService.getJobs(user.id));
    } else {
      setJobs([]);
    }
  }, [user]);

  const addJob = useCallback(
    (job) => {
      if (!user) return null;
      const created = jobService.addJob(user.id, job);
      setJobs(jobService.getJobs(user.id));
      return created;
    },
    [user]
  );

  const updateJob = useCallback(
    (jobId, updates) => {
      if (!user) return null;
      const updated = jobService.updateJob(user.id, jobId, updates);
      setJobs(jobService.getJobs(user.id));
      return updated;
    },
    [user]
  );

  const removeJob = useCallback(
    (jobId) => {
      if (!user) return;
      jobService.deleteJob(user.id, jobId);
      setJobs(jobService.getJobs(user.id));
    },
    [user]
  );

  const value = useMemo(
    () => ({
      jobs,
      refreshJobs,
      addJob,
      updateJob,
      removeJob,
    }),
    [jobs, refreshJobs, addJob, updateJob, removeJob]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}

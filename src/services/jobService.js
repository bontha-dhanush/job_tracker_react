function jobsKey(userId) {
  return `jobTracker_jobs_${userId}`;
}

function readJobs(userId) {
  try {
    const data = localStorage.getItem(jobsKey(userId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function writeJobs(userId, jobs) {
  localStorage.setItem(jobsKey(userId), JSON.stringify(jobs));
}

export function getJobs(userId) {
  return readJobs(userId);
}

export function addJob(userId, job) {
  const jobs = readJobs(userId);
  const newJob = {
    ...job,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  writeJobs(userId, jobs);
  return newJob;
}

export function updateJob(userId, jobId, updates) {
  const jobs = readJobs(userId);
  const index = jobs.findIndex((job) => job.id === jobId);

  if (index === -1) {
    return null;
  }

  jobs[index] = { ...jobs[index], ...updates, id: jobId };
  writeJobs(userId, jobs);
  return jobs[index];
}

export function deleteJob(userId, jobId) {
  const jobs = readJobs(userId).filter((job) => job.id !== jobId);
  writeJobs(userId, jobs);
  return jobs;
}

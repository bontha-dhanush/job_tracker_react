export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSignUp({ fullName, email, password, confirmPassword }) {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export function validateSignIn({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function validateJob(job) {
  const errors = {};

  if (!job.company.trim()) {
    errors.company = 'Company name is required';
  }

  if (!job.jobTitle.trim()) {
    errors.jobTitle = 'Job title is required';
  }

  if (!job.platform) {
    errors.platform = 'Platform is required';
  }

  if (!job.appliedDate) {
    errors.appliedDate = 'Applied date is required';
  }

  if (!job.status) {
    errors.status = 'Status is required';
  }

  return errors;
}

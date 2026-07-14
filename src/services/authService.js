const USERS_KEY = 'jobTracker_users';
const SESSION_KEY = 'jobTracker_session';
const REMEMBER_KEY = 'jobTracker_rememberEmail';

function readUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateId() {
  return crypto.randomUUID();
}

export function getRememberedEmail() {
  return localStorage.getItem(REMEMBER_KEY) || '';
}

export function setRememberedEmail(email) {
  if (email) {
    localStorage.setItem(REMEMBER_KEY, email);
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }
}

export function getSession() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function signUp({ fullName, email, password }) {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const newUser = {
    id: generateId(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  };

  users.push(newUser);
  writeUsers(users);

  const session = { id: newUser.id, fullName: newUser.fullName, email: newUser.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { success: true, user: session };
}

export function signIn({ email, password, rememberMe }) {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (entry) => entry.email === normalizedEmail && entry.password === password
  );

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  const session = { id: user.id, fullName: user.fullName, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  if (rememberMe) {
    setRememberedEmail(normalizedEmail);
  } else {
    setRememberedEmail('');
  }

  return { success: true, user: session };
}

export function signOut() {
  clearSession();
}

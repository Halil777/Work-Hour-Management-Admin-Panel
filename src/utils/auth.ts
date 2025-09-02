export type Role = "admin" | "superAdmin" | "manager";

interface Credentials {
  login: string;
  password: string;
}

const USERS: Record<Role, Credentials> = {
  admin: { login: "Fikret", password: "admin123!" },
  superAdmin: { login: "Super Admin", password: "superDisabled123!" },
  manager: { login: "Temur", password: "manager123!" },
};

const STORAGE_KEY = "authUser";

export function authenticate(role: Role, login: string, password: string) {
  const creds = USERS[role];
  if (creds.login === login && creds.password === password) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ role, login }));
    return true;
  }
  return false;
}

export function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "superAdmin", label: "Super Admin" },
  { value: "manager", label: "Manager" },
];


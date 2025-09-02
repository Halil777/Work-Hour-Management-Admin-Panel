export type Role = "admin" | "superAdmin" | "manager";

interface Credentials {
  login: string;
  password: string;
  name: string;
}

const USERS: Record<Role, Credentials> = {
  admin: { login: "Fikret", password: "admin123!", name: "Fikret Emir" },
  superAdmin: {
    login: "Super Admin",
    password: "superDisabled123!",
    name: "Halil Gayypov",
  },
  manager: { login: "Temur", password: "manager123!", name: "Temur" },
};

const STORAGE_KEY = "authUser";

export function authenticate(role: Role, login: string, password: string) {
  const creds = USERS[role];
  if (creds.login === login && creds.password === password) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ role, login, name: creds.name })
    );
    return true;
  }
  return false;
}

export function getCurrentUser():
  | { role: Role; login: string; name: string }
  | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export const roleLabelKeys: Record<Role, string> = {
  admin: "roleAdmin",
  superAdmin: "roleSuperAdmin",
  manager: "roleManager",
};

export const roleOptions = [
  { value: "admin", labelKey: roleLabelKeys.admin },
  { value: "superAdmin", labelKey: roleLabelKeys.superAdmin },
  { value: "manager", labelKey: roleLabelKeys.manager },
];


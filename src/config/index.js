// Centralized app configuration. Never commit real secrets here.
// Values precedence: private.js (gitignored) -> Vite env -> defaults.

const modules = import.meta.glob('./private.*', { eager: true, import: 'default' });
const privateCfg = Object.values(modules)[0] || {};

function readEnv(name, fallback) {
  const v = import.meta.env?.[name];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
}

export const config = {
  apiBaseUrl: privateCfg.apiBaseUrl ?? readEnv('VITE_API_BASE_URL', ''),
  emailServiceUrl: privateCfg.emailServiceUrl ?? readEnv('VITE_EMAIL_SERVICE_URL', ''),
  // NEVER use secrets on the client in production; these are for local demos only
  mongoUri: privateCfg.mongoUri ?? readEnv('VITE_MONGODB_URI', ''),
  openAiKey: privateCfg.openAiKey ?? readEnv('VITE_OPENAI_KEY', ''),
};

export function isBackendConfigured() {
  return Boolean(config.apiBaseUrl);
}

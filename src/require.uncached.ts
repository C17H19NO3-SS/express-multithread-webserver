import "./config/config.json";

export function requireUncached(module: string) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const getEnv = (key: string): string => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const ENV = {
  TMDB_BASE_URL: getEnv("VITE_TMDB_BASE_URL"),
  TMDB_ACCESS_TOKEN: getEnv("VITE_TMDB_ACCESS_TOKEN"),
  TMDB_IMAGE_BASE_URL: getEnv("VITE_TMDB_IMAGE_BASE_URL"),
};

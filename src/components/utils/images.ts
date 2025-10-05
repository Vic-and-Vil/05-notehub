export function tmdbImage(path: string | null, size: "w500" | "original") {
  if (!path) return "";
  const base = "https://image.tmdb.org/t/p/";
  return `${base}${size}${path}`;
}
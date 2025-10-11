import ky from "ky";
import { QueryClient } from "@tanstack/react-query";

const http = ky;

export function tmdbGet(
  path: string,
  searchParams: Record<string, string | number | boolean> = {}
) {
  const sp = new URLSearchParams();

  sp.set("path", path.startsWith("/") ? path : `/${path}`);

  Object.entries(searchParams).forEach(([k, v]) => sp.set(k, String(v)));

  return http.get(`/api/tmdb?${sp.toString()}`);
}

export const queryClient = new QueryClient();

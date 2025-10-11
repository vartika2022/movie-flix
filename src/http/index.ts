import ky from "ky";
import { QueryClient } from "@tanstack/react-query";

import { BASE_TMDB_API_URL, TMDB_ACCESS_TOKEN } from "@/configs";

export const httpClient = ky.extend({
  prefixUrl: '/api/tmdb?path='
});

export const queryClient = new QueryClient();

import { tmdbGet } from "@/http";
import type {
  DiscoverMoviesQueryParams,
  MovieDetailsResponse,
  MovieListResponse,
  SearchMoviesQueryParams
} from "@/types";

export const MovieService = {
  getDiscoverMovies: async ({
    page = 1,
    sort_by = "popularity.desc"
  }: DiscoverMoviesQueryParams) => {
    return tmdbGet("discover/movie", {
      page,
      sort_by,
      "vote_average.gte": 5,
      "vote_count.gte": 100,
      include_adult: false,
      language: "en-US",
    }).json<MovieListResponse>();
  },

  searchMovie: async ({ page = 1, query }: SearchMoviesQueryParams) => {
    return tmdbGet("search/movie", {
      page,
      query: query?.trim() ?? "",
      include_adult: false,
      language: "en-US",
    }).json<MovieListResponse>();
  },

  getMovieDetails: async ({ movieId }: { movieId: number | null }) => {
    if (movieId == null) throw new Error("movieId is required");
    return tmdbGet(`movie/${movieId}`, {
      append_to_response: "credits",
      language: "en-US",
    }).json<MovieDetailsResponse>();
  },

  getMovieGenres: async () => {
    const data = await tmdbGet("genre/movie/list", {
      language: "en-US",
    }).json<{ genres: Array<{ id: number; name: string }> }>();
    return data.genres;
  },
};

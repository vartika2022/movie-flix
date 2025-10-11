import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";
import type { SortBy, MovieListResponse } from "@/types";
import { MovieService } from "../services/movie-service";

type UseGetDiscoverMoviesQueryProps = {
  queryParams?: {
    sortBy: SortBy;
  };
};

export const useGetDiscoverMoviesQuery = (
  { queryParams }: UseGetDiscoverMoviesQueryProps = { queryParams: { sortBy: "popularity.desc" as SortBy } }
) => {
  const sortBy = queryParams?.sortBy ?? ("popularity.desc" as SortBy);

  return useInfiniteQuery<MovieListResponse>({
    queryKey: ["discover_movies", { sortBy }] as QueryKey,

    queryFn: async ({ pageParam = 1 }) => {
      return MovieService.getDiscoverMovies({
        page: pageParam as number,
        sort_by: sortBy,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      const total = Math.min(lastPage.total_pages ?? 1, 500);
      return next <= total ? next : undefined;
    },

    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: (prev) => prev && { pages: [], pageParams: [] },
  });
};

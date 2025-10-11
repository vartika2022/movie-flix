import { useEffect, useState } from "react";
import { httpClient } from "@/http";
import type { MovieListResponse, MovieListItem } from "@/types"; 

export default function HomePage() {
  const [movies, setMovies] = useState<MovieListItem[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await httpClient.get("trending/movie/week").json<MovieListResponse>();
        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    }
    loadMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((m: any) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </div>
  );
}
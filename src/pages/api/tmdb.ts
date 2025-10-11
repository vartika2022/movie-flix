// src/pages/api/tmdb.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Missing path" });
  }

  const r = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER!}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  res.setHeader("Cache-Control", "no-store");

  const data = await r.json();
  return res.status(r.ok ? 200 : r.status).json(data);
}

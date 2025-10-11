import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { path, ...rest } = req.query;
    if (!path) return res.status(400).json({ error: "Missing path" });

    const pathStr = Array.isArray(path) ? path[0] : path;
    const finalPath = pathStr.startsWith("/") ? pathStr : `/${pathStr}`;

    const url = new URL(`https://api.themoviedb.org/3${finalPath}`);
    Object.entries(rest).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach(val => url.searchParams.append(k, String(val)));
      else if (v !== undefined) url.searchParams.set(k, String(v));
    });

    const r = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER ?? ""}`,
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      cache: "no-store",
    });

    res.setHeader("Cache-Control", "no-store");

    const text = await r.text();
    const body = (() => { try { return JSON.parse(text); } catch { return text; } })();

    return res.status(r.ok ? 200 : r.status).json(body);
  } catch {
    return res.status(500).json({ error: "Server error fetching TMDB" });
  }
}
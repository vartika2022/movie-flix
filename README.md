# MovieFlix

A lightweight movie browser built with **Next.js (Pages Router)**, **TypeScript**, and **Tailwind CSS**.  
It uses **TMDB** (The Movie Database) API for data and focuses on good DX/UX: SSR for SEO, debounced search,
loading skeletons, and a simple error boundary.

## ✨ Features
- Server-side rendered landing & search pages for SEO
- Debounced search with query param syncing (`?q=...&page=...`)
- Responsive movie grid, poster optimization via `next/image`
- Loading skeletons while client navigations happen
- Basic error boundary + friendly error UI
- Clean environment setup and image domain config

## 🧱 Tech Stack
- Next.js (Pages Router) + TypeScript
- Tailwind CSS
- TMDB API

## 🔑 Setup

1. **Install deps**
   ```bash
   yarn install
   # or
   npm install

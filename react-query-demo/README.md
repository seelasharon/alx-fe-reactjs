# React Query Demo

This project demonstrates how to use React Query in a React application to fetch, cache, and update data from the JSONPlaceholder API.

## Features
- Fetch posts from https://jsonplaceholder.typicode.com/posts
- Caching and background updates with React Query
- Manual refetching with a button

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Usage
- Posts are fetched and displayed on load.
- Click "Refetch Posts" to manually update the data.
- Data is cached; navigating away and back will show cached data instantly if still valid.

## Dev Tools
For advanced inspection, you can install React Query Devtools:
```bash
npm install @tanstack/react-query-devtools
```

---

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [React Query](https://tanstack.com/query/latest).

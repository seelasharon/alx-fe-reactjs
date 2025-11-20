GitHub User Search

A simple React + Vite application that allows users to search for GitHub profiles and view detailed user information.

Built with React, Vite, Axios, and react-router-dom.

Table of Contents

Features

Project Structure

Installation

Environment Variables

Usage

Dependencies

License

Features

Search for GitHub users by username.

View basic user profile information: avatar, name, bio, followers, following, and repos.

Navigate to detailed user profile pages using React Router.

Minimal and responsive UI.

Configurable environment variables for API key if needed.

Project Structure
github-user-search/
 ├── public/
 ├── src/
 │    ├── assets/          # Images or static files
 │    ├── components/      # React components
 │    │    ├── HomePage.jsx
 │    │    ├── SearchBar.jsx
 │    │    ├── UserCard.jsx
 │    │    └── UserProfile.jsx
 │    ├── services/        # API calls
 │    │    └── githubApi.js
 │    ├── App.jsx
 │    ├── main.jsx
 │    └── index.css
 ├── package.json
 ├── vite.config.js
 └── README.md

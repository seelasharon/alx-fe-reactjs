# GitHub User Search

A modern React application for searching and exploring GitHub users, their profiles, and repositories. Built with React, Vite, and the GitHub API.

## Features

- 🔍 **Search Users** - Find GitHub users by username
- 👤 **View Profiles** - See detailed user information and statistics
- 📦 **Browse Repositories** - Explore user repositories with sorting options
- 🎨 **Modern UI** - Clean and responsive design
- ⚡ **Fast Performance** - Built with Vite for optimal development experience

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **GitHub API** - Backend API for user and repository data

## Project Structure

```
github-user-search/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Layout.jsx     # Main layout component with header and footer
│   │   ├── Layout.css     # Layout styles
│   │   ├── Home.jsx       # Home page component
│   │   └── Home.css       # Home page styles
│   ├── services/          # API services
│   │   └── githubApi.js   # GitHub API service functions
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # App styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-user-search
```

2. Install dependencies:
```bash
npm install
```

**Note for Windows PowerShell users:** If you encounter execution policy errors, use one of these solutions:

- **Option 1:** Use Command Prompt (cmd.exe) instead of PowerShell
- **Option 2:** Temporarily bypass execution policy:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  npm install
  ```
- **Option 3:** Use npm.cmd directly:
  ```powershell
  & "C:\Program Files\nodejs\npm.cmd" install
  ```

### Environment Setup

1. Create a `.env` file in the root directory (if not already present):
```bash
# GitHub API Configuration
# Note: GitHub API doesn't require an API key for basic requests, 
# but you can use a personal access token for higher rate limits
# If you have a GitHub Personal Access Token, uncomment and add it below
# VITE_APP_GITHUB_API_KEY=your_github_personal_access_token_here
```

2. (Optional) Add your GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with appropriate permissions
   - Add it to your `.env` file as `VITE_APP_GITHUB_API_KEY`

**Note:** Without a token, you're limited to 60 requests per hour. With a token, you get 5,000 requests per hour.

## Running the Application

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for Production

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## API Service

The GitHub API service (`src/services/githubApi.js`) provides the following functions:

- `searchUsers(query, page, perPage)` - Search for GitHub users
- `getUser(username)` - Get detailed user information
- `getUserRepos(username, page, perPage)` - Get user repositories

All functions use the GitHub REST API v3 and include error handling.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development

### Adding New Components

1. Create component files in `src/components/`
2. Import and use them in your routes in `App.jsx`

### Adding New Routes

Update `App.jsx` to add new routes:
```jsx
<Route path="/your-route" element={<YourComponent />} />
```

### API Integration

All API calls should go through the `githubApi.js` service file. This ensures consistent error handling and API key management.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the API
- [Vite](https://vitejs.dev/) for the excellent development experience
- [React](https://react.dev/) for the UI framework

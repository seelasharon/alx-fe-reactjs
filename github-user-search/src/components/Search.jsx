import { useState } from 'react';
import { fetchUserData, searchUsersAdvanced, fetchMultipleUsers } from '../services/githubService';

function Search() {
  const [searchMode, setSearchMode] = useState('simple'); // 'simple' or 'advanced'
  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleSimpleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    setUserData(null);
    setUsersList([]);
    
    if (!username.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    setUserData(null);
    setUsersList([]);
    setPage(1);
    
    // At least one field should be filled
    if (!query.trim() && !location.trim() && !minRepos) {
      setError('Please fill at least one search field');
      return;
    }

    setLoading(true);

    try {
      const searchParams = {
        query: query.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : undefined,
        page: 1,
        perPage: 30,
      };
      
      const data = await searchUsersAdvanced(searchParams);
      
      if (data.items && data.items.length > 0) {
        // Fetch detailed user data for each user
        const usernames = data.items.map(item => item.login);
        const detailedUsers = await fetchMultipleUsers(usernames);
        setUsersList(detailedUsers);
        setTotalCount(data.total_count);
        setHasMore(data.items.length === 30 && data.total_count > 30);
      } else {
        setUsersList([]);
        setError('No users found matching your criteria');
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      setUsersList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const searchParams = {
        query: query.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : undefined,
        page: nextPage,
        perPage: 30,
      };
      
      const data = await searchUsersAdvanced(searchParams);
      
      if (data.items && data.items.length > 0) {
        const usernames = data.items.map(item => item.login);
        const detailedUsers = await fetchMultipleUsers(usernames);
        setUsersList(prev => [...prev, ...detailedUsers]);
        setHasMore(data.items.length === 30 && usersList.length + detailedUsers.length < totalCount);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(`Failed to load more: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHub User Search</h1>
          <p className="text-gray-600">Search for GitHub users with advanced filtering options</p>
        </div>

        {/* Search Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
            <button
              onClick={() => {
                setSearchMode('simple');
                setError(null);
                setUserData(null);
                setUsersList([]);
              }}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                searchMode === 'simple'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Simple Search
            </button>
            <button
              onClick={() => {
                setSearchMode('advanced');
                setError(null);
                setUserData(null);
                setUsersList([]);
              }}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                searchMode === 'advanced'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Advanced Search
            </button>
          </div>
        </div>

        {/* Simple Search Form */}
        {searchMode === 'simple' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSimpleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter GitHub username..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !username.trim()}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Advanced Search Form */}
        {searchMode === 'advanced' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Search Criteria</h2>
            <form onSubmit={handleAdvancedSubmit} className="space-y-4">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Name
                </label>
                <input
                  id="query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., john, octocat..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco, New York..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Repositories
                  </label>
                  <input
                    id="minRepos"
                    type="number"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    placeholder="e.g., 10, 50..."
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading || (!query.trim() && !location.trim() && !minRepos)}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? 'Searching...' : 'Search Users'}
              </button>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && searchMode === 'advanced' && usersList.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-6">
            <p className="text-red-800 font-medium">
              {error === 'User not found' ? 'Looks like we cant find the user' : error}
            </p>
          </div>
        )}

        {/* Simple Search Result - Single User */}
        {userData && !loading && !error && searchMode === 'simple' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={userData.avatar_url}
                  alt={`${userData.name || userData.login}'s avatar`}
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {userData.name || userData.login}
                </h3>
                {userData.name && (
                  <p className="text-gray-600 mb-2">@{userData.login}</p>
                )}
                {userData.bio && (
                  <p className="text-gray-700 mb-4">{userData.bio}</p>
                )}
                {userData.location && (
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Location:</span> {userData.location}
                  </p>
                )}
                <div className="flex gap-6 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <span className="text-sm text-gray-600 uppercase tracking-wide">Followers</span>
                    <p className="text-xl font-semibold text-gray-900">{userData.followers}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 uppercase tracking-wide">Following</span>
                    <p className="text-xl font-semibold text-gray-900">{userData.following}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 uppercase tracking-wide">Repositories</span>
                    <p className="text-xl font-semibold text-gray-900">{userData.public_repos}</p>
                  </div>
                </div>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  View GitHub Profile →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Search Results - Multiple Users */}
        {usersList.length > 0 && !loading && !error && searchMode === 'advanced' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-700">
                Found <span className="font-semibold text-gray-900">{totalCount}</span> users
                {usersList.length < totalCount && (
                  <span className="text-gray-500"> (showing {usersList.length})</span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usersList.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={user.avatar_url}
                      alt={`${user.name || user.login}'s avatar`}
                      className="w-24 h-24 rounded-full border-2 border-gray-200 mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {user.name || user.login}
                    </h3>
                    {user.name && (
                      <p className="text-sm text-gray-600 mb-2">@{user.login}</p>
                    )}
                    {user.bio && (
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{user.bio}</p>
                    )}
                    {user.location && (
                      <p className="text-xs text-gray-600 mb-3">
                        📍 {user.location}
                      </p>
                    )}
                    <div className="flex gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Repos</span>
                        <p className="font-semibold text-gray-900">{user.public_repos}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Followers</span>
                        <p className="font-semibold text-gray-900">{user.followers}</p>
                      </div>
                    </div>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading More State */}
        {loading && usersList.length > 0 && (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading more users...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

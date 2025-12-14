import React from 'react';
import { useQuery } from '@tanstack/react-query';

function PostsComponent() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()} disabled={isFetching} style={{marginBottom: '1rem'}}>
        {isFetching ? 'Refreshing...' : 'Refetch Posts'}
      </button>
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;

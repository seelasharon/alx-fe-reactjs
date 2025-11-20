import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGitHubUser } from "../services/githubApi";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchGitHubUser(username);
      setUser(data);
    };
    getUser();
  }, [username]);

  if (!user) return <p>Loading...</p>;
  if (user.message === "Not Found") return <p>User not found.</p>;

  return (
    <div>
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt={user.login} width={150} />
      <p>Name: {user.name || "N/A"}</p>
      <p>Bio: {user.bio || "N/A"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>
        Repos:{" "}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.public_repos}
        </a>
      </p>
    </div>
  );
};

export default UserProfile;

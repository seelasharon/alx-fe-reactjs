const UserCard = ({ user }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <img src={user.avatar_url} alt={user.login} width={50} />
      <h3>{user.login}</h3>
      <p>{user.bio}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;

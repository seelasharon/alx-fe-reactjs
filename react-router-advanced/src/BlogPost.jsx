import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();
  return (
    <div>
      <h2>Blog Post</h2>
      <p>Now viewing post: <b>{postId}</b></p>
    </div>
  );
}

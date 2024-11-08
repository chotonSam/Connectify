import useProfile from "../../hooks/useProfile";
import NewPost from "../posts/NewPost";
import PostList from "../posts/PostList";

export default function MyPosts() {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <NewPost />
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

      <PostList posts={posts} />
    </>
  );
}

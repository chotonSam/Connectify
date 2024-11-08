import { useState } from "react";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  // State for the sort order
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort posts based on the selected order
  const sortedPosts = [...posts].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createAt) - new Date(b.createAt)
      : new Date(b.createAt) - new Date(a.createAt);
  });

  // Event handler for changing sort order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <select
          id="sortOrder"
          className="bg-transparent text-[#B8BBBF] focus:outline-none"
          onChange={handleSortChange}
          value={sortOrder}
        >
          <option className="text-gray-700" value="asc">
            Oldest to Newest
          </option>
          <option className="text-gray-700" value="desc">
            Newest to Oldest
          </option>
        </select>
      </div>
      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}

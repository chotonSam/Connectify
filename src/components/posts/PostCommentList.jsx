import { useState } from "react";
import { getDateDifferenceFromNow } from "../../utils";

const PostCommentList = ({ comments }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  // Sort comments based on createdAt date
  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Handle sorting order change from dropdown
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {/* Flex container to align dropdown to the left */}
      <div className="flex justify-end mb-2 ">
        <select
          id="sortOrder"
          className=" bg-transparent  text-[#B8BBBF]  focus:outline-none "
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option className="text-gray-700" value="asc">
            Oldest to Newest
          </option>
          <option className="text-gray-700" value="desc">
            Newest to Oldest
          </option>
        </select>
      </div>

      {/* Comments list */}
      {sortedComments.map((comment, index) => (
        <div className="flex items-center gap-3 pt-4" key={index}>
          <img
            className="max-w-6 max-h-6 rounded-full"
            src={
              comment?.author?.avatar
                ? `${import.meta.env.VITE_SERVER_BASE_URL}/${
                    comment?.author?.avatar
                  }`
                : "/assets/icons/profile.jpg"
            }
            alt="avatar"
          />
          <div>
            <div className="flex-row gap-1 text-xs lg:text-sm">
              <div className="rounded-lg bg-lighterDark p-2">
                <span className="font-semibold">{comment?.author?.name}: </span>
                <span>{comment?.comment}</span>
              </div>
              <div className="font-extralight text-gray-200 pl-2">
                <span className="text-[11px]">
                  {getDateDifferenceFromNow(comment.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCommentList;

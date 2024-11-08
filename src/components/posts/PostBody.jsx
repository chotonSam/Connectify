import React from "react";

const PostBody = ({ poster, content }) => {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 ">
      <p className="mb-4 text-sm sm:text-base">
        {content ?? "No Content Available"}
      </p>

      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            className="w-1/2"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
};

export default PostBody;

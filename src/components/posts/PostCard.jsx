import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";

import { useState } from "react";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  const [commentModal, setCommentModal] = useState(true);

  return (
    <article className="card mt-6 lg:mt-8">
      {/* header */}
      <PostHeader post={post} setCommentModal={setCommentModal} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction
        post={post}
        commentCount={post?.comments?.length}
        handleModal={() => setCommentModal(!commentModal)}
        commentModal={commentModal}
      />

      {commentModal && <PostComments post={post} />}
    </article>
  );
}

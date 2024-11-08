import { useContext, useState } from "react";
import Swal from "sweetalert2";

import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";

import useAuth from "../../hooks/useAuth";
import useAvatar from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";

import usePost from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";

import { actions } from "../../actions";

import { EditDataContext, PostEntryContext } from "../../context";

import useAxios from "../../hooks/useAxios";

const PostHeader = ({ post, setCommentModal }) => {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const isMe = post?.author?.id == auth?.user?.id;
  const { dispatch } = usePost();
  const { dispatch: ProfileDispatch } = useProfile();
  const { api } = useAxios();

  const { setShowPostEntry } = useContext(PostEntryContext);
  const { editPost, setEditPost } = useContext(EditDataContext);

  function toggleAction() {
    setShowAction(!showAction);
  }

  const handleEditPost = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        setShowPostEntry({
          state: true,
          isEdit: true,
        });
        setShowAction(false);
        setEditPost(response.data);
      }
    } catch (error) {
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  const handleDeletePost = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If the user confirms, call the onDelete function
    if (result.isConfirmed) {
      dispatch({ type: actions.post.DATA_FETCHING });

      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.post.POST_DELETED,
            data: post.id,
          });

          ProfileDispatch({
            type: actions.profile.POST_DELETED,
            data: post.id,
          });

          showAction(true);
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    }
  };
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={
            avatarURL.endsWith("/null")
              ? "/assets/icons/profile.jpg"
              : avatarURL
          }
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt
            )} `}</span>
            <span className="text-sm text-gray-400 lg:text-base"></span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button
              onClick={handleEditPost}
              className="action-menu-item hover:text-lwsGreen"
            >
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={handleDeletePost}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;

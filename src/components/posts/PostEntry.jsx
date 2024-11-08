import { useContext } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import { EditDataContext } from "../../context";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import useUser from "../../hooks/useUser";
import Field from "../common/Field";

export default function PostEntry({ showPostEntry, setShowPostEntry }) {
  const { dispatch } = usePost();
  const { dispatch: profileDispatch } = useProfile();
  const { api } = useAxios();
  const user = useUser();

  const { editPost, setEditPost } = useContext(EditDataContext);

  const onCreate = () => {
    setShowPostEntry({
      state: false,
      isEdit: false,
    });
    setEditPost("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    showPostEntry.isEdit
      ? {
          defaultValues: {
            content: editPost?.content || "",
            photo: null,
          },
        }
      : {
          defaultValues: {
            content: "",
            photo: null,
          },
        }
  );

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    // Create a new FormData object to send
    const data = new FormData();
    data.append("postType", formData.postType || "text");
    data.append("content", formData.content);

    // Check if a file is selected
    if (formData.photo && formData.photo.length > 0) {
      data.append("image", formData.photo[0]);
    }

    if (showPostEntry.isEdit) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${editPost.id}`,
          data
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_EDITED,
            data: response.data,
          });
          profileDispatch({
            type: actions.profile.POST_EDITED,
            data: response.data,
          });
          onCreate();
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    } else {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
          data
        );

        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_CREATED,
            data: response.data,
          });

          profileDispatch({
            type: actions.profile.POST_CREATED,
            data: response.data,
          });
          onCreate(); // Trigger UI update or close modal
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
    <>
      {/* Overlay Background */}
      <div className="fixed  inset-0 bg-black opacity-70" />
      <main className=" sticky z-10 top-52 bottom-52 inset-0 flex items-center justify-center">
        <div className="mx-auto max-w-[1020px] py-8 w-screen">
          <div className="container">
            <div className="card relative ">
              <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                {showPostEntry.isEdit ? "Edit Post" : "Create Post"}
              </h6>
              <button
                onClick={() => onCreate()}
                className="absolute right-3 top-3 transition-all hover:opacity-80 active:scale-95 active:opacity-70"
              >
                <img src="./assets/icons/close.svg" alt="close" />
              </button>

              <form onSubmit={handleSubmit(handlePostSubmit)}>
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="max-w-10 max-h-10 rounded-full "
                      src={
                        user?.avatar
                          ? `${import.meta.env.VITE_SERVER_BASE_URL}/${
                              user?.avatar
                            }`
                          : "/assets/icons/profile.jpg"
                      }
                      alt="avatar"
                    />

                    <div>
                      <h6 className="text-lg lg:text-xl">
                        {`${user?.firstName} ${user?.lastName}`}
                      </h6>
                      <span className="text-sm text-gray-400 lg:text-base">
                        Public
                      </span>
                    </div>
                  </div>

                  <label
                    className="btn-primary cursor-pointer !text-gray-100"
                    htmlFor="photo"
                  >
                    <img
                      className="sm:w-7 w-5"
                      src="./assets/icons/addPhoto.svg"
                      alt="Add Photo"
                    />
                    Add Photo
                  </label>

                  <input
                    type="file"
                    {...register("photo")}
                    name="photo"
                    id="photo"
                    className="hidden"
                    accept="image/*" // Restrict input to image files
                  />
                </div>
                <Field label="" error={errors.content}>
                  <textarea
                    {...register("content", {
                      required: "Adding some text is mandatory!",
                    })}
                    name="content"
                    id="content"
                    placeholder="Share your thoughts..."
                    className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                  ></textarea>
                </Field>

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                  <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                  >
                    {showPostEntry.isEdit ? "Save" : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

import { useContext } from "react";
import { PostEntryContext } from "../../context";
import useUser from "../../hooks/useUser";
import PostEntry from "./PostEntry";

export default function NewPost() {
  const { showPostEntry, setShowPostEntry } = useContext(PostEntryContext);

  const user = useUser();

  return (
    <>
      {showPostEntry.state ? (
        <PostEntry
          showPostEntry={showPostEntry}
          setShowPostEntry={setShowPostEntry}
        />
      ) : (
        <div className="card my-8 py-8">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`
                  : "/assets/icons/profile.jpg"
              }
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={() =>
                  setShowPostEntry({
                    state: true,
                    isEdit: false,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

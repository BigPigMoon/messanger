import { fetcher } from "../http";
import Avatar from "./Avatar";
import useSWR from "swr";

const ChatTopBar = ({ userId }: { userId: number | null }) => {
  const { data } = useSWR(`/users/get?user_id=${userId}`, fetcher);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label
            htmlFor="chat-drawer"
            className="btn btn-ghost btn-circle drawer-button lg:hidden mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          {data && userId && (
            <div className="flex space-x-4 items-center justify-center">
              <Avatar name={data.username} userId={userId} />
              <h2 className="text-2xl font-bold ml-4">{data.username}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatTopBar;

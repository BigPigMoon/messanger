import { fetcher } from "../http";
import Avatar from "./Avatar";
import useSWR from "swr";

type Props = { userId: number };

const TopChatInfo = ({ userId }: Props) => {
  const { data } = useSWR(`/users/get?user_id=${userId}`, fetcher);
  return (
    <>
      {data && userId && (
        <div className="flex space-x-4 items-center justify-center">
          <Avatar name={data.username} userId={userId} />
          <h2 className="text-2xl font-bold ml-4">{data.username}</h2>
        </div>
      )}
    </>
  );
};

export default TopChatInfo;

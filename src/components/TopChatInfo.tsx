import { fetcher } from "../http";
import Avatar from "./Avatar";
import useSWR from "swr";
import { UserType } from "../types";

type Props = { userId: number };

const TopChatInfo = ({ userId }: Props) => {
  const { data } = useSWR<UserType>(`/users/get?user_id=${userId}`, fetcher);

  return (
    <>
      {data && userId && (
        <div className="flex space-x-4 py-4 items-center justify-center">
          <Avatar name={data.name} userId={userId} />
          <h2 className="text-2xl font-bold ml-4">{data.name}</h2>
        </div>
      )}
    </>
  );
};

export default TopChatInfo;

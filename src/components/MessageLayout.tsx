import { fetcher } from "../http";
import useSWR from "swr";
import { UserType } from "../types";
import Messages from "./Messages";
import { useRef } from "react";

type Props = {
  userId: number;
  ws: React.MutableRefObject<WebSocket | undefined>;
};

const MessageLayout = ({ ws, userId }: Props) => {
  const { data: me } = useSWR<UserType>("/users/me", fetcher);
  const { data: other } = useSWR<UserType>(
    `/users/get?user_id=${userId}`,
    fetcher
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="h-full scrollbar-hidden overflow-auto space-y-3 mb-2"
        ref={scrollRef}
      >
        <Messages
          scrollRef={scrollRef}
          userId={userId}
          me={me}
          other={other}
          ws={ws}
        />
      </div>
    </>
  );
};

export default MessageLayout;

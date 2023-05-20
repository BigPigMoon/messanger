import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { fetcher } from "../http";
import { MessageType, UserType } from "../types";
import ChatBubble from "./ChatBubble";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  userId: number;
  me?: UserType;
  other?: UserType;
  ws: React.MutableRefObject<WebSocket | undefined>;
};

const Messages = ({ userId, ws }: Props) => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [firstInit, setFirstInit] = useState(true);
  const [prevScrollBottom, setPrevScrollBottom] = useState(0);

  const { data: me } = useSWR<UserType>("/users/me", fetcher);
  const { data: other } = useSWR<UserType>(
    `/users/get?user_id=${userId}`,
    fetcher
  );

  const { data, mutate, size, setSize } = useSWRInfinite(
    (index) => {
      return `/messages/get?recipient_id=${userId}&limit=50&offset=${index * 50
        }`;
    },
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const messages: Array<MessageType> = data ? [].concat(...data) : [];

  useEffect(() => {
    // Listening on ws new added messages
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const newMessage: MessageType = JSON.parse(event.data);
        if (me && other) {
          if (
            (newMessage.sender_id === me.id &&
              newMessage.recipient_id === other.id) ||
            (newMessage.sender_id === other.id &&
              newMessage.recipient_id === me.id)
          ) {
            mutate();
          }
        }
      };
    }
  }, [ws, me, other]);

  const bottomElement = useRef<HTMLDivElement>(null);
  const outerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && firstInit) {
      bottomElement.current?.scrollIntoView();
      setFirstInit(false);
    }
  }, [data, firstInit]);

  useEffect(() => {
    setFirstInit(true);
  }, [ws, other?.id]);

  useEffect(() => {
    if (outerDiv.current) {
      const outerDivHeight = outerDiv.current.clientHeight;
      const outerDivScrollTop = outerDiv.current.scrollTop;

      if (outerDivHeight < outerDivScrollTop) {
        bottomElement.current?.scrollIntoView();
      } else {
        outerDiv.current.scrollTo({
          top: outerDiv.current.scrollHeight - prevScrollBottom,
        });
      }

      setPrevScrollBottom(outerDiv.current.scrollHeight);
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (outerDiv.current) {
      const outerDivHeight = outerDiv.current.scrollHeight;
      const a = outerDiv.current.clientHeight;
      const outerDivScrollTop = outerDiv.current.scrollTop;

      if (outerDivHeight !== outerDivScrollTop + a) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }

      if (outerDivScrollTop === 0) {
        setSize((prev) => prev + 1);
      }
    }
  }, []);

  const handleScrollButton = useCallback(() => {
    bottomElement.current?.scrollIntoView();
  }, []);

  return (
    <>
      <div
        ref={outerDiv}
        className="h-full overflow-scroll"
        onScroll={handleScroll}
      >
        <div className="space-y-3 mb-2">
          {messages
            .sort((a: MessageType, b: MessageType) => {
              return Date.parse(a.created_at) - Date.parse(b.created_at);
            })
            .map((val: MessageType) => (
              <ChatBubble
                key={val.id}
                left={val.sender_id === userId}
                message={val.message_text}
                createdAt={val.created_at}
              />
            ))}
          <div ref={bottomElement} />
        </div>
      </div>
      {showScrollDown && (
        <div className="indicator absolute bottom-24 right-0 m-10 z-30">
          {/* {newMessage && ( */}
          {/*   <span className="indicator-item indicator-center badge badge-secondary" /> */}
          {/* )} */}
          <button
            onClick={handleScrollButton}
            className="btn btn-circle place-items-center"
          >
            <ChevronDownIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      )}
    </>
  );
};

export default Messages;

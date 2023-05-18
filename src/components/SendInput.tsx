import React, { useState } from "react";
import { UserType } from "../types";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Props = {
  ws: React.MutableRefObject<WebSocket | undefined>;
  userId: number;
  me: UserType;
};

const SendInput = ({ ws, userId, me }: Props) => {
  const [messageBody, setMessageBody] = useState("");

  // sending message function
  const sendMessage = () => {
    if (messageBody && ws.current && me) {
      ws.current.send(
        JSON.stringify({
          sender_id: me?.id,
          recipient_id: userId,
          group_id: null,
          message_text: messageBody,
        })
      );
      setMessageBody("");
    }
  };

  return (
    <>
      <div className="flex max-w-full bg-base-100 m-3 rounded-xl">
        <input
          className="w-full input input-bordered m-2"
          onChange={(e) => {
            setMessageBody(e.target.value);
          }}
          value={messageBody}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Введите сообщение..."
        />
        <div className="w-fit h-full flex items-center justify-center mr-2">
          <PaperAirplaneIcon className="h-8 w-8 text-primary" />
        </div>
      </div>
    </>
  );
};

export default SendInput;

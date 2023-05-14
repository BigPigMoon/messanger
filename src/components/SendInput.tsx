import React, { useState } from "react";

type SendInputProps = {
  send: (
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

const SendInput = () => {
  const [content, setContent] = useState("");

  return (
    <>
      <div className="flex max-w-full bg-base-100 m-3 rounded-xl">
        <input
          className="w-full input input-bordered m-2"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          type="text"
          onKeyDown={(e) => {
            // if (e.key === "Enter") send(content, setContent);
          }}
          placeholder="Введите сообщение..."
        />
        <div className="w-fit h-full flex items-center justify-center mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 flex justify-center items-center cursor-pointer"
            onClick={() => {
              // send(content, setContent);
            }}
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SendInput;

import { useState } from "react";
import { fetcher } from "../http";
import MiniDialog from "./MiniDialog";
import useSWR from "swr";
import { UserType } from "../types";

const SideBar = () => {
  const [selectedChat, setSelectedChat] = useState<number | undefined>(
    undefined
  );

  const { data: me } = useSWR<UserType>("/users/me", fetcher);

  const { data } = useSWR<UserType[]>("/users/all", fetcher);

  return (
    <>
      <div className="w-96 bg-base-100">
        <div className="flex p-4 w-96 justify-normal">
          <input
            type="text"
            autoComplete="false"
            placeholder="Поиск"
            className="input input-bordered w-full max-w-xs"
          />
          <label
            htmlFor="profile-modal"
            className="ml-3 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              color="bg-primary"
              viewBox="0 0 512 512"
            >
              <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" />
              <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
            </svg>
          </label>
        </div>
        <div className="w-full">
          <ul className="menu bg-base-100 w-full">
            {data &&
              me &&
              data.map(
                (val: UserType) =>
                  val.id !== me.id && (
                    <li
                      key={val.id}
                      className={selectedChat === val.id ? "bordered" : ""}
                    >
                      <MiniDialog
                        name={val.username}
                        userId={val.id}
                        key={val.id}
                        onClick={() => setSelectedChat(val.id)}
                      />
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;

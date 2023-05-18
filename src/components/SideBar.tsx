import { useState } from "react";
import { fetcher } from "../http";
import MiniDialog from "./MiniDialog";
import useSWR from "swr";
import { UserType } from "../types";
import { UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  selectedChat: number | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<number | null>>;
  drawerCheckbox: React.RefObject<HTMLInputElement>;
};

const SideBar = ({ selectedChat, setSelectedChat, drawerCheckbox }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const { data: me } = useSWR<UserType>("/users/me", fetcher);

  const { data } = useSWR<UserType[]>("/users/all", fetcher);

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="chat-drawer" className="drawer-overlay"></label>
        <aside className="w-96 bg-base-100">
          <>
            <div className="flex bg-base-100 z-20 p-4 w-96 justify-normal top-0 sticky">
              <input
                type="text"
                autoComplete="false"
                placeholder="Поиск..."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
              <label
                htmlFor="profile-modal"
                className="ml-3 flex justify-center items-center"
                onClick={() => {
                  if (drawerCheckbox.current)
                    drawerCheckbox.current.checked = false;
                }}
              >
                <UserCircleIcon className="w-8 h-8 cursor-pointer text-primary" />
              </label>
            </div>
            <div className="w-full">
              <ul className="menu bg-base-100 w-full">
                {data &&
                  me &&
                  data
                    .filter((value) =>
                      value.username
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                    .map(
                      (val: UserType) =>
                        val.id !== me.id && (
                          <li
                            key={val.id}
                            className={
                              selectedChat === val.id ? "bordered" : ""
                            }
                          >
                            <MiniDialog
                              name={val.username}
                              userId={val.id}
                              key={val.id}
                              onClick={() => {
                                setSelectedChat(val.id);
                                if (drawerCheckbox.current)
                                  drawerCheckbox.current.checked = false;
                              }}
                            />
                          </li>
                        )
                    )}
              </ul>
            </div>
          </>
        </aside>
      </div>
    </>
  );
};

export default SideBar;

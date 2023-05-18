import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
type Props = {
  children?: string | JSX.Element | JSX.Element[];
};

const ChatTopBar = ({ children }: Props) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label
            htmlFor="chat-drawer"
            className="btn btn-ghost btn-circle drawer-button lg:hidden mr-4"
          >
            <Bars3BottomLeftIcon className="w-8 h-8 text-primary cursor-pointer" />
          </label>
          {children}
        </div>
      </div>
    </>
  );
};

export default ChatTopBar;

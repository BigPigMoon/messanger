import Avatar from "./Avatar";

type MiniDialogProps = {
  name: string;
  userId: number;
  lastMessage?: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  readed?: boolean;
};
// TODO: large test should cut and replace on "..."

const MiniDialog = ({
  readed,
  name,
  userId,
  lastMessage,
  onClick,
}: MiniDialogProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className="card card-side w-full rounded-none space-x-0"
      >
        <Avatar userId={userId} name={name} />
        <div className="card-body">
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="card-title text-ellipsis whitespace-nowrap overflow-hidden text-sm">
                {name}
              </h2>
              <p>{lastMessage}</p>
            </div>
            {readed && (
              <div className="flex w-full h-full items-center justify-end ">
                <div className="badge badge-md badge-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniDialog;

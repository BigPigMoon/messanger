import { useEffect, useState } from "react";
import $api from "../http";

const Avatar = ({ userId, name }: { userId: number; name: string }) => {
  const [avatar, setImgUrl] = useState<string | null>("");

  useEffect(() => {
    $api
      .get(`/users/avatar/download?user_id=${userId}`, { responseType: "blob" })
      .then((res) => {
        setImgUrl(URL.createObjectURL(res.data));
      })
      .catch((e) => {
        if (e.response) {
          const status: number = e.response.status;
          if (status === 404) {
            setImgUrl(null);
          }
        }
      });
  }, [userId, avatar]);

  return (
    <>
      <figure className="flex self-center h-full justify-center">
        {avatar ? (
          <div className="avatar w-16 h-16">
            <div className="rounded-full w-16 h-16">
              <img src={avatar} alt="avatar" />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder h-full items-center">
            <div className="bg-primary text-neutral-content rounded-full w-16 h-16">
              <span className="text-3xl text-base-100">
                {name[0].toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </figure>
    </>
  );
};

export default Avatar;

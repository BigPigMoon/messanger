import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $api, { fetcher } from "../http";
import { useToken } from "../store";
import useSWR from "swr";
import { UserType } from "../types";
import Avatar from "./Avatar";
import { useState } from "react";
import Alert from "./Alert";

const ModalSettings = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [newName, setNewName] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 7000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showAlert]);

  const { data: me, mutate } = useSWR<UserType>("/users/me", fetcher);

  const navigate = useNavigate();

  const logout = () => {
    $api.post("/auth/logout").then(() => {
      useToken.setState({ access: "", refresh: "" });
    });
    navigate("/signin");
  };

  const getExtension = (filename: string) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const isImage = (filename: string) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
        //etc
        return true;
    }
    return false;
  };

  const changeAvatar = async () => {
    const avatarData = new FormData();

    if (avatar) {
      if (!isImage(avatar.name)) {
        setShowAlert(true);
        setAlertMessage(
          "Этот файл не картинка.\nДопустимые типы - jpg, gif, bpm, png."
        );
        return;
      }
      avatarData.append("file", avatar);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await $api.post("/avatar/upload", avatarData, config);
    }
  };

  const changeName = async () => {
    if (newName.length === 0) {
      return;
    }

    $api.post<UserType>("/users/edit", { username: newName }).then((res) => {
      if (me) {
        mutate({ ...me, username: res.data.username });
      }
    });
  };

  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <h3 className="text-lg font-bold">Настройки</h3>
      {me && (
        <div className="flex flex-col items-center justify-center w-full mt-5">
          <Avatar userId={me.id} name={me.username} />
          <h1 className="text-lg font-bold h-full self-center mt-4">
            {me.username}
          </h1>
        </div>
      )}
      <div className="flex flex-col mt-8 space-y-4 w-full">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
          <input
            className="input input-bordered w-full"
            placeholder={me?.username}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={changeName}>
            Изменить имя
          </button>
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
          <input
            type="file"
            className="file-input file-input-primary file-input-bordered"
            onChange={(event) => {
              if (event.target.files) setAvatar(event.target.files[0]);
            }}
          />
          <button className="btn btn-primary" onClick={changeAvatar}>
            Изменить аватар
          </button>
        </div>
        <button className="btn btn-primary" onClick={logout}>
          Выйти
        </button>
      </div>
    </>
  );
};

export default ModalSettings;

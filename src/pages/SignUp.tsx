import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../store";
import { API_URL } from "../http";
import Alert from "../components/Alert";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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

  const navigate = useNavigate();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowAlert(false);

    if (password !== repeatPassword) {
      setShowAlert(true);
      setAlertMessage("Пароли не совпадают!");
      return;
    }

    // TODO: password not secure
    if (
      !password.match(
        /^(?=.*[A-Za-z0-9])(?=.*)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm
      )
    ) {
      setShowAlert(true);
      setAlertMessage(
        "Пароль не безопасен!\nПароль должен содержать хотя бы одну заглавную и прописную букву, и специальный символ (@$!%*#?&)"
      );
      return;
    }

    axios
      .post(`${API_URL}/auth/signup`, {
        username: login,
        password: password,
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data;
        useToken.setState({ access: access_token, refresh: refresh_token });
        navigate("/");
      })
      .catch((e) => {
        if (e.response) {
          const status: number = e.response.status;
          if (status === 409) {
            setShowAlert(true);
            setAlertMessage("Такой пользователь уже существует!");
          }
        }
      });
  };

  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <div className="hero bg-base-200">
        <div className="hero-content min-h-screen flex-col lg:flex-row-reverse">
          <div className="flex card card-side bg-base-100 shadow-2xl md:w-3/5 lg:w-full">
            <figure className="w-0 lg:w-fit h-max">
              <img src="/images/abstraction.png" alt="abstraction" />
            </figure>
            <div className="card-body md:w-screen lg:w-3/5">
              <form onSubmit={submit}>
                <Input
                  required={true}
                  name="Логин"
                  type="text"
                  setVar={setLogin}
                  placeholder="Логин *"
                />
                <Input
                  required={true}
                  name="Пароль"
                  type="password"
                  setVar={setPassword}
                  placeholder="Пароль *"
                />
                <Input
                  required={true}
                  name="Поддтвердите пароль"
                  type="password"
                  setVar={setRepeatPassword}
                  placeholder="Введите пароль повторно *"
                />

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                  </button>
                </div>

                <div className="form-control mt-6">
                  <Link to="/signin" className="btn btn-outline btn-primary">
                    У меня уже есть аккаунт
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../http";
import { useToken } from "../store";
import Alert from "../components/Alert";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showAlert]);

  const navigate = useNavigate();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${API_URL}/auth/login`, {
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
          if (status === 401) {
            setShowAlert(true);
            setAlertMessage("Не верный логин или пароль!");
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
            <figure className="w-0 lg:w-fit">
              <img src="/images/abstraction.png" alt="abstraction" />
            </figure>
            <div className="card-body md:w-screen lg:w-3/5">
              <form className="form-control" onSubmit={submit}>
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
                {/* <label className="label">
                <Link to="/" className="label-text-alt link link-hover">
                Забыли пароль?
                </Link>
              </label> */}

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Войти
                  </button>
                </div>

                <div className="form-control mt-6">
                  <Link to="/signup" className="btn btn-outline btn-primary">
                    Зарегистрироваться
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

export default SignIn;

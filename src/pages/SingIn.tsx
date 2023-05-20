import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../http";
import { useToken } from "../store";
import Alert from "../components/Alert";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    axios
      .post(`${API_URL}/auth/login`, {
        email: email,
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
        <div className="hero-content min-h-screen">
          <div className="flex flex-col lg:flex-row card card-side bg-base-100 shadow-2xl w-full">
            <div className="lg:w-1/2 mt-10 ml-10 mr-10">
              <div className="flex flex-col justify-center items-center max-h-max">
                <h1 className="text-6xl text-center font-bold whitespace-nowrap">
                  С возвращением!
                </h1>
              </div>
            </div>
            <div className="card-body lg:w-1/2">
              <form className="form-control" onSubmit={submit}>
                <Input
                  required={true}
                  name="Почта"
                  type="email"
                  setVar={setEmail}
                  placeholder="Почта *"
                />
                <Input
                  required={true}
                  name="Пароль"
                  type="password"
                  setVar={setPassword}
                  placeholder="Пароль *"
                />
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

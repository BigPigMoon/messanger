import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useEffect } from "react";

const SignIn = () => {
  useEffect(() => {
    let ws = new WebSocket("wss://bigeny.ru/api/messages/ws/messanger/1");

    ws.onopen = (e) => {
      ws.send("hello world");
    };
  }, []);

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content min-h-screen flex-col lg:flex-row-reverse">
          <div className="flex card card-side bg-base-100 shadow-2xl md:w-3/5 lg:w-full">
            <figure className="w-0 lg:w-fit">
              <img src="/images/abstraction.png" alt="abstraction" />
            </figure>
            <div className="card-body md:w-screen lg:w-3/5">
              <Input
                name="Логин"
                type="text"
                setVar={() => {}}
                placeholder="Логин *"
              />
              <Input
                name="Пароль"
                type="password"
                setVar={() => {}}
                placeholder="Пароль *"
              />
              <label className="label">
                <Link to="/" className="label-text-alt link link-hover">
                  Забыли пароль?
                </Link>
              </label>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Войти</button>
              </div>

              <div className="form-control mt-6">
                <Link to="/signup" className="btn btn-outline btn-primary">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

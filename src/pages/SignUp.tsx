import { Link } from "react-router-dom";
import Input from "../components/Input";

const SignUp = () => {
  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content min-h-screen flex-col lg:flex-row-reverse">
          <div className="flex card card-side bg-base-100 shadow-2xl md:w-3/5 lg:w-full">
            <figure className="w-0 lg:w-fit h-max">
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

              <Input
                name="Поддтвердите пароль"
                type="password"
                setVar={() => {}}
                placeholder="Введите пароль повторно *"
              />

              <div className="form-control mt-6">
                <button className="btn btn-primary">Зарегистрироваться</button>
              </div>

              <div className="form-control mt-6">
                <Link to="/signin" className="btn btn-outline btn-primary">
                  У меня уже есть аккаунт
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

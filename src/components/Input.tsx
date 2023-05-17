type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  setVar: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ name, required, type, placeholder, setVar }: InputProps) => {
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{name}</span>
        </label>
        <input
          required={required}
          autoComplete={type === "password" ? "current-password" : "on"}
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setVar(e.target.value);
          }}
          className={"input input-bordered"}
        />
      </div>
    </>
  );
};

export default Input;

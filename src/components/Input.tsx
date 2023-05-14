type InputProps = {
  type: string;
  name: string;
  error?: boolean;
  placeholder?: string;
  setVar: React.Dispatch<React.SetStateAction<string>>;
};

const Input = (props: InputProps) => {
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{props.name}</span>
        </label>
        <input
          autoComplete={props.type === "password" ? "current-password" : "on"}
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => {
            props.setVar(e.target.value);
          }}
          className={`input input-bordered ${props.error && "input-error"}`}
        />
      </div>
    </>
  );
};

export default Input;

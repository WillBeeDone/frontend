import { JSX } from "react";
import Button from "../button/Button";
import MyInput from "../myInput/MyInput";
import "./LoginForm.css";

function LoginForm():JSX.Element {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    alert("Cool!");
  }

  return (
    <form className="form" onSubmit={handleSubmit} action="">
      <MyInput
        className="input"
        name={"login"}
        type={"text"}
        placeholder={"login"}
        label={"Login: "}
        require={true}
      />
      <MyInput
        className="input"
        name={"email"}
        type={"email"}
        placeholder={"email"}
        label={"Your email: "}
        require={false}
      />
      <MyInput
        className="input"
        name={"password"}
        type={"password"}
        placeholder={"password"}
        label={"Password: "}
        require={false}
      />

      <Button className="submitButton" text="Finish" type="submit" />
    </form>
  );
}
export default LoginForm;

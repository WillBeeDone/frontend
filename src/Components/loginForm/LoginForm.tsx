import { JSX } from "react";
import Button from "../button/Button";
<<<<<<< HEAD
import MyInput from "../keyWordInput/KeyWordInput";
import ".//LoginForm.css";
=======
import MyInput from "../myInput/MyInput";
import "./LoginForm.css";
>>>>>>> b89861218eff363f519c4a822f6c6b4c1c1b2cad

function LoginForm(): JSX.Element {
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

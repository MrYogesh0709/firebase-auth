import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebaseConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IFormInput } from "../signIn/SignIn";
import { FirebaseError } from "firebase/app";
import GithubLogo from "../../GithubLogo";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
  const schema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(passwordRules, { message: "Please create strong password" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const auth = getAuth(app);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      setError((error as FirebaseError)?.message.slice(9));
    }
  };

  return (
    <div className="app">
      <h1 className="mt-2 d-flex flex-center">Registration</h1>
      <div className="line"></div>
      <form
        className="mt-2 d-flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex">
          <label htmlFor="email">
            Email{"  "}
            <span>&#58;</span>
          </label>
          <div className="d-flex flex-col input-field">
            <input
              type="email"
              {...register("email")}
              id="email"
              className="input"
            />
            <p className="">{errors.email?.message}</p>
          </div>
        </div>
        <div className="d-flex">
          <label htmlFor="password">
            Password {"  "}
            <span>&#58;</span>
          </label>
          <div className="d-flex flex-col input-field">
            <input
              type="password"
              {...register("password")}
              id="password"
              className="input"
            />
            <p className="">{errors.password?.message}</p>
          </div>
        </div>
        <div className="text-center  error">{error}</div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <div className="text-center mt-2">
        Already have an account ? <Link to="/sign-in">Sign In</Link>{" "}
      </div>
      <GithubLogo />
    </div>
  );
};

export default SignUp;

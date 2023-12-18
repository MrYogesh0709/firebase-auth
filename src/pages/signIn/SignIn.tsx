import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebaseConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FirebaseError } from "firebase/app";
import GithubLogo from "../../GithubLogo";
import { UserContext } from "../../UserContext";

export interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const userContext = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const schema = object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      setError((error as FirebaseError)?.message.slice(9));
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError((error as FirebaseError)?.message.slice(9));
    }
  };

  if (userContext?.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app">
      <h1 className="mt-2 d-flex flex-center">Login</h1>
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
        {error && <div className="text-center error">{error}</div>}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <div className="d-flex flex-center mt-1">
        <button className="btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <div className="text-center mt-2">
        Don't have an account ? <Link to="/sign-up">Sign Up</Link>{" "}
      </div>
      <GithubLogo />
    </div>
  );
};

export default SignIn;

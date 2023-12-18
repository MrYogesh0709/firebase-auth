import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import GithubLogo from "../../GithubLogo";
import { UserContext } from "../../UserContext";

export const Landing = ({ loading }: { loading: boolean }) => {
  const userContext = useContext(UserContext);

  if (loading) {
    return <main className="app mt-2">loading</main>;
  }

  return userContext?.user ? (
    <>
      <Outlet />
      <GithubLogo />
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

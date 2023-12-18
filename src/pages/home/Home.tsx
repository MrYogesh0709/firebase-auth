import { getAuth, signOut } from "firebase/auth";
import logout from "../../assets/logout.svg";
import { app } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      userContext?.setUser(null);
      navigate("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <main className="app mt-2">
      <img
        src={logout}
        alt="logout"
        className="logout"
        onClick={handleLogout}
      />
      <h1>Hello</h1>
      <h3 className="mt-2">{userContext?.user}</h3>
    </main>
  );
};

export default Home;

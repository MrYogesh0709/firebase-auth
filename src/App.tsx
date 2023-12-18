import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import { Landing } from "./pages/landing/Landing";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";
import { UserContext } from "./UserContext";

const App = () => {
  const auth = getAuth(app);
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email;
        userContext?.setUser(email);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, userContext]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing loading={loading} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

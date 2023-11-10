import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { addUser } from "./redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "./layout/MainLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./pages/Product";

const App = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <MainLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:id",
          element: <Product />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("You are already logged in");
        dispatch(addUser(user));
      } else {
        console.log("Please login or sign up before using this website");
      }
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;

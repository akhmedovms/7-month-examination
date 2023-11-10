import { signUpLoginWithGoogle } from "../firebase/firebaseConfig";
import { addUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const signUpLogin = () => {
    signUpLoginWithGoogle()
      .then((user) => {
        dispatch(addUser(user.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className=" text-center p-4 rounded-md">
        {!user && (
          <h1 className="my-5 text-2xl flex gap-2 items-center">
            <FcGoogle className="text-4xl" />
            Log in With Google
          </h1>
        )}
        <button onClick={signUpLogin} className="btn btn-neutral">
          Sign Up / Log In
        </button>
      </div>
    </div>
  );
}

export default Login;

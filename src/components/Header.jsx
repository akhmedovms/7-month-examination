import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/features/userSlice";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const logoutUser = () => {
    logout();
    dispatch(removeUser());
  };
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">
              Hello,{" "}
              {user.providerData.map((data) => {
                return <span key={data}>{data.displayName}</span>;
              })}
            </p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={logoutUser}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;

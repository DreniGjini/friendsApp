import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserIcon } from "@heroicons/react/24/outline";
import Notifications from "./Notifications";
import Invitations from "./Invitations";
import Dropdown from "../../shared/dropDown";
import { logOut } from "../../../redux/features/authSlice";

const Sign = () => {
  const { isAuth, username, token } = useAppSelector(
    (state) => state.authReducer.value
  );

  const dispatch = useAppDispatch();
  console.log(token);
  return (
    <>
      {!isAuth ? (
        <div className="flex text-white gap-5">
          <Link to={"/account/sign-up"}>Register</Link> |{" "}
          <Link to="/account/sign-in">Login</Link>
        </div>
      ) : (
        <div className="text-white flex gap-5">
          <Notifications />
          <Invitations />
          <Dropdown iniciator={<UserIcon className="w-6 h-6" />}>
            <p className="font-semibold border-b border-gray-300 mb-2 pb-2">
              {username}
            </p>
            <button
              className="w-full text-left"
              onClick={() => dispatch(logOut())}
            >
              Sign out
            </button>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default Sign;

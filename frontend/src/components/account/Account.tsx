import { NavLink, Outlet } from "react-router-dom";
import Header from "../header/Header";

const Account = () => {
  return (
    <>
      <Header />
      <div className="mx-auto w-96 bg-gray-500 mt-14 rounded-3xl text-white p-5">
        <div className="flex justify-between mb-6">
          <CustomLink name="Sign up" to="sign-up" />
          <CustomLink name="Sign in" to="sign-in" />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Account;

const CustomLink = ({ to, name }: { to: string; name: string }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `w-full h-12 items-center justify-center flex transition-colors rounded-2xl font-semibold duration-300 hover:text-white ${
          isActive ? "bg-gray-400" : "text-gray-400"
        }`
      }
      to={to}
    >
      {name}
    </NavLink>
  );
};

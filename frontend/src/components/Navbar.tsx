import { Link } from "react-router-dom";
import { useLoginStore } from "../store/authStore";
const Navbar = () => {
  const { user } = useLoginStore();
  return (
    <nav className="flex w-full justify-between px-3 py-3 lg:px-10 bg-white shadow-md items-center">
      <div>
        <img
          src="https://centennialinfotech.com/img/logo.png"
          alt="logo"
          className=" h-18"
        />
      </div>
      <ul className="flex gap-1 text-sm lg:text-lg font-medium lg:gap-4">
        {user && <Link to="/add-candidate">
        <li className="text-cyan-600 hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg">
          Add Candidate
        </li>
        </Link>}

        {user && <Link to="all-candidate">
        <li className="text-cyan-600 hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg">
          All Candidate
        </li>
        </Link>}
      </ul>
    </nav>
  );
};

export default Navbar;

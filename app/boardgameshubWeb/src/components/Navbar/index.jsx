import logo from "../../static/logo.svg";
import { CiSearch } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from "../../stores/useUserStore";

const Navbar = () => {
  const navigate = useNavigate();
  const logged = useUserStore((state) => state.logged);
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state)=> state.logout)

  const handleSearch = (e) => {
    navigate(`/search?query=${encodeURI(e.target[0].value)}`);
  }

  if (!logged) {
    var buttons = (
      <div className="flex">
        <Link to="/login">
          <button className="rounded-xl flex p-4 pt-2 pb-2 mr-4 justify-center items-center bg-primary text-text">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="rounded-xl flex p-3 pt-2 pb-2 mr-2 justify-center items-center bg-primary text-text">
            Register
          </button>
        </Link>
      </div>
    );
  } else {
    var buttons = (
      <div className="flex">
        <div className="rounded-xl flex p-3 pt-2 pb-2 mr-2 justify-center items-center bg-primary text-text">
          {username}
        </div>
        <button className="rounded-xl flex p-3 pt-2 pb-2 mr-2 justify-center items-center bg-primary text-text" onClick={()=>logout()}>
          Logout
        </button>
      </div>
    );
  }

    return (
        <div className="bg-navbar w-full">
          <div className="max-w-7xl mx-auto py-4 lg:px-8 relative">
              <div className="flex items-center">
                <Link to="/"><img alt="logo" className="mr-3" src={logo} /></Link>
                <div className="lg:flex ml-auto">
                  <div className="bg-white flex w-auto pt-2 pb-2 pr-3 pl-3 rounded-lg mr-10">
                    <span className="self-center"><CiSearch /></span>
                    <form onSubmit={handleSearch}>
                      <input name="q" type="text" className="ml-2 text-black w-auto outline-none" placeholder="Search..." autoComplete="off"></input>
                    </form>
                  </div>
                  {buttons}
                </div>
            </div>
          </div>
        </div>
    );
  }
  
  export default Navbar;
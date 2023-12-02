import logo from "../../static/logo.svg"
import { CiSearch } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?query=${encodeURI(query)}`);
  }

    return (
        <div className="bg-navbar w-full">
          <div className="max-w-7xl mx-auto py-4 lg:px-8 relative">
              <div className="flex items-center">
                <Link to="/"><img className="mr-3" src={logo} /></Link>
                <div className="lg:flex ml-auto">
                  <div className="bg-white flex w-auto pt-2 pb-2 pr-3 pl-3 rounded-lg mr-10">
                    <span className="self-center"><CiSearch /></span>
                    <form onSubmit={handleSearch}>
                      <input onChange={(e) => setQuery(e.target.value)} name="q" type="text" className="ml-2 text-black w-auto outline-none" placeholder="Search..." autocomplete="off"></input>
                    </form>
                  </div>
                  <button className="rounded-xl flex p-4 pt-2 pb-2 mr-4 justify-center items-center bg-primary text-text">Login</button>
                  <button className="rounded-xl flex p-3 pt-2 pb-2 mr-2 justify-center items-center bg-primary text-text">Register</button>
                </div>
            </div>
          </div>
        </div>
    );
  }
  
  export default Navbar;
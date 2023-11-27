import logo from "../../static/logo.svg"

function Navbar() {
    return (
      <div className="bg-background">
        <div className="bg-navbar/20 sticky w-full flex-none">
          <div className="max-w-7xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
              <div className="relative flex items-center">
                <img className="mr-3" src={logo} />
                <div className="relative hidden lg:flex items-center ml-auto">
                  <div className="bg-white flex w-auto pt-2 pb-2 pr-3 pl-3 rounded-lg mr-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path d="M21.75 21.1895L16.086 15.5255C17.4471 13.8914 18.1258 11.7956 17.981 9.67389C17.8361 7.55219 16.8789 5.56801 15.3084 4.1341C13.7379 2.7002 11.675 1.92697 9.54893 1.97528C7.42284 2.02359 5.39723 2.88971 3.89347 4.39347C2.38971 5.89723 1.52359 7.92284 1.47528 10.0489C1.42697 12.175 2.2002 14.2379 3.6341 15.8084C5.06801 17.3789 7.05219 18.3361 9.17389 18.481C11.2956 18.6258 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.91494 3.39585 7.6099 4.13754 6.49987C4.87924 5.38983 5.93345 4.52467 7.16685 4.01378C8.40025 3.50289 9.75745 3.36921 11.0668 3.62966C12.3762 3.89011 13.5789 4.53299 14.5229 5.47699C15.4669 6.421 16.1098 7.62373 16.3703 8.9331C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0207C3.71375 13.7553 3.00195 12.0396 2.99996 10.25Z" fill="black"/>
                    </svg>
                    <input className="ml-2 text-black w-auto outline-none" placeholder="Search..." autocomplete="off"></input>
                  </div>
                  <button className="rounded-xl flex p-4 pt-2 pb-2 mr-4 justify-center items-center bg-primary text-text">Login</button>
                  <button className="rounded-xl flex p-3 pt-2 pb-2 mr-2 justify-center items-center bg-primary text-text">Register</button>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;
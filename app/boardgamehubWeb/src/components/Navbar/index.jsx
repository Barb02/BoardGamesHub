import logo from "../../static/logo.svg"

function Navbar() {
    return (
      <div className="bg-background w-full h-20 flex justify-between items-center shrink-0 pr-16 pl-16 pt-5 pb-5">
        <img className="h-[72px] w-[145px] " src={logo} />
        <div className="bg-white flex w-[920px] pt-2 pb-2 pr-3 pl-3 gap-5 items-start rounded-lg border-black border-solid border-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M21.75 21.1895L16.086 15.5255C17.4471 13.8914 18.1258 11.7956 17.981 9.67389C17.8361 7.55219 16.8789 5.56801 15.3084 4.1341C13.7379 2.7002 11.675 1.92697 9.54893 1.97528C7.42284 2.02359 5.39723 2.88971 3.89347 4.39347C2.38971 5.89723 1.52359 7.92284 1.47528 10.0489C1.42697 12.175 2.2002 14.2379 3.6341 15.8084C5.06801 17.3789 7.05219 18.3361 9.17389 18.481C11.2956 18.6258 13.3914 17.9471 15.0255 16.586L20.6895 22.25L21.75 21.1895ZM2.99996 10.25C2.99996 8.91494 3.39585 7.6099 4.13754 6.49987C4.87924 5.38983 5.93345 4.52467 7.16685 4.01378C8.40025 3.50289 9.75745 3.36921 11.0668 3.62966C12.3762 3.89011 13.5789 4.53299 14.5229 5.47699C15.4669 6.421 16.1098 7.62373 16.3703 8.9331C16.6307 10.2425 16.497 11.5997 15.9862 12.8331C15.4753 14.0665 14.6101 15.1207 13.5001 15.8624C12.39 16.6041 11.085 17 9.74996 17C7.96036 16.998 6.24463 16.2862 4.97919 15.0207C3.71375 13.7553 3.00195 12.0396 2.99996 10.25Z" fill="black"/>
          </svg>
          <input className="text-center text-black w-auto" placeholder="Search..."></input>
        </div>
        <button className="rounded-xl flex pt-[10px] pb-[10px] pr-5 pl-5 justify-center items-center gap-[10px] bg-primary text-text">Login</button>
        <button className="rounded-xl flex pt-[10px] pb-[10px] pr-5 pl-5 justify-center items-center gap-[10px] bg-primary text-text">Register</button>
      </div>
    );
  }
  
  export default Navbar;
import { Navbar,Footer } from "../../components";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
      <div className="w-full h-full">
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&family=IBM+Plex+Mono&display=swap" rel="stylesheet"></link>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;
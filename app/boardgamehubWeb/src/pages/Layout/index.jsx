import { Navbar,Footer } from "../../components";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
      <div className="w-full h-full">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;
import { Navbar,Footer } from "../../components";


function Layout({children}) {
    return (
      <div className="bg-red-400 w-full h-full">
        <Navbar/>
          {children}
        <Footer/>
      </div>
    );
  }
  
  export default Layout;
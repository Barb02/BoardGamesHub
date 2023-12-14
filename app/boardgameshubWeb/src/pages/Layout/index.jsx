import { Navbar,Footer } from "../../components";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";


function Layout() {
    return (
      <div className="w-full h-full">
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&family=IBM+Plex+Mono&display=swap" rel="stylesheet"></link>
        <link href='http://fonts.googleapis.com/css?family=Josefin+Sans&subset=latin,latin-ext' rel='stylesheet' type='text/css'></link>
        <ScrollToTop />
        <Navbar/>
        <div className="bg-background min-h-screen"><Outlet/></div>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;
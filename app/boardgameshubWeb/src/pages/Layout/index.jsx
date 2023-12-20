import { useState } from "react";
import { Navbar,Footer,ScrollToTop,UserBar } from "../../components";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotificationSpace from "../../components/NotificationSpace";




function Layout() {
    const [showSidePanel,setShowSidePanel] = useState(false);


    return (
      <div className="w-full h-full">
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Alatsi&family=IBM+Plex+Mono&display=swap" rel="stylesheet"></link>
        <link href='http://fonts.googleapis.com/css?family=Josefin+Sans&subset=latin,latin-ext' rel='stylesheet' type='text/css'></link>
        <AnimatePresence>
          {showSidePanel && <UserBar deactivateUser={()=>setShowSidePanel(false)}/>}
        </AnimatePresence>
        <NotificationSpace/>
        <ScrollToTop />
        <Navbar activateUser={()=>setShowSidePanel(true)}/>
        <div className="bg-background min-h-screen"><Outlet/></div>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;
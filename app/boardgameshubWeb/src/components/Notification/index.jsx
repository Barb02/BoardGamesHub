import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

function Notification({ className, text,time,closeFunct,boolToappear }) {

    useEffect(()=>{
        const timer = setTimeout(()=>{closeFunct()},(time)*1000)

        return () => clearTimeout(timer);
    },[boolToappear])

  return (
    <AnimatePresence>
      {boolToappear &&<motion.div className={className} 
          initial={{x:900}}
          animate={{x:0}}
          exit={{x:900}}
          transition={{duration:0.2}}    
      >
        <div className={`relative rounded-lg overflow-hidden bg-primary text-text h-12 p-2 m-2`}>
          <div className="flex justify-between">
              <div className="">{text}</div>
              <IoClose onClick={closeFunct} className=" cursor-pointer"/>
          </div>
          <motion.div
            initial={{x:"0%"}}
            animate={{ x:"100%"}}
            transition={{ duration: time }}
            className={" absolute bottom-0 bg-white h-[2px] mx-auto w-full"}
          ></motion.div>
        </div>
      </motion.div>}
    </AnimatePresence>
  );
}

export default Notification;

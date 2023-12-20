import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

function NotificationToSpace({ className,closeFunct,ele }) {


  return (
      <motion.div className={className} 
          initial={{x:900}}
          animate={{x:0}}
          exit={{x:900}}
          transition={{duration:0.2}}
      >
        <div className={`relative rounded-lg overflow-hidden bg-primary text-text px-2 py-1 m-2`}>
          <div className="flex justify-between place-items-center">
              <div className="">{ele.name}</div>
              <IoClose onClick={closeFunct} className=" cursor-pointer"/>
          </div>
        </div>
      </motion.div>
  );
}

export default NotificationToSpace;

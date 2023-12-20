import { useState } from "react";
import { NotificationToSpace } from "../../components";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import accountService from "../../services/accountService";
import { useInterval } from "../../hooks";
import { useUserStore } from "../../stores/useUserStore";


function NotificationSpace(){
    const [notification,setNotification] = useState([]);
    const logged = useUserStore((state)=>state.logged)
    const [pricesWishlist,setPricesWhislis] = useState([])
    
    const add = (str)=>{
        setNotification([...notification,str]);
    }

    const remove = (ele)=>{
        setNotification(notification.filter(a => a.id!=ele.id));
    }

    const fetchPrice = ()=>{
        if (logged){
            accountService.getPricesWishlist().then((data)=>{
                if (pricesWishlist.length > 0){
                    data.map((element)=>{
                        let found = pricesWishlist.find(a=>a.game_id == element.game_id)
                        if (found && element.price < found.price){
                            let price = (Math.round(Math.abs(found.price - element.price) * 100) / 100).toFixed(2)
                            add({id:element.game_id,name:`Game ${element.name} went down in price by ${price}$!`});
                        }
                    })
                }
                setPricesWhislis(data);
            })
        }
            
    }

    useInterval(()=>{fetchPrice()},10000);
    
    return(
        <div className="fixed right-0 z-10 p-5">
            <AnimatePresence>
                {notification.map((ele,index)=>(
                    <motion.div key={ele.id}>
                        <NotificationToSpace ele={ele} closeFunct={()=>remove(ele)}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}


export default NotificationSpace;
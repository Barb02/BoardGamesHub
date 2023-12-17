import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import accountService from "../../services/accountService";
import gameService from "../../services/gameService";

function WishList({ query }) {
    const [games,setGames] = useState([]);
    const [prices,setPrices] = useState([]);
    const [priceLoad,setLoad] = useState([]);


    const fetchWishlist = ()=>{
        accountService.getWishlist(query).then((data)=>{
            setGames(data)

            const promises = data.map((game) => {
                return gameService.getLowestPrice(game.game.id).then((datas) => datas.price);
            })
      
            Promise.all(promises).then((price) => {     
              setPrices(price || []);
              setLoad(true)
            }); 
        })
    }

    const removeGame = (id,index)=>{
        accountService.deleteGameWishlist(id);
        let copy = [...games];
        copy.splice(index,1)
        setGames(copy)
        setTimeout(()=>fetchWishlist(),4*1000);
    }
    
    useEffect(()=>{
        fetchWishlist()
    },[query])

    function getPrice(index) {
        return (Math.round(prices[index] * 100) / 100).toFixed(2);
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    function getDateFormat(data){
        let date = new Date(data)
        return date.toLocaleDateString("en-US",options)
    }

    return (
        <div className="max-w-5xl mx-auto pt-5 pb-4">
            {games.map((game,index)=>(
                <Link to={`/Product/${game.game.id}`}><div className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4">
                    <img src={game.game.image} alt="boardgame_cover" className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" />
                    <div className="flex flex-col pl-3">
                        <span className="mr-5 text-xl pt-3 pl-5">{game.game.name}</span>
                        <ul className="inline-block">
                            <li key="1" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Action</li>
                            <li key="2" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Puzzle</li>
                        </ul>
                    </div>
                    <div className="ml-auto w-[25%] flex">
                        <span className="float-right text-2xl self-center">{priceLoad && getPrice(index)}$</span>
                        <span className="flex-col text-sm pt-2 self-center text-center">{getDateFormat(game.insertionDate)}</span>
                        <button id={index} className="self-center ml-auto mr-5 p-5" onClick={(e)=>{e.preventDefault();removeGame(game.game.id,e.currentTarget.id)}}><FaRegTrashAlt size={24}/></button>
                    </div>
                </div></Link>
            ))}
        </div>
    );
}

export default WishList;
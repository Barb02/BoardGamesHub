import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import accountService from "../../services/accountService";

function WishList({ query }) {
    const [games,setGames] = useState([]);
    
    useEffect(()=>{
        accountService.getWishlist().then((data)=>{
            setGames(data)
        })
    },[query])

    return (
        <div className="max-w-5xl mx-auto pt-5 pb-4">
            {games.map((game,index)=>(
                <Link to={`/Product/${game.id}`}><div id="1" className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4">
                    <img alt="boardgame_cover" className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" />
                    <div className="flex flex-col pl-3">
                        <span className="mr-5 text-xl pt-3 pl-5">game.name</span>
                        <ul className="inline-block">
                            <li key="1" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Action</li>
                            <li key="2" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Puzzle</li>
                        </ul>
                    </div>
                    <div className="ml-auto w-[25%] flex">
                        <span className="float-right text-2xl self-center">54,99$</span>
                        <span className="flex-col text-sm pt-2 self-center text-center">Date added: 14-11-2023</span>
                        <button className="self-center ml-auto mr-5"><FaRegTrashAlt size={24}/></button>
                    </div>
                </div></Link>
            ))}
        </div>
    );
}

export default WishList;
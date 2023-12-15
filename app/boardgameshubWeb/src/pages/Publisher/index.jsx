import { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { Link } from 'react-router-dom';
import fantasy from "../../static/fantasy.webp";
import exploration from "../../static/exploration.webp";


function Publisher() {
    const [games, setGames] = useState({});
    const [hotGames, setHotGames] = useState({});
    const [newGames, setNewGames] = useState({});
    const [loaded,setLoaded] = useState(false);
    const [prices, setPrices] = useState({});
    const [hotPrices,setHotPrices] = useState({})
    const [newPrices,setNewPrices] = useState({})
    const [extra, setExtra] = useState("Popular");
  
    useEffect(() => {
      gameService.getPopularGames(20).then((data) => {
        setHotGames(data);
        if (extra === "Popular")
          setGames(data);
  
        const promises = data.map((game) => {
            return gameService.getLowestPrice(game.id).then((datas) => datas.price);
        })
  
        Promise.all(promises).then((price) => {     
          setHotPrices(price || []);
          if (extra === "Popular")
            setPrices(price);
          setLoaded(true);
        }); 
      });
  
      gameService.getNewGames().then((data) => {
        setNewGames(data);
        if (extra === "New")
          setGames(data);
  
        const promises = data.map((game) => {
            return gameService.getLowestPrice(game.id).then((datas) => datas.price);
        })
  
        Promise.all(promises).then((price) => {     
          setNewPrices(price || []);
          if (extra === "New")
            setPrices(price);
          setLoaded(true);
        }); 
      });
    }, []);
  
    function getPrice(index) {
      return (Math.round(prices[index] * 100) / 100).toFixed(2);
    }
  
    function onHover(e) {
      e.currentTarget.style.opacity = 0.8;
    }
  
    function onHoverOut(e) {
      e.currentTarget.style.opacity = 1;
    }

    return (
        <div className="text-text font-text">
            <div className="flex pt-[3%] pb-[3%] w-full h-[350px]">
                <div className="flex">
                    <img className="w-full bg-cover bg-center" src={fantasy}/>
                </div>
                <div>
                    <img />
                </div>
                <div className="flex">
                    <img src={exploration}/>
                </div>
            </div>
            <div className="flex max-w-5xl mx-auto text-xl">
                <div className={`w-[10%] text-center rounded-t-lg cursor-pointer pt-1` + (extra === "New" ? " bg-primary" : " ")} 
                onClick={() => { setExtra("New"); setGames(newGames); setPrices(newPrices); }}>
                    New
                </div>
                <div className={`w-40 text-center rounded-t-lg cursor-pointer pt-1` + (extra === "Popular" ? " bg-primary" : " ")}
                    onClick={() => { setExtra("Popular"); setGames(hotGames); setPrices(hotPrices); }}>
                    Popular
                </div>
                </div>
                <div className="bg-primary bg-gradient-to-t from-gradient to-100% h-auto min-h-[800px]">
                <div className="max-w-5xl mx-auto pt-5 pb-4">
                {loaded && games.slice(0,20).map((game, index) => (
                <Link to={`/product/${game.id}`}>
                    <div id={game.id} className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4" onMouseOver={ onHover } onMouseOut={ onHoverOut }>
                        <img alt="boardgame_cover" className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" src={game.image} />
                        <div className="flex flex-col pl-3 w-[60%]">
                            <span className="mr-5 text-xl pt-3 pl-5">{game.name}</span>
                            <ul className="inline-block">
                                {game.categories.slice(0,2).map((category) => (
                                <li key={category.id} className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">{category.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="ml-auto w-[27%] flex">
                            <div className="flex-col w-[50%] self-center text-center">
                                <span className="text-xs">score: {Math.round(game.score * 10) / 10}</span>
                                <div className="w-full rounded-full h-1.5 dark:bg-gray-700 mx-auto">
                                    <div className={`bg-primary h-1.5 rounded-full`} style={{ width: `${Math.round(game.score * 10) + "%"}` }}></div>
                                </div>
                            </div>
                            <span className="float-right text-2xl self-center ml-auto mr-5">{ getPrice(index) }$</span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Publisher;
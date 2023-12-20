import { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import exploration from "../../static/exploration.webp";
import adventure from "../../static/adventure.webp";
import miniatures from "../../static/miniatures.webp";
import cardgame from "../../static/card_game.webp";
import fantasy from "../../static/fantasy.webp";
import horror from "../../static/horror.webp";
import { Link } from 'react-router-dom';
import Carousel from "../../components/Carrosel";

function Homepage() {
  const [games, setGames] = useState({});
  const [loaded,setLoaded] = useState(false);
  const [prices, setPrices] = useState({});

  const [hotGames, setHotGames] = useState({});
  const [newGames, setNewGames] = useState({});
  const [hotPrices,setHotPrices] = useState({})
  const [newPrices,setNewPrices] = useState({})

  const [view, setView] = useState("Popular");

  useEffect(() => {
    gameService.getPopularGames(20).then((data) => {
      setHotGames(data);
      if (view === "Popular")
        setGames(data);

      const promises = data.map((game) => {
          return gameService.getLowestPrice(game.id).then((datas) => datas.price);
      })

      Promise.all(promises).then((price) => {     
        setHotPrices(price || []);
        if (view === "Popular")
          setPrices(price);
      }); 
    });

    gameService.getNewGames().then((data) => {
      setNewGames(data);
      if (view === "New")
        setGames(data);

      const promises = data.map((game) => {
          return gameService.getLowestPrice(game.id).then((datas) => datas.price);
      })

      Promise.all(promises).then((price) => {     
        setNewPrices(price || []);
        if (view === "New")
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
    <div style={{background: "radial-gradient(35.55% 59.25% at 31.34% 54.41%, rgba(226, 179, 80, 0.15) 25.76%, rgba(34, 34, 34, 0.00) 100%), #222"}}>
      <div className="text-text font-text">
        <div className="flex max-w-7xl mx-auto pt-[50px] h-[650px] justify-between">
          <div className="w-[30%] h-full place-self-center">
            <p className="text-text font-hot italic text-[48px] h-[10%] whitespace-nowrap font-extrabold textShadow-shtitle -rotate-6 translate-y-4 -translate-x-5" style={{textShadow:"9px 7px 0px #000"}}>GAME OF THE WEEK</p>
            <Link to={loaded && `/product/${hotGames[0].id}`}>
              <img src={loaded && hotGames[0].image} className=" w-full rounded-[20px] aspect-square shadow-image object-cover" />
            </Link>
            <p className="text-text text-right font-mono text-[40px] pt-4 h-[10%]">{loaded && (Math.round(hotPrices[0] * 100) / 100).toFixed(2)}$</p>
            <p className="text-text text-right font-mono text-[16px]">current lowest price</p>
          </div>
          <div className="flex flex-col shadow-divDistact w-[60%] rounded-[20px] h-[85%] place-self-center px-10 py-5 bg-black bg-opacity-20">
              <Link to={loaded && `/product/${hotGames[0].id}`}>
                <div className="text-text font-title text-[40px]">{loaded && hotGames[0].name}</div>
              </Link>
              <div className="text-text font-mono text-[20px]">{loaded && hotGames[0].shortDescription}</div>
              <div className="flex justify-around ml-[1%] mr-[1%] mt-auto mb-3">
                {loaded && hotGames[0].images.slice(0, 2).map((ik, index) => (
                  <img className="object-cover rounded-3xl w-[48%] h-[200px]" src={ik} />
                ))}
              </div>
          </div>
        </div>

        
          <div className="w-full h-auto" style={{background: "linear-gradient(180deg, rgba(34, 34, 34, 0.00) 0%, rgba(0, 0, 0, 0.30) 6.25%, rgba(0, 0, 0, 0.00) 81.25%)"}}>
            <div className="max-w-6xl w-full mx-auto pt-[2%]">
              <div className="text-2xl ml-[5%] mb-[1%]">
                Categories:
              </div>

              <Carousel buttons={true} width={210} >
                  <Link to={`/search?q=&categories=Exploration`}>
                    <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #F00 100%), url(" + exploration + "), lightgray 50%" }}>
                      <span className="h-full flex text-3xl items-end justify-center">Exploration</span>
                    </div>
                  </Link>
                  <Link to={`/search?q=&categories=Adventure`}>
                    <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #0500FF 100%), url(" + adventure + "), lightgray 50%" }}>
                      <span className="h-full flex text-3xl items-end justify-center">Adventure</span>
                    </div>
                  </Link>
                  <Link to={`/search?q=&categories=Horror`}>
                    <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #157419 100%), url(" + horror + "), lightgray 50%" }}>
                      <span className="h-full flex text-3xl items-end justify-center">Horror</span>
                    </div>
                  </Link>
                  <Link to={`/search?q=&categories=Card Game`}>
                    <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #909C07 100%), url(" + cardgame + "), lightgray 50%" }}>
                      <span className="h-full flex text-3xl items-end justify-center">Card Game</span>
                    </div>
                  </Link>
                  <Link to={`/search?q=&categories=Miniatures`}>
                  <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #30948C 100%), url(" + miniatures + "), lightgray 50%" }}>
                    <span className="h-full flex text-3xl items-end justify-center">Miniatures</span>
                  </div>
                  </Link>
                  <Link to={`/search?q=&categories=Fantasy`}>
                  <div className="w-[230px] rounded-md h-[160px]" style={{background: "linear-gradient(180deg, rgba(255, 0, 0, 0.00) 39.06%, #109D0F 100%), url(" + fantasy + "), lightgray 50%" }}>
                    <span className="h-full flex text-3xl items-end justify-center">Fantasy</span>
                  </div>
                  </Link>
              </Carousel>

            </div>  
          </div>

        <div className="flex max-w-5xl mx-auto text-xl">
          <div className={`w-[10%] text-center rounded-t-lg cursor-pointer pt-1` + (view === "New" ? " bg-primary" : " ")} 
          onClick={() => { setView("New"); setGames(newGames); setPrices(newPrices); }}>
            New
          </div>
          <div className={`w-40 text-center rounded-t-lg cursor-pointer pt-1` + (view === "Popular" ? " bg-primary" : " ")}
            onClick={() => { setView("Popular"); setGames(hotGames); setPrices(hotPrices); }}>
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
    </div>
  );
}

export default Homepage;

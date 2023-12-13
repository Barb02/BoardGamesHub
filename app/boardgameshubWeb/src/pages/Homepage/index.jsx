import { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import placeholder from "../../static/placeholder.png";
import { Link } from 'react-router-dom';
import Carousel from "../../components/Carrosel";

function Homepage() {
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
    <div style={{background: "radial-gradient(35.55% 59.25% at 31.34% 54.41%, rgba(226, 179, 80, 0.15) 25.76%, rgba(34, 34, 34, 0.00) 100%), #222"}}>
      <div className="text-text font-text">
        <div className="flex max-w-7xl mx-auto pt-[50px] h-[650px] justify-between">
          <div className="w-[30%] h-full place-self-center">
            <p className="text-text font-hot italic text-[48px] h-[10%] whitespace-nowrap font-extrabold textShadow-shtitle -rotate-6 translate-y-4 -translate-x-5" style={{textShadow:"9px 7px 0px #000"}}>GAME OF THE WEEK</p>
            <img src={loaded && hotGames[0].image} className=" w-full rounded-[20px] aspect-square shadow-image object-cover"></img>
            <p className="text-text text-right font-mono text-[40px] pt-4 h-[10%]">{loaded && (Math.round(prices[0] * 100) / 100).toFixed(2)}$</p>
            <p className="text-text text-right font-mono text-[16px]">current lowest price</p>
          </div>
          <div className="flex flex-col shadow-divDistact w-[60%] rounded-[20px] h-[85%] place-self-center px-10 py-5 bg-black bg-opacity-20">
              <div className="text-text font-title text-[40px]">{loaded && hotGames[0].name}</div>
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

              <Carousel buttons={true} width={230} >
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
                  <div className="w-[230px]">
                    <img src={ placeholder } className="rounded-md h-[160px]"/>
                  </div>
              </Carousel>

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
    </div>
  );
}

export default Homepage;

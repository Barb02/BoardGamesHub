import { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import placeholder from "../../static/placeholder.png";
import { Link } from 'react-router-dom';

function Homepage() {
  const [hotOfWeek, setHotOfWeek] = useState({});
  const [loaded,setLoaded] = useState(false);
  const [price,setPrice] = useState({})
  const [extra, setExtra] = useState("New");

  useEffect(() => {
    gameService.getPopularGames(20).then((data) => {
      setHotOfWeek(data[0]);
      setLoaded(true);
      gameService.getLowestPrice(data[0].id).then((price) => {
        setPrice(price)
      })
    });
  }, []);

  return (
    <div style={{background: "radial-gradient(35.55% 59.25% at 31.34% 54.41%, rgba(226, 179, 80, 0.15) 25.76%, rgba(34, 34, 34, 0.00) 100%), #222"}}>
      <div className="text-text font-text">
        <div className="flex max-w-7xl mx-auto pt-[50px] h-[650px] justify-between">
          <div className="w-[30%] h-full place-self-center">
            <p className="text-text font-hot italic text-[48px] h-[10%] whitespace-nowrap font-extrabold textShadow-shtitle -rotate-6 translate-y-4 -translate-x-5" style={{textShadow:"9px 7px 0px #000"}}>GAME OF THE WEEK</p>
            <img src={hotOfWeek.image} className=" w-full rounded-[20px] aspect-square shadow-image object-cover"></img>
            <p className="text-text text-right font-mono text-[40px] pt-4 h-[10%]">{(Math.round(price.price * 100) / 100).toFixed(2)}$</p>
            <p className="text-text text-right font-mono text-[16px]">current lowest price</p>
          </div>
          <div className="flex flex-col shadow-divDistact w-[60%] rounded-[20px] h-[85%] place-self-center px-10 py-5 bg-black bg-opacity-20">
              <div className="text-text font-title text-[40px]">{hotOfWeek.name}</div>
              <div className="text-text font-mono text-[20px]">{hotOfWeek.shortDescription}</div>
              <div className="flex justify-around ml-[1%] mr-[1%] mt-auto mb-3">
                {loaded && hotOfWeek.images.slice(0, 2).map((ik, index) => (
                  <img className="object-cover rounded-3xl w-[48%] h-[200px]" src={ik} />
                ))}
              </div>
          </div>
        </div>
        <div className="flex w-full h-auto" style={{background: "linear-gradient(180deg, rgba(34, 34, 34, 0.00) 0%, rgba(0, 0, 0, 0.30) 6.25%, rgba(0, 0, 0, 0.00) 81.25%)"}}>
          <div className="max-w-7xl w-full mx-auto pt-[2%] pb-[2%]">
            <div className="text-2xl ml-[5%] mb-[1%]">
              Categories:
            </div>
            <div className="flex h-full pb-[3%]">
              <div className="mr-auto self-center">
                <SlArrowLeft size={64}/>
              </div>
              <div className="mx-auto self-center">
                <img src={ placeholder } className="rounded-md h-[160px]"/>
              </div>
              <div className="mx-auto self-center">
                <img src={ placeholder } className="rounded-md h-[160px]"/>
              </div>
              <div className="mx-auto self-center">
                <img src={ placeholder } className="rounded-md h-[160px]"/>
              </div>
              <div className="mx-auto self-center">
                <img src={ placeholder } className="rounded-md h-[160px]"/>
              </div>
              <div className="ml-auto self-center">
                <SlArrowRight size={64}/>
              </div>
            </div>
          </div>  
        </div>
        <div className="flex max-w-5xl mx-auto text-xl">
          <div className={`w-[10%] text-center rounded-t-lg cursor-pointer pt-1` + (extra === "New" ? " bg-primary" : " ")} 
          onClick={() => setExtra("New")}>
            New
          </div>
          <div className={`w-40 text-center rounded-t-lg cursor-pointer pt-1` + (extra === "Popular" ? " bg-primary" : " ")}
            onClick={() => setExtra("Popular")}>
            Popular
          </div>
        </div>
        <div className="bg-primary bg-gradient-to-t from-gradient to-100% h-auto min-h-[800px]">
        <div className="max-w-5xl mx-auto pt-5 pb-4">
          <Link to={`/product/1`}>
              <div id="1" className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4">
                  <img alt="boardgame_cover" className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" src={placeholder} />
                  <div className="flex flex-col pl-3 w-[60%]">
                      <span className="mr-5 text-xl pt-3 pl-5">NAME</span>
                      <ul className="inline-block">
                        <li key="1" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">CATEGORY</li>
                      </ul>
                  </div>
                  <div className="ml-auto w-[27%] flex">
                      <div className="flex-col w-[50%] self-center text-center">
                          <span className="text-xs">score: 7.8</span>
                          <div className="w-full rounded-full h-1.5 dark:bg-gray-700 mx-auto">
                              <div className={`bg-primary h-1.5 rounded-full`} style={{ width: 78 }}></div>
                          </div>
                      </div>
                      <span className="float-right text-2xl self-center ml-auto mr-5">9.99$</span>
                  </div>
              </div>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

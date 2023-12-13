import { useEffect, useState } from "react";
import gameService from "../../services/gameService";

function Homepage() {
  const [hotOfWeek, setHotOfWeek] = useState({});
  const [loaded,setLoaded] = useState(false);
  const [price,setPrice] = useState({})

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
      <div className=" max-w-7xl mx-auto">
        <div className="flex w-full pt-[50px] h-[650px] justify-between">
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
      </div>
    </div>
  );
}

export default Homepage;

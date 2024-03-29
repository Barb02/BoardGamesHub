import user_group_icon from "../../static/user_group_icon.svg";
import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { Link, useParams } from "react-router-dom";
import { Notification,PricesGraph } from "../../components";
import { useInterval } from "../../hooks";
import { useUserStore } from "../../stores/useUserStore";
import accountService from "../../services/accountService";
import { FaCheck } from "react-icons/fa";
import placeholder from "../../static/placeholder.jpg"

function Product() {

  let { id } = useParams();
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllDes, setShowAllDes] = useState(false);
  const [showAllPubs, setShowAllPubs] = useState(false);

  const [notification,setNotification] = useState(false);
  const [extra, setExtra] = useState("Description");

  const [rdata, setRdata] = useState({});
  const [rprices, setRprices] = useState([]);
  const [historyPrice,setHistoryPrice] = useState([]);
  const [lowesPrice,setLowestPrice] = useState({});
  const [dataload, setDataload] = useState(false);
  const [priceload, setPriceload] = useState(false);
  const [lowesPriceLoad,setLowestPriceLoad] = useState(false);
  const logged = useUserStore((state)=>state.logged)

  const [disabled, setDisable] = useState(false);

  const addGameWishlist = () => {
    if (!disabled){
      accountService.addGameWishlist(id);
      setTimeout(()=>checkGameInWishlist(),10000);
      setDisable(true);
    }
  }

  const checkGameInWishlist = () => {
    accountService.getGameWishlist(id).then((data)=>{
      setDisable(data.inWishlist)
    });
  }


  useEffect(() => {
    if (logged)
      checkGameInWishlist()

    gameService.getGame(id).then((data) => {
      setRdata(data || {});
      setDataload(true);
    });
    gameService.getHistoryPriceGraph(id).then((data) =>{
      setHistoryPrice(data)
    });
  }, []);

  useEffect(() => {
    gameService.getLastPrices(id).then((data) => {
      setRprices(data || []);
      setPriceload(true);
    });
    loadLowestPrice(id,false)
  }, []);
  
  const loadLowestPrice = (id,checkUpdate)=>{
    gameService.getLowestPrice(id).then((data)=>{
      if (checkUpdate && (lowesPrice.price !== data.price || lowesPrice.store.name !== data.store.name)){
        setNotification(true);
      }
      setLowestPrice(data || {})
      setLowestPriceLoad(true)
    })
  }

  const addPlaceholders = (e) => {
    const imgTags = [];
    for (let index = 0; index < 4; index++) {
      imgTags.push(<img className="object-cover rounded-3xl w-[20%]" src={placeholder} />);
    }

    return imgTags;
  }
  
  useInterval(()=>{
    if(lowesPriceLoad){
      loadLowestPrice(id,true)
    }
  },2000)



  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    var abbrev = ["k", "m", "b", "t"];

    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        break;
      }
    }

    return number;
  }

  const ratings = abbrNum(rdata.numRatings, 0);
  const scorePercentage = Math.round(rdata.score * 10) + "%";

  return (
    <div className=" relative w-full h-auto text-text font-text overflow-hidden">
      {<Notification className={"transition absolute right-1 w-[20%]"} text={"Price of the item was updated!!"} time={5} closeFunct={()=>setNotification(false)} boolToappear={notification}/>}
      <div className="max-w-7xl mx-auto relative">
        {/* Product display area */}
        <div className="pt-[6%] flex">
          <div className="max-w-sm pt-[3%] inline-block">
            <img
              className="object-cover rounded-3xl h-[400px] shadow-image"
              src={rdata.image || placeholder}
            />
          </div>

          <div className="ml-[7%] max-w-[20%] mr-[7%]">
            <h1 className="text-4xl font-title">{rdata.name}</h1>
            <div>
              <button
                className={"mt-[10%] flex pr-2 pl-2 bg-primary rounded"+ (!logged ? " cursor-not-allowed":"")}
                onClick={()=>{logged && addGameWishlist()}}
              >
                <div className="flex items-center">{!disabled ? "+ ADD TO WISHLIST" : <><FaCheck className="mr-2"/>In Wishlist</>}</div>
              </button>
              {!logged && <div className="text-[12px]">You need to be logged in</div>}
            </div>
            {/* Tags display area */}
            <h2 className="pt-[10%] text-lg mt-1 ml-1 mr-1">Tags</h2>
            <ul className="inline-block">
              {dataload &&
                (showAllCats
                  ? rdata.categories
                  : rdata.categories.slice(0, 3)
                ).map((category) => (
                  <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">
                    {category.name}
                  </li>
                ))}
            </ul>
            {dataload && rdata.categories.length > 3 && (
              <button
                className="mt-2 text-text cursor-pointer text-xs"
                onClick={() => setShowAllCats(!showAllCats)}
              >
                {showAllCats ? "Show Less" : "Show More"}
              </button>
            )}
            {/* End of Tags display area */}
            <div className="pt-[15%] inline-block">
              <div className="inline-block text-sm text-center">
                Players
                <p>
                  <img className="inline-block pr-1" src={user_group_icon} />
                  {rdata.minplayers}-{rdata.maxplayers}
                </p>
              </div>
              <div className="inline-block pl-8 text-sm text-center">
                Age
                <p>{rdata.minage}+</p>
              </div>
              <div className="inline-block pl-8 text-sm text-center">
                Playtime
                <p>
                  {rdata.minplaytime === rdata.maxplaytime? rdata.maxplaytime: `${rdata.minplaytime} - ${rdata.maxplaytime}`}
                    min
                </p>
              </div>
            </div>

            <div className="pt-[20%]">
              <div className="w-[50%] inline-block">
                <div className="text-center text-sm">
                  score: {Math.round(rdata.score * 10) / 10}
                </div>
                <div
                  id="percentagebar"
                  className="w-full rounded-full h-1.5 dark:bg-gray-700"
                >
                  <div
                    id="percentage"
                    className={`bg-primary h-1.5 rounded-full`}
                    style={{ width: scorePercentage }}
                  ></div>
                </div>
                <div className="text-center text-xs">{ratings} ratings</div>
              </div>
              <div className="w-[50%] inline-block ">
                <div className="text-center text-sm">
                  Complexity
                  <div>{Math.round(rdata.complexity)}/5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-sm pt-[2%]">
            <div className=" pb-[15%]">
              <h2 className="text-2xl bg-designers rounded px-2">Current Lowest Price</h2>
              <div className="text-xl mt-[4%] px-2">
                {lowesPriceLoad && (Math.round(lowesPrice.price * 100) / 100).toFixed(2) + " $ " + lowesPrice.store.name}
              </div>
            </div>
            {/* Designers display area */}
            <div className="pb-[15%]">
              <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">
                Designer
              </h2>
              <ul>
                {dataload &&
                  (showAllDes
                    ? rdata.designers
                    : rdata.designers.slice(0, 3)
                  ).map((designer, index) => (
                    <li className=" pt-2 w-auto pr-2 pl-2 mr-2 rounded text-sm">
                      {designer.name}
                    </li>
                  ))}
              </ul>
              {dataload && rdata.designers.length > 3 && (
                <button
                  className="mt-2 pl-2 text-text cursor-pointer text-xs"
                  onClick={() => setShowAllDes(!showAllDes)}
                >
                  {showAllDes ? "Show Less" : "Show More"}
                </button>
              )}
              {/* End of designers display area */}
            </div>
            <div>
              <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">
                Publisher
              </h2>
              <ul>
                {dataload &&
                  (showAllPubs
                    ? rdata.publishers
                    : rdata.publishers.slice(0, 3)
                  ).map((publisher, index) => (
                    <Link to={`/publisher/${publisher.id}`}>
                      <li className="w-auto ml-2 pt-[2%] rounded text-sm">
                        {publisher.name}
                      </li>
                    </Link>
                  ))}
              </ul>
              {dataload && rdata.publishers.length > 3 && (
                <button
                  className="mt-2 pl-2 text-text cursor-pointer text-xs"
                  onClick={() => setShowAllPubs(!showAllPubs)}
                >
                  {showAllPubs ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Product images display area */}
        <div className="w-full flex mt-[7%] pb-[10%] h-[300px]">
          <div className="flex justify-around ml-[1%] mr-[1%]">
            {dataload && rdata.images.length !== 0 && rdata.images.slice(0, 4).map((ik, index) => (
                  <img className="object-cover rounded-3xl w-[20%]" src={ik} />
                )) || dataload && addPlaceholders()}
          </div>
        </div>
      </div>
      {/* display bottom part */}
      <div className="flex max-w-7xl mx-auto">
        <div
          className={
            `w-40 text-center rounded-t-lg cursor-pointer` +
            (extra === "Description" ? " bg-primary" : " ")
          }
          onClick={() => setExtra("Description")}
        >
          Description
        </div>
        <div
          className={
            `w-40 text-center rounded-t-lg cursor-pointer` +
            (extra === "Store" ? " bg-primary" : " ")
          }
          onClick={() => setExtra("Store")}
        >
          Store
        </div>
      </div>

      <div className=" bg-gradient-to-b from-primary from-10% to-background">
        <div className="max-w-7xl mx-auto py-10">
          {extra === "Description" && dataload && (
            <div className=" bg-black bg-opacity-20 rounded-[30px] py-10 px-14 shadow-divDistact">
              {rdata.description}
            </div>
          )}
          {extra === "Store" && <div className="flex gap-[2%]">
            <div className="bg-black w-[19%] bg-opacity-20 rounded-[30px] p-[25px] text-lg shadow-divDistact">
              {priceload &&
                rprices.map((price, index) => (
                  <div className="grid grid-cols-2 justify-items-start gap-[10%]">
                    <div className=" justify-self-end">{(Math.round(price.price * 100) / 100).toFixed(2)} $</div>
                    <div className=" justify-self-end">{price.store.name}</div>
                  </div>
                ))}
            </div>
            <div className="w-[79%] bg-black bg-opacity-20 rounded-[30px] shadow-divDistact">
              <PricesGraph className={"h-[400px] w-[80%"} data={historyPrice} />
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Product;

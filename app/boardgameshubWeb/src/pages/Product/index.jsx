import user_group_icon from "../../static/user_group_icon.svg";
import logo_worten from "../../static/logo_worten.jpg";
import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { useParams } from "react-router-dom";
import { PricesGraph } from "../../components";

function Product() {
  const data = [
    {
      id: "japan",
      color: "hsl(12, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 196,
        },
        {
          x: "helicopter",
          y: 1,
        },
        {
          x: "boat",
          y: 30,
        },
        {
          x: "train",
          y: 285,
        },
      ],
    },
  ];

  let { id } = useParams();
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllDes, setShowAllDes] = useState(false);
  const [showAllPubs, setShowAllPubs] = useState(false);
  const [LowestPriceIndex, setLowestPriceIndex] = useState({});
  const [extra, setExtra] = useState("Description");

  const [rdata, setRdata] = useState({});
  const [rprices, setRprices] = useState([]);
  const [dataload, setDataload] = useState(false);
  const [priceload, setPriceload] = useState(false);

  useEffect(() => {
    gameService.getGame(id).then((data) => {
      setRdata(data || {});
      setDataload(true);
    });
  }, []);

  useEffect(() => {
    gameService.getLastPrices(id).then((data) => {
      setRprices(data || []);
      setPriceload(true);
      var low = 0;
      for (var index = 1; index < data.length; index++) {
        if (parseInt(data[index].price) < parseInt(data[low].price)) {
          low = index;
        }
      }
      setLowestPriceIndex(low);
    });
  }, []);

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
    <div className="w-full h-auto text-text font-text">
      <div className="max-w-7xl mx-auto relative">
        {/* Product display area */}
        <div className="pt-[6%] flex">
          <div className="max-w-sm pt-[3%] inline-block">
            <img
              className="object-cover rounded-3xl h-[400px] shadow-image"
              src={rdata.image}
            />
          </div>

          <div className="ml-[7%] max-w-[20%] mr-[7%]">
            <h1 className="text-4xl font-title">{rdata.name}</h1>
            <div className="mt-[10%] inline-block pr-2 pl-2 bg-primary rounded">
              <button>+ ADD TO WISHLIST</button>
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
                  {rdata.minplaytime}
                  {rdata.minplaytime}-{rdata.maxplaytime} min
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
              <h2 className="text-2xl">Current Lowest Price</h2>
              <div className="text-xl pt-[4%]">
                {priceload && rprices[LowestPriceIndex].price}
                <img
                  className="inline-block rounded-3xl h-[36px] w-[84px]"
                  src={logo_worten}
                />
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
                    <li className="w-auto ml-2 pt-[2%] rounded text-sm">
                      {publisher.name}
                    </li>
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
            {dataload &&
              rdata.images
                .slice(0, 4)
                .map((ik, index) => (
                  <img className="object-cover rounded-3xl w-[20%]" src={ik} />
                ))}
          </div>
        </div>

        {/* Graph area */}
        <div className=""></div>
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
        <div
          className={
            `w-40 text-center rounded-t-lg cursor-pointer` +
            (extra === "Expansions" ? " bg-primary" : " ")
          }
          onClick={() => setExtra("Expansions")}
        >
          Expansions
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
                  <div className="grid grid-cols-2 justify-items-start gap-[38%]">
                    <div className=" justify-self-end">{price.price} $</div>
                    <div className=" justify-self-end">{price.store.name}</div>
                  </div>
                ))}
            </div>
            <div className="w-[79%] bg-black bg-opacity-20 rounded-[30px] shadow-divDistact">
              <PricesGraph className={"h-[400px] w-[80%"} data={data} />
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Product;

import user_group_icon from "../../static/user_group_icon.svg"
import logo_worten from "../../static/logo_worten.jpg"
import data from '../../static/data.json';
import React, { useEffect, useState } from 'react';

function Product() {
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllDes, setShowAllDes] = useState(false);
    const [showAllPubs, setShowAllPubs] = useState(false);
    
    const categories = data.categories;
    const designers = data.designers;
    const publishers = data.publishers;
    const visibleCategories = showAllCats ? categories : categories.slice(0,3);
    const visiblePublishers = showAllPubs ? publishers : publishers.slice(0,3);
    const visibleDesigners = showAllDes ? designers : designers.slice(0,3);

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
            number = Math.round(number * decPlaces / size) / decPlaces;
      
            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
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

      const ratings = abbrNum(data.numRatings, 0);
      const scorePercentage = (data.score * 10) + "";

    return (
      <div className="w-full h-auto bg-background text-text font-text">
        <div className="max-w-7xl mx-auto relative">
                {/* Product display area */}
                <div className="pt-[6%] flex">
                    <div className="max-w-sm pt-[3%] inline-block">
                        <img className="rounded-3xl h-[400px] shadow-image" src={data.image} />
                    </div>

                    <div className="ml-[7%] max-w-[20%] mr-[7%]">
                        <h1 className="text-4xl font-title">{data.name}</h1>
                        <div className="mt-[10%] inline-block pr-2 pl-2 bg-primary rounded">
                            <button>+ ADD TO WISHLIST</button>
                        </div>
                        {/* Tags display area */}
                        <h2 className="pt-[10%] text-lg mt-1 ml-1 mr-1">Tags</h2>
                        <ul className="inline-block">
                            {visibleCategories.map((category, index) => (
                                <li key={index} className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        {categories.length > 3 && (
                                    <button
                                        className="mt-2 text-text cursor-pointer text-xs"
                                        onClick={() => setShowAllCats(!showAllCats)}
                                    >
                                        {showAllCats ? 'Show Less' : 'Show More'}
                                    </button>
                        )}
                        {/* End of Tags display area */}
                        <div className="pt-[15%] inline-block">
                            <div className="inline-block text-sm text-center">
                                Players
                                <p>
                                    <img className="inline-block pr-1" src={user_group_icon} />
                                    {data.minplayers}-{data.maxplayers}
                                </p>
                            </div>
                            <div className="inline-block pl-8 text-sm text-center">
                                Age
                                <p>{data.minage}+</p>
                            </div>
                            <div className="inline-block pl-8 text-sm text-center">
                                Playtime
                                <p>{data.minplaytime}-{data.maxplaytime} min</p>
                            </div>
                        </div>

                        <div className="pt-[20%]">
                            <div className="w-[50%] inline-block">
                                <div className="text-center text-sm">score: {Math.round(data.score * 10) / 10}</div>
                                <div id="percentagebar" className="w-full rounded-full h-1.5 dark:bg-gray-700">
                                    <div id="percentage" className={`bg-primary h-1.5 rounded-full w-[${scorePercentage}%]`}></div>
                                </div>
                                <div className="text-center text-xs">{ratings} ratings</div>
                            </div>
                            <div className="w-[50%] inline-block ">
                                <div className="text-center text-sm">
                                    Complexity
                                    <div>
                                        {Math.round(data.complexity * 10) / 10}/5
                                    </div>
                                </div>
                                        
                            </div>
                        </div>
                    </div>
                    
                    <div className="max-w-sm pt-[2%]">
                        <div className=" pb-[15%]">
                            <h2 className="text-2xl">Current Lowest Price</h2>
                            <div className="text-xl pt-[4%]">10.99€ <img className="inline-block rounded-3xl h-[36px] w-[84px]" src={logo_worten} /></div>
                        </div>
                        {/* Designers display area */}
                        <div className="pb-[15%]">
                            <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">Designer</h2>
                            <ul className="inline-block">
                                {visibleDesigners.map((designer, index) => (
                                    <li key={index} className="inline-block w-auto pr-2 pl-2 mr-2 rounded text-sm">
                                        {designer.name}
                                    </li>
                                ))}
                            </ul>
                            {designers.length > 3 && (
                                    <button
                                        className="mt-2 pl-2 text-text cursor-pointer text-xs"
                                        onClick={() => setShowAllDes(!showAllDes)}
                                    >
                                        {showAllDes ? 'Show Less' : 'Show More'}
                                    </button>
                        )}
                        {/* End of designers display area */}
                        </div>
                        <div>
                            <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">Publisher</h2>
                            <ul>
                                {visiblePublishers.map((publisher, index) => (
                                    <li key={index} className="w-auto ml-2 pt-[2%] rounded text-sm">
                                        {publisher.name}
                                    </li>
                                ))}
                            </ul>
                            {publishers.length > 3 && (
                                    <button
                                        className="mt-2 pl-2 text-text cursor-pointer text-xs"
                                        onClick={() => setShowAllPubs(!showAllPubs)}
                                    >
                                        {showAllPubs ? 'Show Less' : 'Show More'}
                                    </button>
                            )}
                        </div>



                    </div>
                </div>
                {/* Product images display area */}
                <div className="w-full flex mt-[7%] pb-[10%]">
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={data.image} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={data.image} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={data.image} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={data.image} />
                    </div>
                </div>

                {/* Graph area */}
                <div className="">

                </div>
        </div>
      </div>
    );
  }
  
  export default Product;
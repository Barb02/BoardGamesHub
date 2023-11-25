import product from "../../static/tapestry_bg.jpg"
import user_group_icon from "../../static/user_group_icon.svg"

function Product() {
    return (
      <div className="w-full h-auto bg-background text-text font-text">
        <div className="max-w-7xl mx-auto relative">
                {/* Product display area */}
                <div className="pt-24 flex">
                    <div className="max-w-sm pt-[3%] inline-block">
                        <img className="rounded-3xl h-[400px] shadow-image" src={product} />
                    </div>

                    <div className="ml-[7%] max-w-[20%] mr-[7%]">
                        <h1 className="text-4xl font-title">Tapestry</h1>
                        <div className="mt-[10%] inline-block pr-2 pl-2 bg-primary rounded">
                            <button>+ ADD TO WISHLIST</button>
                        </div>
                    
                        <h2 className="pt-[10%] text-lg mt-1 ml-1 mr-1">Tags</h2>
                        <ul className="inline-block">
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">Action</li>
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">Puzzle</li>
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">Strategy</li>
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-2 rounded text-sm">Horror</li>
                        </ul>

                        <div className="pt-[15%] inline-block">
                            <div className="inline-block text-sm text-center">
                                Players
                                <p>
                                    <img className="inline-block pr-1" src={user_group_icon} />
                                    2-4
                                </p>
                            </div>
                            <div className="inline-block pl-8 text-sm text-center">
                                Age
                                <p>14+</p>
                            </div>
                            <div className="inline-block pl-8 text-sm text-center">
                                Playtime
                                <p>60-120 min</p>
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>
                    
                    <div className="max-w-sm pt-[4%]">
                        <div className="pt-[5%] pb-[15%]">
                            <h2 className="text-lg">Short description</h2>
                            <div className="text-xs pt-[4%]">Build your witch coven, enthrall the townsfolk, and rise to power as the new Septima.</div>
                        </div>
                        <div className="pb-[15%]">
                            <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">Designer</h2>
                            <ul className="inline-block">
                                <li className="inline-block w-auto pr-2 pl-2 mr-2 rounded text-sm">Charles Darrow</li>
                                <li className="inline-block w-auto pr-2 pl-2 mr-2 rounded text-sm">Robin Hegedus</li>
                                <li className="inline-block w-auto pr-2 pl-2 mr-2 rounded text-sm">Elizabeth J. Magie (Phillips)</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="bg-designers pr-2 pl-2 inline-block rounded text-lg">Publisher</h2>
                            <ul>
                                <li className="w-auto ml-2 pt-[2%] rounded text-sm">Mindclash Games</li>
                                <li className="w-auto ml-2 pt-[2%] rounded text-sm">Super Meeple</li>
                            </ul>
                        </div>



                    </div>
                </div>
                {/* Product images display area */}
                <div className="w-full flex mt-[7%] pb-[10%]">
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={product} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={product} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={product} />
                    </div>
                    <div className="ml-[1%] mr-[1%]">
                        <img className="rounded-3xl" src={product} />
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
import { useEffect, useState } from "react";


const Price = ( {currentPrices, setPrices} ) => {
    const [priceMin, setPriceMin] = useState();
    const [priceMax, setPriceMax] = useState();

    useEffect(() => {
        setPriceMin(currentPrices[0]);
        setPriceMax(currentPrices[1]);
    }, []);

    return (
            <div className="h-[35%] ml-5 pt-2 w-full">
                <div className="text-2xl mt-4">
                    <span>Price:</span>
                </div>
                <div className="flex flex-col relative ml-4 mt-2 text-md">
                    <div className="pb-1 pt-3">
                        <div className="flex">
                            <span className="pt-1">From: </span>
                            <div className="flex flex-col absolute ml-[15%] w-[120px] overflow-hidden z-50 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[70px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <input value={priceMin} onChange={(e) => {setPriceMin(e.target.value); setPrices([e.target.value, priceMax])}} className="text-black rounded-md bg-loginInput pl-2 h-[25px] w-[50px] z-40" />$
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-7">
                            <span className="pt-1 pr-5">To: </span>
                            <div className="flex flex-col w-[120px] overflow-hidden z-20 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[70px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <input value={priceMax} onChange={(e) => {setPriceMax(e.target.value); setPrices([priceMin, e.target.value])}} className="text-black rounded-md bg-loginInput h-[25px] pl-2 w-[50px] z-40" />$
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Price
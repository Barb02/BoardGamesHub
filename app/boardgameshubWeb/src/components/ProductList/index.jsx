import user_group_icon from "../../static/user_group_icon.svg";
import gameService from "../../services/gameService";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function ProductList({ query, sort, order, categories, players, complexities, playtimes, prices }) {
    const [rdata, setRdata] = useState([]);
    const [rprices, setRprices] = useState();
    const [rdataload, setDataLoad] = useState(false);

    function expandProductView(e) {
        let node = e.target;
        while(node.id === ""){
            node = node.parentNode;
        }
        node.style.display = 'none';
        document.getElementById(node.id + "_hover").style.display = 'block';
    }

    function shrinkProductView(e) {
        let node = e.target;
        while(node.id === ""){
            node = node.parentNode;
        }
        node.style.display = 'none';
        document.getElementById(node.id.split("_hover")[0]).style.display = '';
    }

    useEffect(() => {
        if (query || query === ""){
            let playerNum = [];
            let complexityNum = [];
            let playtimeNum = [];
            sort = sort.toLowerCase();

            handleExceptions(playerNum, complexityNum, playtimeNum, categories);

            gameService.getGames(query, sort, order, categories, playerNum, complexityNum, playtimeNum, prices).then((data) => {
                setRdata(data || []);

                const promises = data.map((game) => {
                    return gameService.getLowestPrice(game.id).then((datas) => datas.price);
                })

                Promise.all(promises).then((prices) => {     
                    setRprices(prices || []);
                    setDataLoad(true);
                }); 
            });   
        }
    }, [query, sort, order, categories, players, complexities, playtimes, prices]);

    function handleExceptions(player, complexity, playtime, categories) {
        const playtimeMins = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 300, 360];
        if (sort === "release date")
            sort = "yearPublished";

        player[0] = players[0] === 10 ? "any" : players[0] + 1;
        player[1] = players[1] === 10 ? "any" : players[1] + 1;

        complexity[0] = complexities[0] + 1;
        complexity[1] = complexities[1] + 1;

        playtime[0] = playtimeMins[playtimes[0]];
        playtime[1] = playtimeMins[playtimes[1]];

        if (categories.length === 0)
            categories = "";

    }

    function getPrice(index) {
        return (Math.round(rprices[index] * 100) / 100).toFixed(2);
    }


    return (
        <div className="max-w-5xl mx-auto pt-5 pb-4">
            {rdataload && rdata.map((game, index) => (
                <Link to={`/product/${game.id}`}>
                    <div id={game.id} className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4" onMouseOver={expandProductView}>
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
                    
                    {/* Hover game for more details */}

                    <div id={game.id + "_hover"} className="flex flex-col rounded-xl w-full h-[250px] bg-searchProductBackgroundHover mb-4" 
                        style={{display: "none"}} onMouseLeave={shrinkProductView}>
                    <div className="w-full flex h-[50%]">
                        <img alt="boardgame_cover" className="object-cover mt-3 ml-3 rounded-lg h-[90%] w-[120px]" src={game.image} />
                        <div className="flex flex-col pl-3 w-[60%]">
                            <span className="mr-5 text-xl pt-3 pl-5">{game.name}</span>
                            <ul className="inline-block">
                                {game.categories.slice(0,2).map((category) => (
                                    <li key={category.id} className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">{category.name}</li>
                                ))}
                            </ul>
                            <div className="pt-[2%] ml-1 inline-block">
                                <div className="inline-block text-sm text-center">
                                    Players
                                    <p>
                                    <img alt="user_group_image" className="inline-block pr-1" src={user_group_icon} />
                                    {game.minplayers}-{game.maxplayers}
                                    </p>
                                </div>
                                <div className="inline-block pl-7 text-sm text-center">
                                    Age
                                    <p>{game.minage}+</p>
                                </div>
                                <div className="inline-block pl-7 text-sm text-center">
                                    Playtime
                                    <p>
                                    {game.minplaytime}-{game.maxplaytime} min
                                    </p>
                                </div>
                            </div>
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
                    <div className="w-full h-[50%]">
                        <div className="flex justify-around mt-4">
                            {game.images.slice(0,3).map((image, index) => (
                                <img alt="boardgame_image" className="object-cover rounded-xl w-[330px] h-[100px]" src={image} />
                            ))}
                        </div>
                    </div>
                    </div>
                </Link>
            ))}
            


            
        </div>
    );
}

export default ProductList;
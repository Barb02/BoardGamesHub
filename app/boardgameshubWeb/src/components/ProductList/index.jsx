import logo_worten from "../../static/logo_worten.jpg";
import user_group_icon from "../../static/user_group_icon.svg";


function ProductList({ query }) {
    
    function expandProductView(e) {
        let node = e.target;
        while(node.id == ""){
            node = node.parentNode;
        }
        node.style.display = 'none';
        document.getElementById(node.id + "_hover").style.display = 'block';
      }
    
    const scorePercentage = Math.round(7.9 * 10) + "%";
    
    return (
        <div className="max-w-5xl mx-auto pt-5">
            <div id='1' className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4" onMouseOver={expandProductView}>
                <img className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" src={logo_worten} />
                <div className="flex flex-col pl-3">
                    <text className="mr-5 text-xl pt-3 pl-5">WayFinders</text>
                    <ul className="inline-block">
                        <li className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Action</li>
                        <li className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Puzzle</li>
                        <li className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Strategy</li>
                    </ul>
                </div>
                <div className="ml-auto w-[30%] flex">
                    <div className="flex-col w-full self-center text-center">
                        <text className="text-xs">score: 7.8</text>
                        <div className="w-[75%] rounded-full h-1.5 dark:bg-gray-700 mx-auto">
                            <div className={`bg-primary h-1.5 rounded-full`} style={{ width: scorePercentage }}></div>
                        </div>
                    </div>
                    <text className="float-right text-2xl self-center ml-4 mr-5">54,99$</text>
                </div>
            </div>


            <div id='1_hover' className="flex flex-col rounded-xl w-full h-[250px] bg-searchProductBackgroundHover mb-4" style={{display: "none"}}>
                <div className="w-full flex h-[50%]">
                    <img className="object-cover mt-3 ml-3 rounded-lg h-[90%] w-[120px]" src={logo_worten} />
                    <div className="flex flex-col pl-3">
                        <text className="mr-5 text-xl pt-3 pl-5">WayFinders</text>
                        <ul className="inline-block">
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Action</li>
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Puzzle</li>
                            <li className="bg-secondary inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Strategy</li>
                        </ul>
                        <div className="pt-[5%] ml-1 inline-block">
                            <div className="inline-block text-sm text-center">
                                Players
                                <p>
                                <img className="inline-block pr-1" src={user_group_icon} />
                                2-4
                                </p>
                            </div>
                            <div className="inline-block pl-7 text-sm text-center">
                                Age
                                <p>12+</p>
                            </div>
                            <div className="inline-block pl-7 text-sm text-center">
                                Playtime
                                <p>
                                30-60 min
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto w-[30%] flex">
                        <div className="flex-col w-full self-center text-center">
                            <text className="text-xs">score: 7.8</text>
                            <div className="w-[75%] rounded-full h-1.5 dark:bg-gray-700 mx-auto">
                                <div className={`bg-primary h-1.5 rounded-full`} style={{ width: scorePercentage }}></div>
                            </div>
                        </div>
                        <text className="float-right text-2xl self-center ml-4 mr-5">54,99$</text>
                    </div>
                </div>
                <div className="w-full h-[50%]">
                    <div className="flex justify-around mt-4">
                        <img className="object-cover rounded-xl w-[330px] h-[100px]" src={logo_worten} />
                        <img className="object-cover rounded-xl w-[330px] h-[100px]" src={logo_worten} />
                        <img className="object-cover rounded-xl w-[330px] h-[100px]" src={logo_worten} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
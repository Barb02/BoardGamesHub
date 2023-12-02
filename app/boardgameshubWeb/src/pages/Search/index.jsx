import { CiSearch } from "react-icons/ci";
import { TbFilterOff } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { ProductList } from "../../components";

function Search() {
    return (
      <div className="w-full h-auto text-text font-text">
        <div className="pt-[3%]">
            <div className="text-4xl max-w-6xl pl-6 pb-1 mx-auto">
                    Discover:
            </div>
            <div className="max-w-5xl mx-auto">
                <div className="bg-searchDivBackground h-14 rounded-t-xl flex items-center">
                    <input className="ml-5 mr-3 pl-4 text-xl text-black bg-searchBackground rounded-md w-[40%] h-[70%] outline-none shadow-innerSearch" autocomplete="off"></input>
                    <button className="flex rounded-xl p-4 pt-2 pb-2 mr-4 bg-primary ">
                        Search
                        <span className="pl-1 self-center"><CiSearch /></span>
                    </button>
                    <button className="flex rounded-xl p-4 pt-2 pb-2 mr-4 items-center bg-primary  ml-auto">
                        Filters
                        <span className="pl-1 self-center"><TbFilterOff /></span>
                    </button>
                    <span className="mr-3 text-sortByText text-sm">Sort by</span>
                    <button className="flex rounded-xl p-4 pt-2 pb-2 mr-4 bg-primary self-center">
                        Relevance
                        <span className="pl-1 self-end"><IoIosArrowDown size={23}/></span>
                    </button>                          
                </div>
            </div>

            <div className="bg-primary bg-gradient-to-t from-gradient to-100% h-auto min-h-[800px]">
                <ProductList />
            </div>
        </div>
      </div>
    );
  }
  
  export default Search;
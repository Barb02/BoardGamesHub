import { CiSearch } from "react-icons/ci";
import { ProductList, SortSearch, FilterSearch } from "../../components";
import { Form, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Search() {
    // SEARCH STATES //
    const [search, setQuery] = useState();
    const [rquery, setRquery] = useState();
    ///////////////////

    // SORT STATES //
    const [currentOrder, setOrder] = useState("asc");
    const [currentSort, setSort] = useState("Name");
    /////////////////

    // FILTER STATES //
    const [categories, setCategories] = useState(""); // none selected
    const [players, setPlayers] = useState([10, 10]); // any, any
    const [playtimes, setPlaytimes] = useState([0, 11]); // 15mins, 6 hours
    const [complexities, setComplexities] = useState([0, 4]); // light, heavy
    const [prices, setPrices] = useState(["0", "900"]);
    ////////////////////

    const navigate = useNavigate();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('q');
        const category = queryParams.get('categories');

        if (category != null)
            setCategories([category]);

        setQuery(query);
        setRquery(query);
    }, []);

    
    const handleSearch = (e) => {
        setQuery(e.target[0].value);
        navigate(`/search?query=${encodeURI(search)}&orderBy=${currentSort}`);
    }

    const handleChange = (e) => {
        setRquery(e.target.value);
    }

    return (
      <div id="search_body" className="w-full h-auto text-text font-text">
        <div className="pt-[3%]">
            <div className="text-4xl max-w-6xl pl-6 pb-1 mx-auto">
                    Discover:
            </div>
            <div className="max-w-5xl mx-auto">
                <div className="bg-searchDivBackground h-14 rounded-t-xl flex items-center">
                    <Form className="flex w-full h-full items-center" method="get" action="/search" onSubmit={(e) => handleSearch(e)}>
                        <input value={rquery} onChange={(e) => handleChange(e)} name="q" className="ml-5 mr-3 pl-4 text-xl text-black bg-searchBackground rounded-md w-[60%] h-[70%] outline-none shadow-innerSearch" autoComplete="off"></input>
                        <button className="flex rounded-xl p-4 pt-2 pb-2 bg-primary ">
                            Search
                            <span className="pl-1 self-center"><CiSearch /></span>
                        </button>
                    </Form>
                    <FilterSearch categories={categories} setCategories={setCategories}
                                  players={players} setPlayers={setPlayers}
                                  playtimes={playtimes} setPlaytimes={setPlaytimes}
                                  complexities={complexities} setComplexities={setComplexities}
                                  prices={prices} setPrices={setPrices}
                    />
                    <span className="mr-3 text-sortByText text-sm ml-4 w-[10%]">Sort by</span>
                    <SortSearch currentSort={currentSort} setSort={setSort} currentOrder={currentOrder} setOrder={setOrder} />                         
                </div>
            </div>
            <div className="bg-primary bg-gradient-to-t from-gradient to-100% h-auto min-h-[800px]">
                <ProductList query={search} sort={currentSort} order={currentOrder} categories={categories} players={players} 
                            playtimes={playtimes} complexities={complexities} prices={prices}/>
            </div>
        </div>
      </div>
    );
  }
  
  export default Search;
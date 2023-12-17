

const Categories = ( {currentCategories, setCategories} ) => {
    const categories_list = ["Fantasy","Adventure","Area Control","Card Game","Tower Defense","Collectible","Miniatures","Horror",
    "Worker Placement","Exploration"];

    const toggleCategory = (category) => {
        let currentCategories = [];
        setCategories((categories) => {
            if (categories.includes(category)){
                currentCategories = categories.filter((cat) => cat !== category);
                return currentCategories;
            }
            else{
                currentCategories = [... categories, category];
                return currentCategories
            }
        });
    };

    return (
        <div className="flex flex-col w-[33.3%] h-full">
            <div className="text-2xl ml-7 mt-4">
                <span>Categories:</span>
            </div>
            <div className="flex flex-col relative ml-7 mt-4 text-md">
                {categories_list.map((category, index) => (
                    <div className="pb-1">
                        <div className="inline-block cursor-pointer">
                            <div className="relative">
                                <div className="flex items-center" onClick={() => toggleCategory(category)}>
                                    <span className={`rounded h-5 w-5 border mr-4 ${currentCategories.includes(category) ? 'bg-green-600' : ''}`} />
                                    <span>{category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
import { useState, useEffect } from "react";


const Categories = ( {currentCategories, setCategories} ) => {
    const categories_list = ["Fantasy","Adventure","Area Control","Card Game","Tower Defense","Collectible","Miniatures","4X",
    "Worker Placement","Family"];

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setSelectedCategories(currentCategories);
      }, [currentCategories]);

    const toggleCategory = (index) => {
        let currentCategories = [];
        setSelectedCategories((categories) => {
          if (categories.includes(index)){
            currentCategories = categories.filter((category) => category !== index);
            setCategories(currentCategories);
            return currentCategories;
          }
          else{
            currentCategories = [... categories, index];
            setCategories(currentCategories);
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
                                <div className="flex items-center" onClick={() => toggleCategory(index)}>
                                    <span className={`rounded h-5 w-5 border mr-4 ${selectedCategories.includes(index) ? 'bg-green-600' : ''}`} />
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
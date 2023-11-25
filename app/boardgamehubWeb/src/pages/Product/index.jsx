import product from "../../static/tapestry_bg.jpg"

function Product() {
    return (
      <div className="w-full h-[900px] bg-background">
        <div className="max-w-7xl mx-auto relative">
                {/* Product display area */}
                <div className="pt-24 flex">
                    <div className="max-w-xs pt-5 inline-block">
                        <img className="rounded-3xl shadow-image" src={product} />
                    </div>

                    <div className="ml-[7%]">
                        <h1 className="text-text text-4xl">Tapestry</h1>
                    </div>

                    <div className="">

                    </div>

                    <div className="">

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
import { IoIosArrowDown } from "react-icons/io";
import { WishList } from "../../components";
import { Form } from 'react-router-dom';
import { useEffect, useState } from "react";
import accountService from "../../services/accountService";

function Wishlist() {
    

    return (
        <div className="w-full h-auto text-text font-text">
            <div className="pt-[3%]">
                <div className="text-4xl max-w-5xl pl-2 pb-3 mx-auto">
                        Your Wishlist
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="bg-primary h-14 rounded-t-xl flex text-xl w-[70%]">
                        <span className="mr-3 ml-4 w-[20%] self-center">Sort by:</span>
                        <button className="flex rounded-xl items-center self-center mr-5">
                            Name
                            <span className="pl-1 self-end"><IoIosArrowDown size={35}/></span>
                        </button>
                        <Form className="flex w-full h-full items-center" method="get">
                            <input placeholder="Search by name or tag" name="q" className="mr-3 pl-4 text-xl text-black bg-loginInput rounded-md w-full h-[70%] outline-none" autoComplete="off"></input>
                        </Form> 
                    </div>
                </div>

                <div className="bg-primary bg-gradient-to-t from-gradient to-100% h-auto min-h-[800px]">
                    < WishList query={"yes"} />
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
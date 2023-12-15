import { useRef } from "react";
import logo from "../../static/logo.svg"
import accountService from "../../services/accountService";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { BiSolidError } from "react-icons/bi";

function Register() {
    const navigate = useNavigate();
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const passordInput = useRef(null);
    const Login = useUserStore((state) => state.login)
    const logged = useUserStore((state)=>state.logged)
    const [error,setError] = useState(false);

    const verifyInputs = ()=>{
        if(!String(emailInput.current.value).toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ))
            return false
        if (String(emailInput.current.value).length < 8)
            return false

        return true
    }

    const login = ()=>{
        if(verifyInputs()){
            accountService.signup({
                "username": usernameInput.current.value,
                "email": emailInput.current.value,
                "password": passordInput.current.value,
            }).then((data)=>{
                Login(data.token,usernameInput.current.value)
                navigate("/")
            })
        }else{
            setError(true)
        }
    }

    useEffect(()=>{
        if(logged){
            navigate("/")
        }
    },[])

    return(
        <div className="w-full h-full text-text font-text">
            <div className="h-full w-full absolute z-0 opacity-5">
                <img alt="background_logo" className="h-[50%] mx-auto mt-[3%]" src={logo}></img>
            </div>
            <div className="pt-[11%] text-xl max-w-md mx-auto flex flex-col">
                <div className="flex flex-col z-10">
                    <span className="pb-1 pl-3">Username</span>
                    <input ref={usernameInput} className="text-lg bg-loginInput text-black rounded-sm outline-none pl-2" autocomplete="off"></input>
                </div>
                <div className="flex flex-col z-10 pt-[10%]">
                    <span className="pb-1 pl-3">Email</span>
                    <input ref={emailInput} className="text-lg bg-loginInput text-black rounded-sm outline-none pl-2" autocomplete="off"></input>
                </div>
                <div className="flex flex-col z-10 pt-[10%]">
                    <span className="pb-1 pl-3">Password</span>
                    <input ref={passordInput} type="password" className="text-lg bg-loginInput text-black rounded-sm outline-none pl-2" autocomplete="off"></input>
                </div>
                <div className="z-0 mt-[10%] place-self-center flex flex-col place-items-center">
                    <button className="rounded-xl p-4 z-10 pt-2 pb-2 mt-[10%] bg-primary text-text" onClick={login}>Register</button>
                    { error && <div className="text-center flex gap-2"><BiSolidError className=" translate-y-[6px]"/> erro dados invalidos</div>}
                </div>
            </div>
        </div>
    );
}

export default Register;
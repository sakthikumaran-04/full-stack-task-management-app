import { LogIn, LogOut, MenuIcon, X } from "lucide-react"
import { Button } from "./ui/button"
import { Link, NavLink } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useState } from "react"

function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const {userId,logout} = useAuthStore();
    const navigate = useNavigate();

    function handleLogin(){
        setShowMenu(false);
        if(userId == ""){
            navigate("/signup");
        }else{
            logout();
            toast.success("Logout successful")
        }
    }

  return (
    <nav className="flex justify-between gap-2 px-8 py-5 shadow-sm items-center sticky top-0 w-full z-10 bg-white">
        <Link to={"/"} className="text-xl font-Logo cursor-pointer">FoodBell</Link>
        <MenuIcon className="md:hidden" onClick={()=>setShowMenu(true)}/>
        <div className={`flex items-center gap-2 ${showMenu? "max-md:right-0" : "max-md:hidden"} max-md:absolute max-md:top-0 transition-all duration-100 ease-in-out z-20`}>
            <div className="flex items-center justify-center gap-7 md:pr-5 max-md:flex-col max-md:bg-white max-md:p-10 max-md:min-w-[220px] max-md:h-screen">
                <X className=" absolute top-10 right-10 md:hidden" onClick={()=>setShowMenu(false)}/>
                <NavLink to={"/"} className={({isActive})=>isActive?"text-orange-400" : "text-black"} onClick={()=>setShowMenu(false)}>Home</NavLink>
                <NavLink to={"/menu"} className={({isActive})=>isActive?"text-orange-400" : "text-black"} onClick={()=>setShowMenu(false)}>Menu</NavLink>
                <NavLink to={"/cart"} className={({isActive})=>isActive?"text-orange-400" : "text-black"} onClick={()=>setShowMenu(false)}>Cart</NavLink>
                <NavLink to={"/orders"} className={({isActive})=>isActive?"text-orange-400" : "text-black"} onClick={()=>setShowMenu(false)}>Orders</NavLink>
                <Button onClick={handleLogin}>
                    {userId == "" ? <><p>Login </p><LogIn /></>:<><p>Logout </p><LogOut /></>}
                </Button>
            </div>
        </div>
    </nav>
  )
}
export default Navbar
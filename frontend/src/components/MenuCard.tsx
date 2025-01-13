import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCartStore } from "../store/cartStore.ts"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

type MenuCardProps = {
    id:string,
    image:string,
    name:string,
    price:number,
    category:string,
    available:boolean
}

function MenuCard({id,image,name,price,category,available}:MenuCardProps) {
    const [inCart, setInCart] = useState(false);
    const {addItem, removeItem, isItemInCart} = useCartStore();
    
    function handleCart(){
        if(!inCart){
            addItem({id,image,name,category,price,quantity:1});
            toast.success("Added to cart");
            setInCart(true);
        }else{
            removeItem(id);
            toast.success("Removed from cart");
            setInCart(false);
        }
    }

    useEffect(()=>{
        if(isItemInCart(id)){
            setInCart(true);
        }
    },[id,isItemInCart])

  return (
    <div className="w-[300px] border-2 p-4 rounded-md">
            <div className="rounded-xl">
                <img src={image} className="w-full h-[200px] rounded-md" alt="menu" />
            </div>
            <div className="flex justify-between mt-3">
                <p>{name}</p>
                <p>price: &#8377;{price}</p>
            </div>
            <div className="flex justify-between mt-3">
                <p className="border-2 p-1 px-2 rounded-md">{category}</p>
                <p className="border-2 p-1 px-2 rounded-md">{available?"Available":"Not Available"}</p>
            </div>
            <Button className="mt-3" onClick={handleCart}>
                {inCart?"Remove from cart":"Add to cart"} <ShoppingCart />
            </Button>
    </div>
  )
}
export default MenuCard
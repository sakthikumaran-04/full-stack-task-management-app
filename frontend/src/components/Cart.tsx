import { useCartStore } from "@/store/cartStore";
import CartCard from "./CartCard";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

type Item = {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

function Cart() {

  const { cart,getTotalPrice,clearCart } = useCartStore();
  const {userId} = useAuthStore();

  async function placeOrder() {
     try {
        console.log(userId);
        if(userId.trim() == ""){
          toast.error("Please login to continue ordering");
          return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/order`,{
            method:"POST",
            credentials: "include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId,items:cart,totalAmount:getTotalPrice(),status:"pending"})
        })
        if(response.ok){
            clearCart();
            toast.success("Order placed successfully");
        }else{
            const result = await response.json();
            if(!result.success){
              toast.error("Please login to continue ordering");
            }else{
              toast.error(result.message);
            }
        }
     } catch (error) {
        if(error instanceof Error){
            toast.error(`Error: ${error.message}`);
        }else{
            toast.error(`Unexpected Error: ${error}`);
        }
     }
  }

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl text-center mt-2">My Cart</h2>
      <div className="flex flex-col gap-4 py-12 w-full">
        {cart.length>0 ? cart.map((item: Item) => (
          <CartCard id={item.id} image={item.image} name={item.name} category={item.category} price={item.price} quantity={item.quantity} />
        )) : <p className="text-center py-12">You don't have any item on cart</p>}
      </div>

      {cart.length>0 && <Button className="my-5" onClick={placeOrder}>Pay &#8377;{getTotalPrice() + " on Delivery"}</Button>}
    </section>
  );
}

export default Cart;

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import OrderCard from "./OrderCard";

type Order = {
    userId: string,
    items: [
        {
            id: string,
            image: string,
            name: string,
            category: string,
            price: number,
            quantity: number,
        }
    ],
    totalAmount: number,
    status: "completed" | "pending"
}

function Order() {

    const [orders, setOrders] = useState<Order [] | []>([]);
    const {userId} = useAuthStore();

    async function fetchOrders(userId:string) {
        if(userId == ""){
            toast.error("Please login to view orders.");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/order/user/${userId}`,{
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.ok){
                const result = await response.json();
                setOrders(result.orderItems);
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

    useEffect(()=>{
        fetchOrders(userId);
    },[userId])

  return (
    <section className="flex flex-col items-center">
        <h2 className="text-4xl text-center mt-2">My Orders</h2>
        <div className="flex flex-col gap-4 py-12 w-full">
            {
                orders.length>0 ? orders.map((item)=>(
                    <OrderCard items={[item.items[0]]} totalAmount={item.totalAmount} status={item.status}/>
                )):(<p className="text-center py-12">You don't have any item on cart</p>)
            }
        </div>
    </section>
  )
}
export default Order
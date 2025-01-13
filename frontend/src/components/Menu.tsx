import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuCard from "./MenuCard";

type MenuData = {
    _id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    availability: boolean;
};

function Menu() {
    const [data, setData] = useState<MenuData[] | []>([]);

    async function fetchMenu() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/menu`);
            if (response.ok) {
                const result = await response.json();
                setData(result?.menuItems || []); // Safeguard: Ensure it defaults to an empty array
                // console.log(result?.menuItems);
            } else {
                toast.error("Unexpected Error While Loading Menu Items");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected Error While Loading Menu Items");
            }
        }
    }

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <section className="text-center py-12">
            <div>
                <h3 className="text-4xl">Menu</h3>
                <p className="text-md text-slate-600">Check out our latest menu</p>
            </div>
            <div className="flex gap-5 flex-wrap items-center justify-center mt-12">
                {data.length > 0 ? (
                    data.map((item) => (
                        <MenuCard
                            id={item._id}
                            key={item._id}
                            image={item.image}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            available={item.availability}
                        />
                    ))
                ) : (
                    <p>No items available at the moment.</p> // In case the data array is empty
                )}
            </div>
        </section>
    );
}

export default Menu;

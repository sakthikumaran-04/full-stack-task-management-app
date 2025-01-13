import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";

type Item = {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  };

function CartCard(item:Item) {

    const { cart, addItem, removeItem, updateQuantity } = useCartStore();

     // Add item to the cart
    function handleAddCart(item: Item) {
    const existingItem = cart.find((cartItem:Item) => cartItem.id === item.id);
    if (existingItem) {
      // If the item exists, update the quantity
      addItem({ ...existingItem, quantity: existingItem.quantity + 1 });
    } else {
      // If the item doesn't exist, add it to the cart
      addItem({ ...item, quantity: 1 });
    }
  }

  // Decrease item quantity or remove it if quantity reaches zero
  function handleRemoveCart(itemId: string) {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      // Decrement the quantity
      updateQuantity(itemId, existingItem.quantity - 1);
    } else if (existingItem && existingItem.quantity === 1) {
      // Remove the item completely
      removeItem(itemId);
    }
  }


  return (
    <div
      className="grid grid-cols-5 max-md:grid-cols-2 max-md:gap-5 place-content-center place-items-center border-b-2 py-4"
      key={item.id}
    >
      <img
        src={item.image}
        className="w-[100px] h-[60px] rounded-md"
        alt={item.name}
      />
      <p>{item.name}</p>
      <div className="flex items-center border-2 rounded-lg">
        <Button onClick={() => handleRemoveCart(item.id)}>-</Button>
        <p className="px-3">{item.quantity}</p>
        <Button onClick={() => handleAddCart(item)}>+</Button>
      </div>
      <p>Price: &#8377;{item.price}</p>
      <div className="md:hidden"></div>
      <p>Total Price: &#8377;{item.price * item.quantity}</p>
    </div>
  );
}
export default CartCard;

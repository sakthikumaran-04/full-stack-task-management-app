
type Order = {
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

function OrderCard(order:Order) {
  return (
    <div
      className="grid grid-cols-6 max-md:grid-cols-2 max-md:gap-5 py-4 border-b-2 place-content-center place-items-center"
      key={order.items[0].id}
    >
      <img
        src={order.items[0].image}
        className="w-[100px] h-[60px] rounded-md"
        alt={order.items[0].name}
      />
      <p>{order.items[0].name}</p>
      <p>Price: &#8377;{order.items[0].price}</p>
      <p>Quatity: {order.items[0].quantity}</p>
      <p>Total Price: &#8377;{order.totalAmount}</p>
      <p className="bg-orange-500 text-white p-2 rounded-md">Status: {order.status}</p>
    </div>
  );
}
export default OrderCard;

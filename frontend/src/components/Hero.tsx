import { Button } from "./ui/button"

function Hero() {
  return (
    <section className="hero min-h-screen
     flex items-center pl-12 max-md:p-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-5xl font-bold">Best Food When Hungry</h2>
        <p className="text-xl font-semibold">Open every day from 8 am to 12 pm</p>
        <p className="text-sm text-slate-600 max-w-[500px]">Get up to 25% off on our mouthwatering pizzas – whether you're a fan of classic Margheritas, loaded meat lovers, or cheesy delights, we've got something for every pizza lover!</p>
        <Button className="p-6 px-7 mt-3">Order Now</Button>
      </div>
    </section>
  )
}
export default Hero
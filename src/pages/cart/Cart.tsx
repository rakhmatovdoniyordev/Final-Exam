import { useSelector, useDispatch } from "react-redux"
import {  useNavigate } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { incrementQuantity, decrementQuantity, removeFromCart } from "../../redux/cartSlice"
import { RiDeleteBinFill } from "react-icons/ri"
import { FaAngleRight } from "react-icons/fa"

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items || [])
  console.log(cartItems);
  const subtotal = Array.isArray(cartItems)
  ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  : 0
  const discount = subtotal * 0.2
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee
  const navigate = useNavigate()
  return (
    <div className="container my-10">
      <div className="flex items-center gap-2 text-sm mb-8">
        <button onClick={()=> navigate("/")} className="hover:underline text-sm md:text-base">
          Home
        </button>
        <span><FaAngleRight/></span>
        <p>Cart</p>
      </div>
      <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex justify-between">
              <div className="flex items-center gap-4 justify-between">
                <div className="w-24 h-24 bg-[#F0EEED] rounded-xl">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color || "Default"}</p>
                    <span className="font-semibold">${item.price}</span>
                  </div>
                </div>
              </div>
                <div className="flex">
                  <div className="flex items-end flex-col justify-between">
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-600 text-2xl">
                  <RiDeleteBinFill className="text-red-500" />
                </button>
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="p-1 hover:text-gray-600 text-2xl"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xl">{item.quantity}</span>
                      <button onClick={() => dispatch(incrementQuantity(item.id))} className="p-1 hover:text-gray-600 text-2xl">
                        +
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          ))}
          {cartItems.length === 0 && <div className="w-full h-full flex justify-center items-center text-[60px] max-[850px]:text-[40px] max-[550px]:text-[26px]">The window is empty :)</div>}
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6 w-full">
              <form action="" className="bg-[#F0F0F0] rounded-[62px]">
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="flex-1 px-4 py-2 border rounded-[62px] focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
                />
              </form>
              <button className="px-4 py-2 border rounded-[62px] bg-black text-white hover:bg-slate-800 w-full">Apply</button>
            </div>
            <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors" onClick={()=> navigate("/checkout")}>
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

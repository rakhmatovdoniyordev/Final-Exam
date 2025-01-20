import { Facebook, GitHub, Instagram, Mail, Twitter } from "@mui/icons-material";
import img1 from "../../assets/visa.png"
import img2 from "../../assets/mastercard.png"
import img3 from "../../assets/paypal.png"
import img4 from "../../assets/apple.png"
import img5 from "../../assets/google.png"


export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-black mt-[200px] relative pb-16">
      <div className="container absolute top-[-40%] left-1/2 translate-y-[40%] translate-x-[-50%] max-[770px]:top-[-10%] max-[770px]:translate-y-[10%]">
        <div className="bg-black text-white py-10 px-[54px] rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold max-w-md">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full md:w-80 px-4 py-3 pl-10 rounded-3xl bg-white text-black outline-none"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="w-full md:w-80 bg-white text-black py-3 rounded-3xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="container pt-[130px] max-[770px]:pt-[200px] max-[500px]:pt-[250px]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
            <p className="text-gray-600 mb-4">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" />
              <Facebook className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" />
              <Instagram className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" />
              <GitHub className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">COMPANY</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">About</a></li>
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Works</a></li>
              <li><a href="#" className="hover:text-black">Career</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">HELP</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Customer Support</a></li>
              <li><a href="#" className="hover:text-black">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">FAQ</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Account</a></li>
              <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black">Orders</a></li>
              <li><a href="#" className="hover:text-black">Payments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">RESOURCES</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Free eBooks</a></li>
              <li><a href="#" className="hover:text-black">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-black">How to - Blog</a></li>
              <li><a href="#" className="hover:text-black">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-4 max-[420px]:flex-wrap">
            <img src={img1} alt="Visa"  />
            <img src={img2} alt="Mastercard" />
            <img src={img3} alt="PayPal"  />
            <img src={img4} alt="Apple Pay" />
            <img src={img5} alt="Google Pay"/>
          </div>
        </div>
      </div>
    </footer>
  )
}

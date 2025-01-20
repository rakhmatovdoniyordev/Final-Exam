import hero from "../../assets/hero.jpg"
import img1 from "../../assets/versace.png"
import img2 from "../../assets/zara.png"
import img3 from "../../assets/gucci.png"
import img4 from "../../assets/prada.png"
import img5 from "../../assets/calvin.png"

const Hero = () => {
  return (
    <section className="bg-[#F2F0F1]">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-[10px] max-lg:text-center">
          <div className="max-lg:order-2">
            <h2 className="text-[64px] max-xl:text-[54px] max-lg:text-[48px] max-md:text-[40px] max-sm:text-[32px] integral font-extrabold max-w-[600px] tracking-normal">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h2>
            <p className="satoshi font-normal mb-8 max-md:text-sm">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your
              individuality and cater to your sense of style.
            </p>
            <button className="px-[54px] py-4 rounded-[62px] bg-black text-white mb-12 max-md:px-[40px] max-md:py-3 max-sm:px-[30px] max-sm:py-2 max-sm:text-sm">
              Shop Now
            </button>
            <div className="flex max-md:flex-col max-md:items-center max-md:gap-6">
              <div className="pr-8 border-r border-r-[#0000001A] max-md:border-r-0 max-md:border-b max-md:border-b-[#0000001A] max-md:pb-6">
                <p className="text-[40px] max-lg:text-[32px] max-md:text-[28px] satoshi font-bold">200+</p>
                <span className="text-[#00000099] satoshi max-md:text-sm">International Brands</span>
              </div>
              <div className="mx-8 max-md:mx-0">
                <p className="text-[40px] max-lg:text-[32px] max-md:text-[28px] satoshi font-bold">2,000+</p>
                <span className="text-[#00000099] satoshi max-md:text-sm">High-Quality Products</span>
              </div>
              <div className="pl-8 border-l border-l-[#0000001A] max-md:border-l-0 max-md:border-t max-md:border-t-[#0000001A] max-md:pt-6">
                <p className="text-[40px] max-lg:text-[32px] max-md:text-[28px] satoshi font-bold">30,000+</p>
                <span className="text-[#00000099] satoshi max-md:text-sm">Happy Customers</span>
              </div>
            </div>
          </div>
          <div className="max-h-[750px] overflow-hidden max-lg:order-1 max-lg:mb-8 max-[900px]:max-h-[600px] max-[600px]:max-h-[520px] max-[500px]:max-h-[450px] max-[450px]:max-h-[380px]">
            <img src={hero || "/placeholder.svg"} alt="Hero" className="object-contain max-w-full h-auto" />
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="container">
          <div className="flex justify-between py-[44px] flex-wrap gap-4 max-md:justify-center">
            <div className="max-sm:w-1/3">
              <img src={img1 || "/placeholder.svg"} alt="Versace" className="max-w-full h-auto" />
            </div>
            <div className="max-sm:w-1/3">
              <img src={img2 || "/placeholder.svg"} alt="Zara" className="max-w-full h-auto" />
            </div>
            <div className="max-sm:w-1/3">
              <img src={img3 || "/placeholder.svg"} alt="Gucci" className="max-w-full h-auto" />
            </div>
            <div className="max-sm:w-1/3">
              <img src={img4 || "/placeholder.svg"} alt="Prada" className="max-w-full h-auto" />
            </div>
            <div className="max-sm:w-1/3">
              <img src={img5 || "/placeholder.svg"} alt="Calvin Klein" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

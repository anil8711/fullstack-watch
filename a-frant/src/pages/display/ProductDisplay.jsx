import React, { useEffect } from "react";
import ProductSectionWatch5 from "../../images/HomePage/smart-watch-5-frontbackView.png";
import ProductSectionWatch6 from "../../images/HomePage/ProductDisplay-Watch-image.jpeg";
import { ImPower } from "react-icons/im";
import AOS from "aos";
import "aos/dist/aos.css"; 
export default function ProductDisplay() {
   useEffect(() => {
    AOS.init({
      duration:1000,
      once: true,
    });
  }, []);
  return (
    <section id="Product-Display-Section" className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side - Image */}
          <div
            className="w-full lg:w-1/2 flex justify-center"
            data-aos="fade-up-right"
          >
            <img
              src={ProductSectionWatch5}
              alt="Smart-Watch-SideView"
              className="max-w-full h-auto"
            />
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left" data-aos="fade-up">
              <h3 className="text-3xl font-semibold mb-3 flex items-center justify-center lg:justify-start gap-2">
                <ImPower className="text-yellow-500" />
                Empower Your Wrist,
                <br /> Elevate Your Day
              </h3>
              <p className="text-gray-700">
                Enhance your wrist experience with cutting-edge technology,
                uplifting your daily activities to new heights.
              </p>
            </div>

            {/* Secondary Image and Description */}
            <div
              className="flex flex-col md:flex-row items-center gap-6"
              data-aos="fade-up-left"
            >
              <div className="md:w-1/2">
                <img
                  src={ProductSectionWatch6}
                  alt="Smart-Watch"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <h4 className="text-xl font-semibold mb-2">
                  Smartwatches come
                </h4>
                <p className="text-gray-600 text-sm">
                  Overall our smartwatches offer a wide range of advantages...
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded transition duration-200 shadow-md">
                Explore More <span className="font-bold">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10"></div>
      </div>
    </section>
  );
}

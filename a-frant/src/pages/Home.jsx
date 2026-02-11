import React from 'react';
import { Link } from 'react-router-dom';
import Banners1 from '../shop/Banners1'; // ✅ Adjust path
import banner1 from "../images/banners/Rage.webp";
import banner2 from "../images/banners/Boltt.png";
import banner3 from "../images/banners/Fusion.webp";
import Gallery from '../shop/Gallery';
import Explore from './explore/Explore';
import ProductDisplay from './display/ProductDisplay';
import FAQ from './FAQ/FAQ';

const Home = () => {
  return (
    <>
    <Banners1/>
      <div>
        {/* Hero Section */}
        <main className=" dark:bg-gray-800 bg-white relative overflow-hidden ">
          <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-3 flex relative py-2">
              <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-1" />
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  Be on
                  <span className="text-5xl sm:text-7xl">Time</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
                  Dimension of reality that makes change possible and understandable. An indefinite and homogeneous
                  environment in which natural events and human existence take place.
                </p>
                <div className="flex mt-5">
                  <Link
                    to="/watch"
                    className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
                  >
                    Get started
                  </Link>
                  <a
                    href="#"
                    className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
                  >
                    Read more
                  </a>
                </div>
              </div>
              <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img
                  src="https://www.tailwind-kit.com/images/object/10.png"
                  className="max-w-xs md:max-w-sm m-auto"
                  alt="Watch Hero"
                />
              </div>
            </div>
          </div>
          
        </main>
        <ProductDisplay/>
        <Explore/>
        <Gallery/>
        <FAQ/>
      </div>
    </>
  );
};

export default Home;

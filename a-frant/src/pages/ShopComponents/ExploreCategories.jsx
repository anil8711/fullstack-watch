import React from "react";
import ScrollToTopLink from "../../pages/ShopComponents/ScrollToTopLink";

// images
import smartWatchCategoriesBanner from "../../images/categories/smart-watches-categories.webp";
import wirelessTWSCategoriesBanner from "../../images/categories/wireless-categories.webp";
import accessoriesCategoriesBanner from "../../images/categories/accessories-categories.webp";
import soundBarsCategoriesBanner from "../../images/categories/soundbar-categories.webp";

export const ExploreCategories = () => {
  return (
    <div id="ExploreCategories" className="pt-4 pb-4">
      <div className="container mx-auto mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Categories</h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Smart Watches */}
          <div className="w-full md:w-1/2">
            <ScrollToTopLink to="smart-watches">
              <div
                className="relative overflow-hidden rounded-lg shadow-lg group"
                data-aos="zoom-in"
              >
                <img
                  src={smartWatchCategoriesBanner}
                  alt="Smart Watches"
                  loading="lazy"
                  className="w-full h-auto transform group-hover:scale-105 transition duration-300 ease-in-out"
                />
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-semibold text-sm group-hover:bg-opacity-70 transition">
                  SMART WATCHES
                </span>
              </div>
            </ScrollToTopLink>
          </div>

          {/* Right Section - 3 categories */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="flex gap-4">
              {/* Wireless TWS */}
              <div className="w-1/2">
                <ScrollToTopLink to="wireless">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg group"
                    data-aos="zoom-in"
                  >
                    <img
                      src={wirelessTWSCategoriesBanner}
                      alt="Wireless TWS"
                      loading="lazy"
                      className="w-full h-auto transform group-hover:scale-105 transition duration-300 ease-in-out"
                    />
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded font-semibold text-sm group-hover:bg-opacity-70 transition">
                      WIRELESS TWS
                    </span>
                  </div>
                </ScrollToTopLink>
              </div>

              {/* Accessories */}
              <div className="w-1/2">
                <ScrollToTopLink to="accessories">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg group"
                    data-aos="zoom-in"
                  >
                    <img
                      src={accessoriesCategoriesBanner}
                      alt="Accessories"
                      loading="lazy"
                      className="w-full h-auto transform group-hover:scale-105 transition duration-300 ease-in-out"
                    />
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded font-semibold text-sm group-hover:bg-opacity-70 transition">
                      ACCESSORIES
                    </span>
                  </div>
                </ScrollToTopLink>
              </div>
            </div>

            {/* Sound Bars */}
            <div>
              <ScrollToTopLink to="sound-bars">
                <div
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                  data-aos="zoom-in"
                >
                  <img
                    src={soundBarsCategoriesBanner}
                    alt="Sound Bars"
                    loading="lazy"
                    className="w-full h-auto transform group-hover:scale-105 transition duration-300 ease-in-out"
                  />
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-semibold text-sm group-hover:bg-opacity-70 transition">
                    SOUND BARS
                  </span>
                </div>
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mt-6" />
    </div>
  );
};

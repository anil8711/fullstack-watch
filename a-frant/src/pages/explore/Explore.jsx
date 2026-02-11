import React from 'react';
import ExploreSectionWatch4 from "../../images/HomePage/smart-watch-4-sideview.png";
import { ReactComponent as Icon1 } from '../../images/icons/settings-svgrepo-com.svg';
import { ReactComponent as Icon2 } from '../../images/icons/voice-svgrepo-com.svg';
import { BiCustomize } from "react-icons/bi";

export default function Explore() {
  return (
    <section id="Explore-section" className="px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-center mb-2 lg:mb-0" data-aos="fade-up-right">
          <div className="w-[80%] max-w-sm">
            <img
              src={ExploreSectionWatch4}
              alt="Smart-Watch-SideView"
              className=" max-w-full h-auto"
              id="Explore-HeroImage"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-2/3">
          <div className="mb-12">
            <div className="mb-8 mt-8" data-aos="fade-up">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                <BiCustomize className="text-yellow-500 text-3xl" />
                Customizable Watch Faces
              </h3>
              <p className="text-gray-600 mt-2">
                Users can personalize their smartwatch experience by choosing from a variety of watch faces.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="flex items-start gap-4 mb-6" data-aos="fade-up-left">
              <div className="w-10 h-10 flex-shrink-0">
                <Icon1 className="w-full h-full transition-transform duration-300 hover:scale-110" />
              </div>
              <p className="text-gray-600">
                Smartwatches can display notifications for calls, messages, emails, and app alerts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 flex-shrink-0">
                <Icon2 className="w-full h-full transition-transform duration-300 hover:scale-110" />
              </div>
              <p className="text-gray-600">
                Many smartwatches have voice assistant integration and provide various user-friendly accessibilities.
              </p>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button
                type="button"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded transition-transform duration-300 hover:scale-105"
              >
                Explore Now <span className="font-bold">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-300"></div>
    </section>
  );
}

import React from "react";

// Import images
import Logo1 from "../../assets/partners/ajio.png";
import Logo2 from "../../assets/partners/flipkar.png";
import Logo3 from "../../assets/partners/myntra.png";
import Logo4 from "../../assets/partners/chroma.png";
import Logo5 from "../../assets/partners/ajio.png";
import Logo6 from "../../assets/partners/cred.png";
import Logo7 from "../../assets/partners/nykaa.png";
import Logo8 from "../../assets/partners/sangeetha.png";

// Store logos in an array for cleaner mapping
const logos = [
  { src: Logo1, alt: "Amazon" },
  { src: Logo2, alt: "Flipkart" },
  { src: Logo3, alt: "Myntra" },
  { src: Logo4, alt: "Chroma" },
  { src: Logo5, alt: "Ajio" },
  { src: Logo6, alt: "Cred" },
  { src: Logo7, alt: "Nykaa" },
  { src: Logo8, alt: "Sangeetha" },
  
];
console.log(Logo1); 

export const BrandPartners = () => {
  return (
    <div className="py-12 bg-blue-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Our Partners
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} data-aos="zoom-in-up">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 md:h-16 mx-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

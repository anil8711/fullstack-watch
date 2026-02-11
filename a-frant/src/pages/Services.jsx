import React from "react";
import { Link } from "react-router";

const services = [
  {
    title: "Screen Replacement",
    description: "Cracked or unresponsive touchscreen? We replace it with original-quality parts.",
    icon: "🖥️"
  },
  {
    title: "Battery Replacement",
    description: "Short battery life? We replace batteries with reliable long-lasting ones.",
    icon: "🔋"
  },
  {
    title: "Software Diagnostics",
    description: "Glitches or slow performance? Our software scan will find and fix the issue.",
    icon: "🧠"
  },
  {
    title: "Strap & Body Repair",
    description: "Damaged strap or watch case? We provide full cosmetic and structural repair.",
    icon: "🛠️"
  },
  {
    title: "Water Damage Treatment",
    description: "Accidental splash or full submersion? We’ll clean and restore internal circuits.",
    icon: "💧"
  },
  {
    title: "Firmware Updates",
    description: "Ensure your watch has the latest features and security patches.",
    icon: "⚙️"
  }
];

const Services = () => {
  return (
    <div className="text-gray-800">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Smartwatch Services</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
          Expert care and professional repair for your wearable tech. Trusted by hundreds of customers.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
          <div>
            <h3 className="text-xl font-bold mb-2">Certified Technicians</h3>
            <p>Our team is trained to handle all major smartwatch brands including Apple, Samsung, Fitbit, and more.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Original Parts</h3>
            <p>We use original or OEM parts to ensure long-lasting performance and safety for your device.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Turnaround</h3>
            <p>Most repairs are completed within 1–2 business days, depending on the issue.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
            <p>Competitive pricing with no hidden fees. Transparent diagnostics before repair.</p>
          </div>
        </div>
      </section>

      {/* Contact / Booking CTA */}
      <section className="py-16 px-6 md:px-16 bg-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Need Help with Your Smartwatch?</h2>
        <p className="text-lg mb-8">Reach out to us today or schedule a service appointment online.</p>
        <Link
          to="/contact-us"
          className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
        >
          Contact
        </Link>
      </section>
    </div>
  );
};

export default Services;

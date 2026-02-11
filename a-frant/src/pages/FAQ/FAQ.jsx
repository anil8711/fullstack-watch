import React, { useEffect } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FAQ() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section id="FAQ-section" className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h3 className="text-3xl font-bold flex items-center justify-center gap-2">
            <RiQuestionAnswerLine className="text-primary text-4xl" />
            Frequently Asked Questions
          </h3>
          <p className="text-gray-600 mt-2">
            Smartwatches provide users with convenient access to essential information.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up">
          {faqData.map((item, idx) => (
            <div key={idx} className="border rounded-md shadow-sm">
              <details className="group open:shadow-md transition-all duration-300">
                <summary className="cursor-pointer px-6 py-4 bg-gray-100 text-lg font-medium group-open:bg-yellow-100">
                  {item.question}
                </summary>
                <div className="px-6 py-4 text-gray-700 bg-white">
                  {item.answer}
                </div>
              </details>
            </div>
          ))}
        </div>

        <hr className="mt-12 border-t-2 border-gray-200" />
      </div>
    </section>
  );
}

const faqData = [
  {
    question: "What are the standout features of the new smartwatch?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum...",
  },
  {
    question: "How does it compare to existing brands in terms of functionality?",
    answer:
      "Our smartwatch competes strongly with other top-tier brands, offering unique features, seamless connectivity...",
  },
  {
    question: "Is the design sleek and comfortable for everyday wear?",
    answer:
      "Yes, the design is both modern and ergonomic—perfect for everyday use, workouts, and formal settings.",
  },
  {
    question: "What unique health-tracking capabilities does it offer?",
    answer:
      "It includes advanced heart rate monitoring, sleep tracking, blood oxygen measurement, and more.",
  },
  {
    question: "Does it integrate well with other devices and ecosystems?",
    answer:
      "Absolutely. It syncs easily with Android, iOS, and popular fitness ecosystems.",
  },
];

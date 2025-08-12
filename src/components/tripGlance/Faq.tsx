import { useState } from "react";
import {
  ChevronDown,
  Calendar,
  Mountain,
  Sun,
  Snowflake,
  Map,
} from "lucide-react";
import { IFaq } from "@/types/IPackages";

export default function Faq({ faq }: { faq: IFaq[] | undefined }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faqs"
      className="border-b border-gray-200 mb-8 pb-10"
    >
      <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-center sm:text-left" style={{ color: '#3A3A3A' }}>
        FAQ and Guides
      </h2>
      <div className="space-y-4">
        {faq?.map((item, index) => {
          return (
            <div
              key={index}
              className="  transition-all duration-300 rounded-sm bg-gray-50 overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full text-left p-6 hover:bg-gray-100 transition-all duration-200 rounded-t-lg focus:outline-none group"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <span className="font-semibold text-lg pr-4 transition-colors duration-200" style={{ color: '#3A3A3A' }}>
                    {item.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ease-in-out shrink-0 ${openIndex === index
                    ? "transform rotate-180"
                    : ""
                    }`}
                  style={{
                    color: '#f05e25'
                  }}
                />
              </button>

              <div
                id={`faq-content-${index}`}
                className={`bg-white border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="p-6">
                  <p className="text-gray-600 text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

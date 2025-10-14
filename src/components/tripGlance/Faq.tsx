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
      className=" pb-14  "
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left ">
        <span className="w-fit  font-semibold">
          FAQ and Guides
        </span>
      </h2>
      <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-8">
        Find answers to commonly asked questions and helpful guides for your trip preparation.
      </p>
      <div className="space-y-4">
        {faq?.map((item, index) => {
          return (
            <div
              key={index}
              className="  transition-all duration-300 border-b border-zinc-200 overflow-hidden"
            >
              <button
                className="flex items-center justify-between cursor-pointer w-full text-left py-4  transition-all duration-200 rounded-t-lg focus:outline-none group"
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

                />
              </button>

              <div
                id={`faq-content-${index}`}
                className={`bg-white  transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pb-2">
                  <p className="text-zinc-600 text-base leading-relaxed" id="editor" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  ChevronDown,
 
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
      className="pt-6 pb-14  "
    >
      <style jsx>{`
        #faqs #editor p,
        #faqs #editor span,
        #faqs #editor div,
        #faqs #editor li,
        #faqs #editor h1,
        #faqs #editor h2,
        #faqs #editor h3,
        #faqs #editor h4,
        #faqs #editor ul,
        #faqs #editor ol {
          font-size: 16px !important;
        }
      `}</style>
      <h2 className="text-2xl font-semibold text-orange-500 text-left ">
        <span className="w-fit  font-semibold">
          FAQ and Guides
        </span>
      </h2>
      <p className="text-base text-zinc-800 mt-1 leading-relaxed max-w-2xl mb-4">
        Find answers to commonly asked questions and helpful guides for your trip preparation.
      </p>
      <div className="space-y-2">
        {faq?.map((item, index) => {
          return (
            <div
              key={index}
              className="transition-all duration-300 border-b border-zinc-200 overflow-hidden"
            >
              <button
                className="flex items-center justify-between cursor-pointer w-full text-left py-3 transition-all duration-200 rounded-t-lg focus:outline-none group"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <span className="font-semibold text-base pr-4 transition-colors duration-200" style={{ color: '#3A3A3A' }}>
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
                className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pb-3">
                  <p className="text-base text-zinc-800 leading-relaxed" id="editor" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

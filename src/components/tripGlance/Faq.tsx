"use client";

import { useState } from "react";
import {
  ChevronDown,
 
} from "lucide-react";
import { IFaq } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

export default function Faq({ faq }: { faq: IFaq[] | undefined }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faqs"
      className="pt-6 pb-14"
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
        <span className="flex items-center gap-2 mb-4">
          <span>FAQ and Guides</span>
        </span>
      </h2>
      <ReadMore maxHeight="max-h-80" characterLimit={800}>
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
                    <span className="text-[17px] text-zinc-900 font-semibold leading-snug font-montserrat pr-4 transition-colors duration-200">
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
                    <p className="text-[17px] leading-snug text-zinc-900 font-montserrat" id="editor" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ReadMore>
    </div>
  );
}

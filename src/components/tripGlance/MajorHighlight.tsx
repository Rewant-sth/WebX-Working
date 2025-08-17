import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-highlights"
      className="border-b mt-6 border-gray-200 mb-8 pb-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
        <span className="w-fit text-2xl font-semibold">
          Major Highlights
        </span>
      </h2>

      <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl mb-8">
        Discover the key attractions and memorable experiences that make this journey extraordinary.
      </p>
      <div className="grid gap-6">
        {data?.attraction.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-6 rounded-sm  transition-all duration-200"
            style={{
              backgroundColor: '#fafafa',
              borderColor: '#f0f0f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f05e25';
              e.currentTarget.style.backgroundColor = '#fcfcfc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#f0f0f0';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
          >
            <div className="shrink-0 mt-1  h-fit rounded-md">
              <Icon icon="lineicons:bulb-4" className="size-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MajorHighlight;

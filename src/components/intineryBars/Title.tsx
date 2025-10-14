import { ITravelPackage } from "@/types/IPackages";

const Title = ({ data }: { data: ITravelPackage | null }) => {

  return (
    <div className="px-4 sm:px-8 md:px-12 mt-16 md:mt lg:px-16 text-white   z-[99]   relative">
      <div className=" pt-4 border-zinc-300">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
          {/* Title + Duration */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center w-full  gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center ">
              {data?.name}
            </h1>
          </div>

        </div>


      </div>
    </div>
  );
};

export default Title;

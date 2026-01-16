import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  onClick: () => void;
  src: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, src } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className={`embla-thumbs__slide__number  relative rounded-sm overflow-hidden h-40 w-40  outline-3  ${
          selected ? "outline-blue-500" : "outline-transparent"
        }`}
      >
        <Image
          height={1000}
          width={1000}
          src={src}
          alt="Gallery Image"
          className="object-cover h-full w-full"
        />
      </button>
    </div>
  );
};

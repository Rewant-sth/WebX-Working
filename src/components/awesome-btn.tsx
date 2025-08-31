import React from "react";

const RotatingButton = ({ text = " CUSTOMIZE TRIP" }) => {
    const letters = text.split("");

    return (
        <div className="fixed bottom-10 right-10">
            <button
                className="relative grid place-content-center w-[100px] h-[100px] rounded-full bg-[#7808d0] text-white font-semibold overflow-hidden transition-all duration-300 ease-in-out hover:bg-black hover:scale-105 group"
            >
                {/* Rotating Text */}
                <p className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                    {letters.map((char, index) => (
                        <span
                            key={index}
                            style={{
                                transform: `rotate(${(360 / letters.length) * index}deg)`,
                                position: "absolute",
                                inset: "7px",
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </p>

                {/* Circle Icon Area */}
                <div className="relative w-9 h-9 bg-white text-[#7808d0] rounded-full flex items-center justify-center overflow-hidden">
                    {/* First Icon */}
                    <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute text-[#7808d0] transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                        width="14"
                    >
                        <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                        />
                    </svg>

                    {/* Second Icon */}
                    <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute text-[#7808d0] translate-x-[-150%] translate-y-[150%] transition-transform duration-300 ease-in-out delay-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    >
                        <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default RotatingButton;

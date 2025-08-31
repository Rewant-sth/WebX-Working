export const NavButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
    isSpecial?: boolean;
}> = ({ children, onClick, onMouseEnter, onMouseLeave, className = "", isSpecial = false }) => (
    <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative group flex items-center gap-1 ${className}`}
    >
        <span
            className={`relative inline-block no-underline transition-all duration-400 hover:-rotate-6 hover:text-[#025FE0] cursor-pointer ${isSpecial ? "px-4 py-1 text-blue-600 rounded-sm hover:border-2 hover:scale-80 bg-white hover:border-blue-500 font-semibold" : ""
                }`}
        >
            {children}
        </span>
    </button>
);
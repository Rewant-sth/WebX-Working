// Dropdown Menu Component
export const DropdownMenu: React.FC<{
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ isVisible, onMouseEnter, onMouseLeave, children, className = "" }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`absolute left-0 w-48 rounded-md shadow-lg bg-white z-50 ${isVisible ? "block" : "hidden"
      } ${className}`}
  >
    {children}
  </div>
);
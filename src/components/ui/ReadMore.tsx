"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ReadMoreProps {
  children: ReactNode;
  maxHeight?: string; // e.g., "max-h-96", "max-h-48"
  characterLimit?: number; // Check content length to show button
  className?: string;
}

const ReadMore = ({ 
  children, 
  maxHeight = "max-h-96", 
  characterLimit = 500,
  className = ""
}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Check if content exceeds the character limit
      const textContent = contentRef.current.textContent || '';
      setShowButton(textContent.length > characterLimit);
      
      // Get the full height of the content
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, characterLimit]);

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : maxHeight.replace('max-h-', '') === '96' ? '24rem' : '12rem',
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div ref={contentRef}>
          {children}
        </div>
        
        {/* Gradient overlay when collapsed */}
        {!isExpanded && showButton && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, white)',
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        )}
      </div>
      
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 mt-4 underline"
        >
          {isExpanded ? 'read less' : 'read more'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;

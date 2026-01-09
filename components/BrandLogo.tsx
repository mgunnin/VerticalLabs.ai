
import React from 'react';

interface BrandLogoProps {
  className?: string;
  withText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-8 w-auto", withText = true }) => {
  return (
    <div className={`${className} relative flex items-center`}>
      <img 
        src="/assets/verticallabs_logo.svg" 
        alt="Vertical Labs" 
        className="w-full h-full object-contain filter brightness-0 invert transition-all duration-300 group-hover:filter-none"
      />
    </div>
  );
};

export default BrandLogo;

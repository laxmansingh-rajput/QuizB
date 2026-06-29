import React from 'react';

const Logo = ({ className, onClick }) => {
    return (
        <svg 
            className={className} 
            onClick={onClick}
            viewBox="30 10 210 90" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none"
        >
            <g>
                {/* Light bulb with checkmark */}
                <path 
                    className="fill-primary transition-colors duration-280" 
                    d="M60 20a30 30 0 0 1 30 30c0 10-5 18-12 23v7a6 6 0 0 1-6 6h-24a6 6 0 0 1-6-6v-7a30 30 0 0 1-12-23c0-16.6 13.4-30 30-30z" 
                />
                <path 
                    d="M48 48l8 8 16-16" 
                    stroke="#fff" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                {/* Bulb base */}
                <rect 
                    className="fill-primary transition-colors duration-280" 
                    x="48" 
                    y="83" 
                    width="24" 
                    height="4" 
                    rx="2" 
                />
                <rect 
                    className="fill-primary transition-colors duration-280" 
                    x="50" 
                    y="90" 
                    width="20" 
                    height="4" 
                    rx="2" 
                />
            </g>
            {/* Text */}
            <text 
                className="fill-primary transition-colors duration-280" 
                x="100" 
                y="75" 
                fontFamily="sans-serif" 
                fontSize="48" 
                fontWeight="bold"
            >
                quizB
            </text>
        </svg>
    );
};

export default Logo;

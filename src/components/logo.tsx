import * as React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10', className)}
      {...props}
    >
      <g fill="hsl(var(--primary))">
        {/* Hat */}
        <path d="M11 14 C15 12, 25 12, 29 14 L 27 18 L 13 18 Z" />
        <rect x="10" y="14" width="20" height="2" rx="1" />
        {/* Head */}
        <circle cx="20" cy="22" r="5" />
        {/* Body */}
        <rect x="15" y="27" width="10" height="10" rx="2" />
        {/* Arm */}
        <rect x="25" y="27" width="5" height="2" rx="1" />
      </g>
      {/* Basket */}
      <g fill="hsl(var(--secondary))">
        <path d="M28 29 L 30 37 L 38 37 L 36 29 Z" />
      </g>
      {/* Star */}
      <polygon
        points="33,31 34,33 36,33 34.5,34 35,36 33,35 31,36 31.5,34 30,33 32,33"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
};

export default Logo;

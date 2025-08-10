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
      {/* Trolley handle and base */}
      <g fill="hsl(var(--primary))">
        <rect x="5" y="5" width="2" height="25" rx="1" />
        <rect x="5" y="28" width="30" height="2" rx="1" />
      </g>
      {/* Trolley basket */}
      <g fill="hsl(var(--secondary))">
        <path d="M7 5 L12 5 L 15 25 L 34 25 L 36 10 L 14 10 Z" />
      </g>
      {/* Wheels */}
      <g fill="hsl(var(--primary))">
        <circle cx="15" cy="34" r="3" />
        <circle cx="32" cy="34" r="3" />
      </g>
      {/* Star */}
      <polygon
        points="22,13 23.5,16 26.5,16 24.5,18 25.5,21 22,19.5 18.5,21 19.5,18 17.5,16 20.5,16"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
};

export default Logo;

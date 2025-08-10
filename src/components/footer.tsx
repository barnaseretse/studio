import * as React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-muted py-6">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} M-Market + Shopper. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

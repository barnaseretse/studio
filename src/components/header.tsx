'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from './logo';
import { useCart } from '@/hooks/use-cart';

const navLinks = [
  { href: '/', label: 'Marketplace' },
  { href: '/personal-shopper', label: 'Personal Shopper' },
  { href: '/suppliers/register', label: 'For Suppliers' },
  { href: '/track-order', label: 'Track Order' },
];

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Logo className="h-8 w-8" />
                <span className="font-bold font-headline">
                  M-Market + Shopper
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block font-headline">
              M-Market + Shopper
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Logo (Centered) & Right-side Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Centered logo on mobile */}
           <div className="flex-1 text-center md:hidden">
                <Link href="/" className="inline-flex items-center space-x-2">
                    <Logo className="h-8 w-8"/>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Button asChild>
                <Link href="/checkout">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Cart ({cart.length})</span>
                </Link>
                </Button>
                <Button variant="outline" asChild>
                <Link href="/auth">Sign In / Sign Up</Link>
                </Button>
            </div>
        </div>


      </div>
    </header>
  );
}

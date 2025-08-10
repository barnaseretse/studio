'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    toast({
      title: `${product.name} added to cart!`,
    });
  };
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            data-ai-hint={product.aiHint}
          />
        </div>
        <div className="p-4">
          <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
          <CardDescription className="text-sm pt-1">
            from {product.supplier}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-muted-foreground">/ {product.unit}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

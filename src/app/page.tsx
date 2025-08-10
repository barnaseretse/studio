import Link from 'next/link';
import {
  ArrowRight,
  Package,
  ShoppingBasket,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import ProductCard from '@/components/product-card';
import type { Product } from '@/types';
import Logo from '@/components/logo';

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    category: 'Fresh Produce',
    price: 72.00,
    unit: 'kg',
    supplier: 'Green Valley Farms',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'red apple',
  },
  {
    id: '2',
    name: 'Sourdough Bread',
    category: 'Bakery',
    price: 99.00,
    unit: 'loaf',
    supplier: "Artisan's Crust",
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'sourdough bread',
  },
  {
    id: '3',
    name: 'Free-Range Eggs',
    category: 'Dairy & Eggs',
    price: 126.00,
    unit: 'dozen',
    supplier: 'Happy Hen Homestead',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'egg carton',
  },
  {
    id: '4',
    name: 'Grass-Fed Ground Beef',
    category: 'Meats',
    price: 180.00,
    unit: 'kg',
    supplier: 'Pasture Perfect Meats',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'ground beef',
  },
  {
    id: '5',
    name: 'Cherry Tomatoes',
    category: 'Fresh Produce',
    price: 81.00,
    unit: 'pint',
    supplier: 'Green Valley Farms',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'cherry tomatoes',
  },
  {
    id: '6',
    name: 'Whole Wheat Baguette',
    category: 'Bakery',
    price: 76.50,
    unit: 'loaf',
    supplier: "Artisan's Crust",
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'baguette bread',
  },
  {
    id: '7',
    name: 'Organic Whole Milk',
    category: 'Dairy & Eggs',
    price: 86.00,
    unit: 'gallon',
    supplier: 'Happy Hen Homestead',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'milk gallon',
  },
  {
    id: '8',
    name: 'Chicken Thighs',
    category: 'Meats',
    price: 135.00,
    unit: 'kg',
    supplier: 'Pasture Perfect Meats',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'raw chicken',
  },
];

const categories = [
  'Fresh Produce',
  'Bakery',
  'Dairy & Eggs',
  'Meats',
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-100/40 dark:bg-gray-800/40">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <Logo className="w-24 h-24 mx-auto" />
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl mt-4">
                M-Market + Shopper
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Your personal shopper and local market, delivered right to your
                door.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="#marketplace">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/personal-shopper">Request a Shopper</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="w-10 h-10 text-primary" />
                  <CardTitle className="font-headline">
                    Personal Shopper
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Busy schedule? Let our expert shoppers hand-pick the best
                    items for you from your favorite stores.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShoppingBasket className="w-10 h-10 text-primary" />
                  <CardTitle className="font-headline">Local Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover and support local artisans, farmers, and businesses.
                    Fresh, quality products are just a click away.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Package className="w-10 h-10 text-primary" />
                  <CardTitle className="font-headline">Door-to-Door</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enjoy the convenience of door-to-door delivery. We handle the
                    logistics so you can enjoy your purchase.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="marketplace" className="w-full py-12 md:py-24 bg-gray-100/40 dark:bg-gray-800/40">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              Explore Local Products
            </h2>
            <Tabs defaultValue="Fresh Produce" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products
                      .filter((p) => p.category === category)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}

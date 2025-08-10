'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  deliveryAddress: z.string().min(10, {
    message: 'Please enter a valid delivery address.',
  }),
  shoppingList: z.string().min(10, {
    message: 'Shopping list must contain at least one item.',
  }),
  preferredStores: z.string().min(2, {
    message: 'Please enter at least one preferred store.',
  }),
  budget: z.coerce
    .number()
    .min(100, { message: 'Budget must be at least R100.' }),
});

export default function PersonalShopperForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      deliveryAddress: '',
      shoppingList: '',
      preferredStores: '',
      budget: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Request Submitted!',
      description: "We've received your personal shopper request.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Request a Personal Shopper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredStores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Stores</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Woolworths, Checkers" {...field} />
                  </FormControl>
                  <FormDescription>
                    List the stores you'd like us to shop at.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shoppingList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shopping List</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please be as specific as possible. e.g., 1 gallon of 2% milk (brand), 2 lbs of boneless chicken breast."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shopping Budget (ZAR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1500" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the estimated cost for your items.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Submit Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

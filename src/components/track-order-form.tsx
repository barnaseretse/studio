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
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { useState } from 'react';

const formSchema = z.object({
  orderId: z.string().min(6, {
    message: 'Order ID must be at least 6 characters.',
  }),
});

type OrderStatus = {
  status: string;
  details: string;
  timestamp: string;
}

const fakeOrderStatus: OrderStatus = {
    status: "In Transit",
    details: "Your order has left the warehouse and is on its way to you.",
    timestamp: new Date().toLocaleString()
}


export default function TrackOrderForm() {
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    setOrderStatus(null);
    setTimeout(() => {
        setOrderStatus(fakeOrderStatus)
        setIsLoading(false);
        toast({
            title: 'Order Status Found!',
            description: `Details for order #${values.orderId}.`,
        });
    }, 2000)

  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Track Your Order</CardTitle>
        <CardDescription>
          Enter your order ID below to see the latest status of your delivery.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Track Order'}
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="text-center mt-8">
                <p>Searching for your order...</p>
            </div>
        )}
        {orderStatus && (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div>
                        <p className="font-bold">Status:</p>
                        <p>{orderStatus.status}</p>
                    </div>
                    <div>
                        <p className="font-bold">Details:</p>
                        <p>{orderStatus.details}</p>
                    </div>
                    <div>
                        <p className="font-bold">Last Updated:</p>
                        <p>{orderStatus.timestamp}</p>
                    </div>
                </CardContent>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}

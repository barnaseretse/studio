'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { useState } from 'react';

const formSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export default function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') || 'customer';
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Verification Successful!',
        description: 'Your account has been verified.',
      });
      if (userType === 'supplier') {
        router.push('/suppliers/dashboard');
      } else {
        router.push('/');
      }
    }, 2000);
  }

  function onResend() {
    toast({
        title: 'OTP Resent!',
        description: 'A new code has been sent to your phone and email.',
      });
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Verify Your Account</CardTitle>
        <CardDescription>
          We’ve sent a 6-digit code to your phone and email. Enter it below to
          verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
            <Button variant="link" onClick={onResend}>
                Didn't receive a code? Resend
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useEffect, useState, useRef } from 'react';
import { auth } from '@/lib/firebase';

const formSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export default function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') || 'customer';
  const phone = searchParams.get('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (phone && !recaptchaVerifierRef.current) {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
      recaptchaVerifierRef.current = recaptchaVerifier;

      signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifier)
        .then((result) => {
          setConfirmationResult(result);
          toast({
            title: 'OTP Sent!',
            description: 'A code has been sent to your phone.',
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: 'Failed to send OTP',
            description: 'Please try again.',
            variant: 'destructive',
          });
        });
    }
  }, [phone]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!confirmationResult) {
      toast({
        title: 'Verification failed',
        description: 'No confirmation result found. Please try resending the OTP.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      await confirmationResult.confirm(values.otp);
      toast({
        title: 'Verification Successful!',
        description: 'Your account has been verified.',
      });
      if (userType === 'supplier') {
        router.push('/suppliers/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Verification Failed',
        description: 'The code you entered is incorrect. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function onResend() {
     if (phone && recaptchaVerifierRef.current) {
        signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifierRef.current)
        .then((result) => {
          setConfirmationResult(result);
          toast({
            title: 'OTP Resent!',
            description: 'A new code has been sent to your phone.',
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: 'Failed to resend OTP',
            description: 'Please try again.',
            variant: 'destructive',
          });
        });
     }
  }


  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Verify Your Phone Number
        </CardTitle>
        <CardDescription>
          We’ve sent a 6-digit code to your phone. Enter it below to verify your
          account.
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
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || !confirmationResult}
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
          </form>
        </Form>
        <div id="recaptcha-container" className="mt-4"></div>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={onResend} disabled={!phone}>
            Didn't receive a code? Resend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';

const formSchema = z
  .object({
    businessName: z.string().min(2, {
      message: 'Business name must be at least 2 characters.',
    }),
    ownerName: z.string().min(2, {
      message: 'Owner name must be at least 2 characters.',
    }),
    mobileNumber: z.string().min(10, {
      message: 'Please enter a valid mobile number.',
    }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
    businessAddress: z.string().min(10, {
      message: 'Please enter a valid business address.',
    }),
    businessCategory: z.string({
      required_error: 'Please select a business category.',
    }),
    bankingDetails: z.string().min(10, {
      message: 'Please enter valid banking details.',
    }),
    registrationNumber: z.string().min(2, {
      message: 'Please enter a valid ID or Business Registration Number.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SupplierRegistrationForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      ownerName: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessAddress: '',
      bankingDetails: '',
      registrationNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Registration Submitted!',
      description:
        "Please verify your account to continue.",
    });
    router.push('/auth/verify-otp?type=supplier');
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Become a Supplier
        </CardTitle>
        <CardDescription>
          Join our marketplace and reach more customers in your community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business/Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Green Valley Farms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner's Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0821234567" {...field} />
                  </FormControl>
                  <FormDescription>Link to your WhatsApp Business.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contact@yourbusiness.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street, Suburb, Town"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Used for order pickups.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category of Products</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                      <SelectItem value="handmade">Handmade Goods</SelectItem>
                       <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="bankingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banking Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank, Account Number, Branch Code" {...field} />
                  </FormControl>
                  <FormDescription>For payments from orders.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID or Business Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="For verification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

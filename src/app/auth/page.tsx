import CustomerSignUpForm from '@/components/customer-sign-up-form';
import SignInForm from '@/components/sign-in-form';
import SupplierRegistrationForm from '@/components/supplier-registration-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex justify-center">
      <Tabs defaultValue="sign-in" className="w-full max-w-xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="customer-signup">Customer Sign-Up</TabsTrigger>
          <TabsTrigger value="supplier-signup">Supplier Sign-Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your M-MARKET PLUS SHOPPER account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customer-signup">
          <CustomerSignUpForm />
        </TabsContent>
        <TabsContent value="supplier-signup">
          <SupplierRegistrationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

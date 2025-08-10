import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SupplierDashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle>Supplier Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to your dashboard. You can manage your products and view orders here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

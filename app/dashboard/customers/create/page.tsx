import { fetchCompanys } from '@/app/lib/data';
import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
};

export default async function Page() {
  const companys = await fetchCompanys();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customers',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form companys={companys} />
    </main>
  );
}

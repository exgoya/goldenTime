import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/locations/create-form';
import Breadcrumbs from '@/app/ui/locations/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Locaiton',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/dashboard/locations' },
          {
            label: 'Create Location',
            href: '/dashboard/Location/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

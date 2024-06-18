import Form from '@/app/ui/companys/create-form';
import Breadcrumbs from '@/app/ui/locations/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Company',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companys', href: '/dashboard/companys' },
          {
            label: 'Create Companys',
            href: '/dashboard/Company/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

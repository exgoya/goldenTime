import { fetchEngineers,fetchCustomers} from '@/app/lib/data';
import Form from '@/app/ui/issues/create-form';
import Breadcrumbs from '@/app/ui/issues/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Issue',
};

export default async function Page() {
  const engineers = await fetchEngineers();
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issues', href: '/dashboard/issues' },
          {
            label: 'Create Issues',
            href: '/dashboard/issues/create',
            active: true,
          },
        ]}
      />
      <Form engineers={engineers} customers={customers} />
    </main>
  );
}

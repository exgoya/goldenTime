import { fetchEngineers,fetchCustomers, fetchIssues, fetchLocations, fetchTypes} from '@/app/lib/data';
import Form from '@/app/ui/services/create-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Services',
};

export default async function Page() {

  const [issues, engineers, customers,locations,types] = await Promise.all([
    fetchIssues(),
    fetchEngineers(),
    fetchCustomers(),
    fetchLocations(),
    fetchTypes(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'services', href: '/dashboard/services' },
          {
            label: 'Create services',
            href: '/dashboard/services/create',
            active: true,
          },
        ]}
      />
      <Form issues={issues} engineers={engineers} customers={customers} locations={locations} types={types}/>
    </main>
  );
}

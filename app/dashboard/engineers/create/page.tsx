import { fetchCompanys } from '@/app/lib/data';
import Form from '@/app/ui/engineers/create-form';
import Breadcrumbs from '@/app/ui/engineers/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Engineers',
};

export default async function Page() {
  const companys = await fetchCompanys();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Engineers', href: '/dashboard/engineers' },
          {
            label: 'Create Engineer',
            href: '/dashboard/engineers/create',
            active: true,
          },
        ]}
      />
      <Form companys={companys} />
    </main>
  );
}

import Form from '@/app/ui/engineers/edit-form';
import Breadcrumbs from '@/app/ui/engineers/breadcrumbs';
import { fetchEngineerById, fetchCompanys } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Engineer',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [engineer, companys] = await Promise.all([
    fetchEngineerById(id),
    fetchCompanys()
  ]);

  if (!engineer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'engineers', href: '/dashboard/engineers' },
          {
            label: 'Edit Engineer',
            href: `/dashboard/engineers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form engineer={engineer} companys={companys} />
    </main>
  );
}

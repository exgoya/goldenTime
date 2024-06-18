import Form from '@/app/ui/companys/edit-form';
import Breadcrumbs from '@/app/ui/companys/breadcrumbs';
import { fetchCompanysById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Company',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [company] = await Promise.all([
    fetchCompanysById(id),
  ]);

  if (!company) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companys', href: '/dashboard/companys' },
          {
            label: 'Edit Companys',
            href: `/dashboard/companys/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form company={company}/>
    </main>
  );
}

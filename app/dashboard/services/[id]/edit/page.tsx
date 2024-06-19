import Form from '@/app/ui/issues/edit-form';
import Breadcrumbs from '@/app/ui/issues/breadcrumbs';
import { fetchIssueById, fetchCompanys, fetchEngineers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Issues',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [issue, engineers, customers] = await Promise.all([
    fetchIssueById(id),
    fetchEngineers(),
    fetchCompanys(),
  ]);

  if (!issue) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'issues', href: '/dashboard/issues' },
          {
            label: 'Edit Issues',
            href: `/dashboard/issues/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form issue={issue} engineers={engineers} customers={customers} />
    </main>
  );
}

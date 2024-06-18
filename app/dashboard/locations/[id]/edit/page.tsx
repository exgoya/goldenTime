import Form from '@/app/ui/locations/edit-form';
import Breadcrumbs from '@/app/ui/locations/breadcrumbs';
import { fetchLocationsById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Location',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [location] = await Promise.all([
    fetchLocationsById(id),
  ]);

  if (!location) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/dashboard/locations' },
          {
            label: 'Edit Location',
            href: `/dashboard/locations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form location={location}/>
    </main>
  );
}

import Image from 'next/image';
import { UpdateLocation, DeleteLocation } from '@/app/ui/locations/buttons';
import LocationStatus from '@/app/ui/locations/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredLocations } from '@/app/lib/data';

export default async function LocationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const locations = await fetchFilteredLocations(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {locations?.map((location) => (
              <div
                key={location.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{location.name}</p>
                    </div>
                    <p className="text-sm text-gray-501">{location.address}</p>
                    <p className="text-sm text-gray-500">{location.detail_address}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <p className="text-xl font-medium"> */}
                    <p className="text-sm text-gray-500">{location.description}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLocation id={location.id} />
                    <DeleteLocation id={location.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Detail Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {locations?.map((location) => (
                <tr
                  key={location.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3 sm:pl-6">
                    {location.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {location.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {location.detail_address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {location.description}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLocation id={location.id} />
                      <DeleteLocation id={location.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

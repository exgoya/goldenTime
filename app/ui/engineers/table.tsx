import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { fetchFilteredEngineers  } from '@/app/lib/data';

export default async function EngineersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const engineers = await fetchFilteredEngineers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {engineers?.map((engineer) => (
              <div
                key={engineer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.nick_name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.duty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{engineer.company_name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={engineer.id} />
                    <DeleteInvoice id={engineer.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nick Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Duty
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {engineers?.map((engineer) => (
                <tr
                  key={engineer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3 sm:pl-6">
                    {engineer.nick_name}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {engineer.name}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {engineer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {engineer.duty}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {engineer.phone}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {engineer.company_name}
                  </td>
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={engineer.id} />
                      <DeleteInvoice id={engineer.id} />
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

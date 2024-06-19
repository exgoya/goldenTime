import { fetchFilteredServices  } from '@/app/lib/data';
import { formatDateToLocal} from '@/app/lib/utils';
import { UpdateService, DeleteService } from '@/app/ui/services/buttons';
import ServiceStatus from '@/app/ui/services/status';
// import { Deleteservice, Updateservice } from './buttons';

export default async function servicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const services = await fetchFilteredServices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {services?.map((service) => (
              <div
                key={service.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.issue_title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.issue_status}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(service.begin_time)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(service.end_time)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">cal</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.type_name}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.comment}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.engineer_nick_name} {service.engineer_duty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.customer_name} {service.customer_duty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{service.location_name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(service.modified)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateService id={service.id} />
                    <DeleteService id={service.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                 Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                 Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Comment
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Writer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customers
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Hours
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Modified
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Locations
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {services?.map((service) => (
                <tr
                  key={service.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                   <td className="whitespace-nowrap px-3 py-3">
                    {service.issue_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ServiceStatus status={service.issue_status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {service.comment} 
                  </td>                 
                  <td className="whitespace-nowrap px-3 py-3">
                    {service.engineer_nick_name} {service.engineer_duty}
                  </td>                 
                   <td className="whitespace-nowrap px-3 py-3">
                    {service.customer_name} {service.customer_duty}
                  </td>

                   <td className="whitespace-nowrap px-3 py-3"> cal</td> 
                   <td className="whitespace-nowrap px-3 py-3"> {formatDateToLocal(service.modified)}</td> 
                   <td className="whitespace-nowrap px-3 py-3">
                    {service.type_name}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {service.location_name}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateService id={service.id} />
                      <DeleteService id={service.id} />
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

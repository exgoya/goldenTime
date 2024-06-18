import { fetchFilteredIssues  } from '@/app/lib/data';
import { formatDateToLocal} from '@/app/lib/utils';
import { UpdateIssue, DeleteIssue } from '@/app/ui/issues/buttons';
import IssueStatus from '@/app/ui/issues/status';
// import { Deleteissue, Updateissue } from './buttons';

export default async function issuesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const issues = await fetchFilteredIssues(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {issues?.map((issue) => (
              <div
                key={issue.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{issue.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{issue.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{issue.status}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(issue.opened)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(issue.modified)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{issue.engineer_nick_name} {issue.engineer_duty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{issue.customer_name} {issue.customer_duty}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateIssue id={issue.id} />
                    <DeleteIssue id={issue.id} />
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
                 Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Opened
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Modified
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Owner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Duty
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Duty
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {issues?.map((issue) => (
                <tr
                  key={issue.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                   <td className="whitespace-nowrap px-3 py-3">
                    {issue.title}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {issue.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <IssueStatus status={issue.status} />
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(issue.opened)}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(issue.modified)}
                  </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    {issue.engineer_nick_name} 
                  </td>                 
                    <td className="whitespace-nowrap px-3 py-3">
                  {issue.engineer_duty}
                  </td>                 
                   <td className="whitespace-nowrap px-3 py-3">
                    {issue.customer_name}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {issue.customer_duty}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateIssue id={issue.id} />
                      <DeleteIssue id={issue.id} />
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

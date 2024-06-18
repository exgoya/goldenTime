'use client';

import { Company } from '@/app/lib/definitions';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCompany } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditForm({
  company
}: {
  company: Company;
}) {
  const initialState = { message: null, errors: {} };
  const updateCompanyWithId = updateCompany.bind(null, company.id);
  const [state, dispatch] = useFormState(updateCompanyWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* company name */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Sunjesoft"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={company.name}
                aria-describedby="name-error"
              />
              <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* company description */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                placeholder="description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
                defaultValue={company.description}
              />
            </div>
          </div>

          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/companys"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Company</Button>
      </div>

    </form>
  );
}

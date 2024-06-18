'use client';

import { Company, Customer, CustomerField, EngineerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createIssue } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({engineers, customers }: { engineers: EngineerField[], customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createIssue, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Engineer Name */}
        <div className="mb-4">
          <label htmlFor="Engineer" className="mb-2 block text-sm font-medium">
            Choose Owner
          </label>
          <div className="relative">
            <select
              id="engineerId"
              name="engineerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="engineer-error"
            >
              <option value="" disabled>
                Select a Engineers
              </option>
              {engineers.map((engineer) => (
                <option key={engineer.id} value={engineer.id}>
                  {engineer.nick_name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="engineer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.engineerId &&
              state.errors.engineerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="Customer" className="mb-2 block text-sm font-medium">
            Choose Customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a Customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.engineerId &&
              state.errors.engineerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder="Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
            </div>
          </div>

          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                placeholder="description..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
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


        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Issue status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
             <div className="flex items-center">
                <input
                  id="feedback"
                  name="status"
                  type="radio"
                  value="feedback"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={false}
                />
                <label
                  htmlFor="feedback"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Feedback <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="close"
                  name="status"
                  type="radio"
                  value="close"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                  defaultChecked={false}
                />
                <label
                  htmlFor="close"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Close <ClockIcon className="h-4 w-4" />
                </label>
              </div>
             <div className="flex items-center">
                <input
                  id="open"
                  name="status"
                  type="radio"
                  value="open"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={true}
                />
                <label
                  htmlFor="open"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Open <CheckIcon className="h-4 w-4" />
                </label>
              </div>
 
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
        
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/issues"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Issue</Button>
      </div>
    </form>
  );
}

'use client';

import { IssueField,CustomerField, EngineerField,LocationField,Type } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createService } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({issues,engineers, customers,locations,types }: 
  { issues: IssueField[], engineers: EngineerField[], customers: CustomerField[],locations:LocationField[],types:Type[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createService, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Engineer Name */}
        <div className="mb-4">
          <label htmlFor="Issue" className="mb-2 block text-sm font-medium">
            Choose Issue
          </label>
          <div className="relative">
            <select
              id="issueId"
              name="issueId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="issue-error"
            >
              <option value="" disabled>
                Select a Issue
              </option>
              {issues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.title}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="issue-error" aria-live="polite" aria-atomic="true">
            {state.errors?.IssueId &&
              state.errors.IssueId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="Engineer" className="mb-2 block text-sm font-medium">
            Choose Engineer
          </label>
          <div className="relative">
            <select
              id="engineerId"
              name="engineerId"
              className="relative peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="engineer-error"
            >
              <option value="" disabled>
                Select a Engineer
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
          <label htmlFor="Customers" className="mb-2 block text-sm font-medium">
            Choose Customers
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

          <div id="engineer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Location Name */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Choose Location
          </label>
          <div className="relative">
            <select
              id="locationId"
              name="locationId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="location-error"
            >
              <option value="" disabled>
                Select a Location
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.locationId &&
              state.errors.locationId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Type Name */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Choose Type
          </label>
          <div className="relative">
            <select
              id="typeId"
              name="typeId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="type-error"
            >
              <option value="" disabled>
                Select a Type
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.typeId &&
              state.errors.typeId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* title */}
        <div className="mb-4">
          <label htmlFor="beginTime" className="mb-2 block text-sm font-medium">
            Begin Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="beginTime"
                name="beginTime"
                type="datetime-local"
                placeholder=""
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="beginTime-error"
              />
            </div>
          </div>

          <div id="beginTime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.beginTime &&
              state.errors.beginTime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* title */}
        <div className="mb-4">
          <label htmlFor="beginTime" className="mb-2 block text-sm font-medium">
            End Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="endTime"
                name="endTime"
                type="datetime-local"
                placeholder="Begin Time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="beginTime-error"
              />
            </div>
          </div>

          <div id="beginTime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.beginTime &&
              state.errors.beginTime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Online Offline
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
             <div className="flex items-center">
                <input
                  id="isOnline"
                  name="isOnline"
                  type="radio"
                  value="true"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="isOnline"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Feedback <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="isOnline"
                  name="isOnline"
                  type="radio"
                  value="false"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="close"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Close <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.isOnline &&
              state.errors.isOnline.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>


        {/* Location address */}
          <div className="mb-4">
          <label htmlFor="comment" className="mb-2 block text-sm font-medium">
            Comment
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="comment"
                name="comment"
                placeholder="Comment"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="comment-error"
              />
            </div>
          </div>

          <div id="comment-error" aria-live="polite" aria-atomic="true">
            {state.errors?.comment &&
              state.errors.comment.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        confirm??????????

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
        <Button type="submit">Create Service</Button>
      </div>
    </form>
  );
}

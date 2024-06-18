'use client';

import { Location } from '@/app/lib/definitions';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateLocation } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditLocationForm({
  location
}: {
  location: Location;
}) {
  const initialState = { message: null, errors: {} };
  const updateLocationWithId = updateLocation.bind(null, location.id);
  const [state, dispatch] = useFormState(updateLocationWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* location name */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
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
                defaultValue={location.name}
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
        {/* Location address */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="string"
                placeholder="Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={location.address}
                aria-describedby="address-error"
              />
            </div>
          </div>

          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address &&
              state.errors.address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Location detail address */}
        <div className="mb-4">
          <label htmlFor="detail_location" className="mb-2 block text-sm font-medium">
            Detail Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="detail_address"
                name="detail_address"
                type="string"
                placeholder="detail address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="detail-address-error"
                defaultValue={location.detail_address}
              />
            </div>
          </div>

          <div id="detail-address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.detail_address &&
              state.errors.detail_address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Location description */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
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
                defaultValue={location.description}
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
          href="/dashboard/locations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Location</Button>
      </div>

    </form>
  );
}

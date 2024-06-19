import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ServiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'close',
          'bg-red-100 text-red-500': status === 'feedback',
          'bg-green-500 text-white': status === 'open',
        },
      )}
    >
      {status === 'close' ? (
        <>
          Close
          <CheckIcon className="ml-2 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'feedback' ? (
        <>
          Feedback
          <CheckIcon className="ml-2 w-4 text-red-500" />
        </>
      ) : null}
      {status === 'open' ? (
        <>
        Open
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}

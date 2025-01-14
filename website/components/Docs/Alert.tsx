/* This example requires Tailwind CSS v2.0+ */
import { HTMLProps } from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';

export interface AlertProps extends HTMLProps<HTMLElement> {}

export default function Alert({ children, title }: AlertProps) {
  return (
    <div className="bg-yellow-50 dark:bg-[#282a36] border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 -my-4">{children}</p>
        </div>
      </div>
    </div>
  );
}

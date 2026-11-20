import type { InputHTMLAttributes } from 'react';

export function Input({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${className}`}
    />
  );
}

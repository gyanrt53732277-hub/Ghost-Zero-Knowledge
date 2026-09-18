import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...values: ClassValue[]): string => {
  const classNames = clsx(values);

  return twMerge(classNames);
};

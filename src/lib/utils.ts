import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, maxLength: number = 20) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const truncateNumber = (text: string, maxLength: number = 20) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "******";
  }
  return text;
};

export const truncateTextDynamically = (
  text: string,
  maxLength: number
): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

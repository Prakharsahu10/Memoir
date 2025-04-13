import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    return { errorMessage: error.message };
  } else {
    return { errorMessage: "Something went wrong" };
  }
};

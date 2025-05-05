import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomId = (count: number) => {
  return "x".repeat(count).replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
}

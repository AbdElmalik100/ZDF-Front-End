import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}


export const formatCurrency = new Intl.NumberFormat("en-US", {
    currency: "EGP",
    style: "currency"
})
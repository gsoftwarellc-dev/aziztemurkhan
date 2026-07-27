/**
 * Flat service fee applied per order, in IDR.
 * Kept here so the checkout, cart, and order summary never disagree — and so
 * the backend can later replace it with a server-calculated value in one spot.
 */
export const SERVICE_FEE = 1000

/** Minutes a QRIS payment code stays valid before it expires. */
export const QRIS_EXPIRY_MINUTES = 15

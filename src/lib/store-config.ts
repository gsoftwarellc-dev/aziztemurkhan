/**
 * Storefront behaviour flags.
 *
 * Kept in one place so commercial policy can change without hunting through
 * components. These become admin-panel settings once the backend lands.
 */

/**
 * Require a signed-in account before checkout.
 *
 * NOTE FOR REVIEW: the client TOR specifies "Checkout: guest checkout (no
 * mandatory registration) + optional account". This flag is set to `true` on
 * explicit instruction, which overrides that line. Flip it to `false` to
 * restore the TOR-compliant guest flow — everything else (accounts, order
 * history, saved game IDs) keeps working either way, because the account
 * features are additive rather than gating.
 */
export const REQUIRE_LOGIN_TO_CHECKOUT = true

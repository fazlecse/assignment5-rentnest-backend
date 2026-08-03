# API Integration

This maps which frontend page/component calls which backend endpoint. Backend runs at `http://localhost:5002` (set via `BACKEND_API_URL` / `NEXT_PUBLIC_BACKEND_API_URL` in `.env`), everything prefixed with `/api`.

A couple of things about how auth works here before the mapping, since it affects almost every call below: the backend returns the access token in the login/register response body, but I don't rely on the cookie it tries to set for that — it's configured with `sameSite: "none", secure: false`, which Chrome/most browsers just silently refuse to store over plain `http://localhost`. So instead the frontend grabs the token from the response body and sets its own cookie in the Server Action. Every authenticated request after that forwards it as either a `Cookie` header or `Authorization: Bearer` — the backend's middleware accepts both, so either works. `proxy.ts` decodes that same JWT to gate `/dashboard`, `/landlord-dashboard`, and `/admin-dashboard` by role.

## Auth

- **Register** (`RegisterForm.tsx` → `registerAction`) — `POST /api/auth/register`. Validated with Zod before it even hits the network. The backend doesn't log you in on register (no tokens in the response), so it just redirects to `/login` after.
- **Login** (`LoginForm.tsx` → `loginAction`) — `POST /api/auth/login`. Sets the access token cookie itself (see note above), then redirects based on the decoded role — tenant to `/dashboard`, landlord to `/landlord-dashboard`, admin to `/admin-dashboard`.
- **Current user** (`getMe.ts`) — `GET /api/auth/me`. Fetched once in the root layout and shared everywhere through `AuthContext` instead of every layout fetching it separately (that used to happen three times — once per route group — before I cleaned it up).
- **Logout** — no backend endpoint exists for this. It's purely a frontend action that clears the local cookie.

## Categories

- `GET /api/categories` — used in three places: the `/category` browse page, the filter dropdown on `/properties`, and the category `<select>` on the landlord's property create/edit form.

## Properties (public)

- Home page's featured section and `/properties` both hit `GET /api/properties`, just with different query params. `/properties` forwards whatever's in the URL — `searchTerm`, `categoryId`, `city`, `minRent`/`maxRent`, `bedrooms`, `bathrooms`, `sortBy`/`sortOrder` — straight through to the backend. Worth knowing: `bedrooms`/`bathrooms` are exact-match filters on the backend, not "3 or more", so I labeled the dropdowns accordingly instead of implying something the API doesn't actually do.
- Property details page (`/properties/[id]`) is `GET /api/properties/:id`, which already comes back with `category`, `landlord`, and `reviews` included.

## Rental requests (tenant side)

- "Request to Rent" dialog on the details page → `POST /api/rentals`. Only shows up if you're logged in as a tenant and the property's still `AVAILABLE`.
- Tenant dashboard's request history table → `GET /api/rentals`.

## Landlord — properties

- There's no endpoint for "list my own properties," so `getMyProperties.ts` works around it by calling the public listing once per status (`AVAILABLE`, `RENTED`, `UNAVAILABLE`) and filtering down to the logged-in landlord's id client-side. Not elegant, but it's what the API gives us.
- Create/edit forms → `POST` / `PUT /api/landlord/properties[/:id]`, same Zod rules as the backend (title min 5 chars, description min 20, etc.).
- Delete button → `DELETE /api/landlord/properties/:id`, behind a confirm dialog.

## Landlord — rental requests

- `GET /api/landlord/requests` feeds both the dashboard stats and the requests table.
- Approve/Reject → `PATCH /api/landlord/requests/:id`. This one's wired up with TanStack Query so clicking Approve flips the row immediately (optimistic update) instead of waiting on a round trip, and rolls back automatically if the request fails.

## Payments

- Pay Now button (only visible on `APPROVED` requests) → `POST /api/payments/checkout`, then the browser just gets redirected straight to the Stripe checkout URL it returns.
- Payment history on the dashboard → `GET /api/payments`.
- `/payment-success` and `/payment-cancel` aren't really "called" by the frontend — they exist because the backend hardcodes those exact paths as Stripe's `success_url`/`cancel_url`. The success page cross-references the `session_id` in the URL against `GET /api/payments` to show whether it's actually confirmed yet.
- The webhook (`POST /api/payments/webhook`) is Stripe talking to the backend directly — the frontend never touches it. Locally this means nothing flips to `COMPLETED` unless `stripe listen --forward-to localhost:5002/api/payments/webhook` is running in the background.

## Reviews

- "Leave Review" only shows on `COMPLETED` rentals, and posts to `POST /api/reviews`. Since there's no "get my reviews" endpoint to check beforehand, submitting a review twice just surfaces the backend's own "already reviewed" error via a toast rather than being blocked in the UI first.

## Admin

- Users table (`/admin-dashboard/users`) → `GET /api/admin/users`, with search and pagination. Ban/unban → `PATCH /api/admin/users/:id`.
- Properties and requests moderation views are read-only lists off `GET /api/admin/properties` and `GET /api/admin/rentals` — the backend doesn't expose any edit/delete for these, just viewing and (for users) blocking.
- The overview stats on `/admin-dashboard` reuse those same three endpoints with `limit=1`, just to read `meta.total` cheaply instead of adding dedicated stats endpoints.

# Stampify: digital loyalty cards

A customer joins a business's loyalty program, collects stamps at each purchase, and redeems a reward when the card is full.
Two roles: **customer** and **business**. React + Tailwind frontend, Express + MongoDB backend, JWT authentication.

## Technology
React (Vite), React Router, Tailwind v4, Axios, qrcode.react, html5-qrcode | Node, Express, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv

## Setup
    npm run install:all
    cp server/.env.example server/.env     # set JWT_SECRET (and MONGO_URI if using Atlas)
    cp client/.env.example client/.env
    npm run server        # terminal 1, http://localhost:5000
    npm run client        # terminal 2, http://localhost:5173

Local MongoDB: install MongoDB Community and start it (default `mongodb://127.0.0.1:27017/stampify`), or paste an Atlas connection string into `MONGO_URI`.
Generate a secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

## How it flows
React page -> service (Axios + JWT header) -> Express route -> auth + role middleware -> controller -> Mongoose model -> MongoDB -> JSON back -> React state.

## Test the whole flow
1. `/register` -> choose **I run a business** (business name, owner, email, password 8+). You land on `/business`.
2. Create a program (e.g. "Coffee Rewards", 5 stamps, "Free coffee") on the dashboard.
3. In a private window: `/register` -> **I'm a customer**. On `/customer`, press **Join** on the business.
4. Customer: **Show my QR** (`/customer/qr`). Business: **Scan & Stamp** (`/business/scan`): scan it, or type the customer's email, then **Add stamp**.
5. Repeat until 5/5: the reward unlocks on both sides. Customer presses **Redeem** (dashboard, My Cards or Rewards): stamps reset to 0.

## Password reset (no email service in this MVP)
`/login` -> Forgot password -> enter email. The reset link is printed in the **server console** and, outside production, shown on the page. Links last 15 minutes.

## Pages
    public:    /  /login  /register  /forgot-password  /reset-password/:token
    customer:  /customer  /customer/cards  /customer/rewards  /customer/qr
    business:  /business  /business/scan  /business/profile  /business/cards  /business/branches
Route guards: `components/ProtectedRoute.jsx` in the browser, `protect` + `allow(role)` middleware on the API. An expired token logs the user out automatically.

## API
    POST /api/auth/register | /login          GET /api/auth/me
    POST /api/auth/forgot-password            POST /api/auth/reset-password/:token
    GET  /api/businesses  /:id  /me/dashboard   PUT /api/businesses/me
    GET|POST /api/businesses/me/branches        DELETE /api/businesses/me/branches/:id
    GET  /api/loyalty/my-cards                  POST /api/loyalty/programs
    GET  /api/loyalty/programs/:id              POST /api/loyalty/programs/:id/join
    PUT|DELETE /api/loyalty/programs/:id        (business: pause/activate, edit text, delete if nobody joined)
    POST /api/loyalty/stamp (business)          POST /api/loyalty/cards/:id/redeem
    GET  /api/rewards                           POST /api/rewards/:id/redeem
Errors: 400 invalid input, 401 not logged in, 403 wrong role, 404 not found, 409 duplicate (email, already joined).

## Structure
    server/  config/db.js  models/ (User Business LoyaltyProgram CustomerCard Reward)  controllers/  routes/  middleware/ (auth role error)  utils/
    client/src/  services/ (api + auth/business/loyalty)  context/AuthContext  layouts/  components/  pages/ (Home Login Register NotFound, customer/, merchant/)  features/auth  design/ (theme tokens)

## Common errors
- `querySrv ENOTFOUND` or `uri undefined`: `server/.env` missing or still has the placeholder MONGO_URI. Restart the server after editing it.
- `ERR_CONNECTION_REFUSED`: the API is not running, or `VITE_API_URL` points to the wrong port. Check http://localhost:5000/api/health.
- 401/403 in the browser: logged in with the other role, or token expired. Log in again.

## Future improvements
Email delivery for password reset, Google/Apple sign-in, cashier PIN login, email verification, rate limiting, tests.

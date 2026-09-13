# SauceDemo — End-to-End UI Automation

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com/), written with
**Playwright** and **TypeScript** and organised around the **Page Object Model**.

The suite covers the required purchase journey — starting from a product's detail
page while signed in as `performance_glitch_user` — and adds one bonus test that
checks the validation on the checkout form.

## Why this stack

I chose **Playwright** mainly for its built-in auto-waiting: every action waits for
the page to be ready on its own. That turned out to be essential for
`performance_glitch_user`, which is deliberately slow, because it let me avoid
brittle fixed delays. On top of that, Playwright comes with an HTML report, a trace
viewer, screenshots and video, and parallel runs without any extra setup.

**TypeScript** catches mistakes before the browser even opens and makes the page
objects easy to read. The **Page Object Model** keeps each screen in its own class,
so if the UI changes I only touch one file, and the tests end up reading like plain
business steps.

For locators I leaned on the **`data-test`** attributes that SauceDemo exposes.
They exist purely for testing, so unlike CSS classes or visible text they don't
shift when the styling or the wording changes.

## Project structure

```
src/
  data/users.ts                 # credentials, kept in one place
  fixtures/fixtures.ts          # hands ready-made page objects to the tests
  pages/                        # one page object per screen
tests/
  purchase-flow.spec.ts         # required end-to-end purchase
  checkout-validation.spec.ts   # bonus negative test
```

## Requirements

- Node.js 18 or newer (built on Node 20 LTS)

## Getting started

```bash
npm install
npx playwright install chromium
```

## Running the tests

```bash
npm test               # run everything (headless)
npm run test:mandatory # just the required purchase flow
npm run test:bonus     # just the bonus validation test
npm run test:headed    # watch it run in a real browser
npm run report         # open the latest HTML report
npm run typecheck      # type-check without running the tests
```

## What the tests cover

**`purchase-flow.spec.ts` (required).** Signed in as `performance_glitch_user`, the
test opens a product's detail page, adds it to the cart from there, goes back with
"Back to Products", and then walks through checkout to the confirmation screen. It
grabs the product's name and price on the detail page and checks them again in the
cart and on the overview, so I know the item the user picked is exactly the one that
gets bought.

**`checkout-validation.spec.ts` (bonus).** On the checkout form, leaving fields
empty should raise the right error for each one in turn — First Name, then Last
Name, then Postal Code. It's a small negative test that guards a form the business
can't afford to get wrong.

## Design decisions

- I rely on **auto-waiting plus generous timeouts** rather than fixed sleeps, which
  is what makes the slow user reliable.
- The assertions **check real data, not just that a page loaded** — the product name
  and price travel with the test from start to finish.
- My locator rule of thumb is **`data-test` first, `getByRole` when it reads better**.
  On the detail page I scope the add-to-cart button to the `.inventory_details`
  container, because SauceDemo keeps every product's button in the DOM and a plain
  lookup matched several at once.
- **Fixtures** supply the page objects, so each test stays focused on its scenario.
- I kept the run to **Chromium only** to keep setup fast and friction-free.

## CI

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the whole suite
on Node 20 for every push and pull request, and saves the HTML report as an
artifact.

## Known limitations

- The tests hit the live public SauceDemo site, so they depend on it being online.
- Only Chromium runs by default; Firefox and WebKit can be switched on in the config.
- The scope is intentionally small. Sensible next steps would be product sorting,
  cart-badge maths, verifying the checkout totals and tax, and a negative login with
  `locked_out_user`.

# LUMEN — Pricing & Go-to-Market Case — ATELIA × ESCP Starter Kit

> This repo is your starting point. Codex should read this README first.

## How to Get Started

This repo is a **template**: click **Fork** (top right), not "Use this template." Fork keeps your copy linked back to the original — that's what lets ATELIA automatically find every team's work, without anyone needing to send a link.

Once you've forked it, add your teammates as collaborators (Settings → Collaborators on your fork), and leave the visibility as **Public** — don't switch it to Private, or we lose access to your work.

## The Brief

The full brief is in `LUMEN_Case_Brief.md` (and a formatted version in `LUMEN_Case_Brief.pdf`). The data is in the `data/` folder, documented in `data/README_data.md`.

One-sentence summary: LUMEN, a functional beverage brand, has to decide **price, positioning, and launch channel(s)** to enter the German market — with no real German sales data (LUMEN isn't there yet), and a real trade-off between the CMO (premium positioning) and the CFO (fast return on investment).

## Rule #1 — Prompt Logging Is Automatic

This repo includes an `AGENTS.md` file, which Codex reads automatically at the start of every task — you don't need to open or edit it. The first time you talk to Codex in a new conversation, it will ask for your **student ID**. Answer it, and from then on Codex logs every prompt you send it — automatically, verbatim — into `prompts/<your-id>/session-*.md`, without you doing anything else.

**You don't fill this in by hand.** Your only job is to make sure that log file gets committed along with your code changes — Codex writes it, but you still need to include it when your pull request is created and merged. If a pull request only has code changes and no updated log file, that's a sign something didn't get logged.

Why we're doing this: it's not to monitor you. It's what lets us understand, at the end, how you reasoned — not just what you produced. A good result reached with a clear prompt from the start isn't scored the same as a good result reached after fifteen random attempts.

## Rule #2 — Before You Code, Ask Yourself These Questions

Check each box in this README as you go — not at the end, while you're working:

- [x] **Data**: names, email addresses, and other direct contact information were removed from the survey data. `data/price_sensitivity_survey.csv` retains a non-identifying `respondent_id` solely to group each respondent’s four Van Westendorp price-threshold answers together; it is not a name, email, or contact field. The cockpit uses only PII-safe aggregates, so individual survey records are neither bundled nor rendered.
- [x] **API keys — not applicable: no external API used**: weather and seasonality come from the committed exhibit data, so there are no API calls, credentials, or keys to store.
- [ ] **Deployment — not yet completed**: the code and local production bundle use PII-safe data, but the live Vercel deployment still needs an authenticated network-response check before this can be marked complete.
- [x] **Files generated along the way**: derived files are intentional and documented. The anonymized survey is tracked because it is part of the data room; compiled build output is generated locally and is not treated as source data.
- [x] **Storage**: source exhibits remain as CSV files for auditability and reuse, while the frontend loads only the small aggregate values it needs into memory. This keeps the prototype simple, reviewable, and free of a backend data store.
- [x] **Robustness**: empty, inconsistent, or unexpected input is handled through the error boundary and recoverable reset actions; the behavior is covered by the UI recovery tests, including **Reset configuration**.
- [x] **Explainability**: the cockpit labels observed evidence, assumptions, derived calculations, and forecasts, then explains the recommendation through CMO/CFO trade-offs, scenario ranges, stress tests, and an executive memo.
- [x] **Business relevance**: the prototype directly supports the German entry decision by recommending a tested price, target segment, channel mix, launch timing, and economic trade-offs rather than presenting a generic technical dashboard.

These questions aren't here to slow you down — they're part of what's being evaluated. A thoughtful answer to one of them is worth more than an extra feature nobody asked for.

## What We Expect at the End

- A prototype that works, even partially, on the LUMEN case
- Your prompt log (`prompts/<your-id>/session-*.md`) committed and up to date
- A short paragraph below, written in business language (not technical), explaining what you did and why
- A live URL (Vercel or similar) if you deployed it — not required to still get credit, but expected if you did

## Our Approach

LUMEN Germany Market Entry Decision Cockpit turns the twelve supplied case exhibits into one deterministic, presentation-ready recommendation. Leaders select only a strategic objective, risk appetite and scenario; the cockpit then compares the three tested prices, channel-specific contribution economics, German survey evidence, historical marketing proxies, competitor benchmarks and seasonal timing. It shows the CMO/CFO trade-off explicitly rather than hiding it in one opaque score, and labels every result as observed data, derived calculation, assumption or forecast.

The prototype is deliberately a data-driven estimate, not a claim of German sales history or a real-time market prediction. Germany has no LUMEN sales data, so NL/DK/SE history informs quality checks and methodology only. Scenario ranges expose uncertainty, and all primary price recommendations remain within the three tested candidate prices.

The application bundles only PII-safe aggregates: no respondent names, email addresses, contact information, or respondent-level records are rendered or included in frontend assets. The price-sensitivity source retains only a non-identifying `respondent_id` to keep each respondent’s four threshold answers grouped together. No external APIs or API keys are used. The anonymized survey remains a source file in the data room, while the client uses only segment, city and channel aggregates needed for the analysis.

### Checklist rationale in business language

We deliberately did not add a live weather or other external API. The case already provides seasonality and temperature evidence, so using the supplied data avoids API credentials, outages, changing results, and an unnecessary operational dependency for this prototype.

The data is stored as committed CSV exhibits because that makes the analysis auditable: a reviewer can trace the recommendation back to the supplied case material. The browser receives only the aggregate segment, city, channel, price, and timing values needed to make the decision; it does not need a database or a respondent-level service.

The anonymized survey is a deliberate derived file and is tracked as part of the data room. Names, email addresses, and contact information are removed before the file is used. The price-sensitivity file retains a non-identifying `respondent_id` only so its four Van Westendorp answers stay grouped; it is not contact data and is not bundled into the app. The application itself consumes only safe aggregates. Build artifacts are disposable outputs, not business data, and are regenerated during deployment.

The tool is designed to help a market-entry team make a specific decision. It shows what price and channel plan to launch, who to target, when to enter, how the economics perform, and where the CMO’s premium-positioning preference conflicts with the CFO’s return requirements. Labels, evidence notes, scenarios, and stress tests make those trade-offs understandable to a non-technical decision-maker.

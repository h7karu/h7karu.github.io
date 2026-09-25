---
title: KO / PEP Statistical Arbitrage
summary: A cointegration-based pairs trading strategy on Coca-Cola and PepsiCo, evolved from a rolling-OLS baseline to an adaptive Kalman-filter hedge, and backtested with honest transaction costs.
year: 2026
context: Personal project
team: Solo
role: Research, implementation and backtesting
metrics:
  - value: 'p ≈ 0.03'
    label: Engle–Granger cointegration test
  - value: '3'
    label: Signal designs built and compared
  - value: '7 bps'
    label: Costs charged on every trade
tags:
  - Python
  - statsmodels
  - Kalman filter
  - Ornstein–Uhlenbeck
  - Backtesting
repo: https://github.com/h7karu/PEP_KO_pairs_trading
art: spread
order: 2
---

## Why this pair

Coca-Cola and PepsiCo are close economic substitutes: same industry, overlapping
demand drivers, similar size. If their prices drift apart, the gap is more likely noise
than a genuine repricing — and it should tend to close. That makes them a textbook
candidate for statistical arbitrage, and a good vehicle for doing every step properly.

## Method

**1. Test for cointegration, not correlation.** Two trending stocks look correlated
almost by default; what matters is whether a linear combination of their prices is
_stationary_. I used the Engle–Granger two-step method — regress log(PEP) on log(KO),
then run an Augmented Dickey–Fuller test on the residuals.

- Engle–Granger cointegration test: p ≈ 0.030
- ADF test on the residual spread: p ≈ 0.007
- Static hedge ratio: β ≈ 1.24

**2. Three ways to turn that into a signal.**

| #   | Hedge ratio                       | Entry and exit signal                                |
| --- | --------------------------------- | ---------------------------------------------------- |
| 1   | Rolling OLS, re-fit every 60 days | Rolling z-score, fixed window                        |
| 2   | Kalman filter, adapts every bar   | Z-score window set by the Ornstein–Uhlenbeck half-life |
| 3   | Kalman filter, adapts every bar   | Rolling z-score, fixed window                        |

The third design isolates the question the second one raises: is the adaptive
lookback window actually helping?

**3. Backtest with real frictions.** Every trade pays 2 bps commission plus 5 bps
slippage on the notional of both legs, sized as one unit of PEP hedged by −β units of
KO.

## Results

| Strategy                  | Total PnL | Sharpe   | Max drawdown | Trades | Cost drag |
| ------------------------- | --------: | -------: | -----------: | -----: | --------: |
| 1. Rolling OLS (baseline) |   −$8.19  |   −0.12  |     −$23.52  |     50 |    410.8% |
| 2. Kalman + OU            |    $5.60  |    0.08  |     −$17.63  |    194 |     77.7% |
| 3. Kalman only            | **$9.35** | **0.14** |     −$16.33  |    230 |     71.0% |

_KO and PEP daily bars, 2015–2022, after costs._

## The bug that changed the answer

An earlier version of the rolling strategy had a **same-bar lookahead**: it recorded
each day's position _after_ reacting to that day's z-score, so a signal computed from
today's close could trade at today's close — using information before it was
tradeable. Fixing it dropped the baseline's Sharpe from 0.33 to −0.12, and the
Kalman-only strategy's from 0.44 to 0.14.

I kept the story in the write-up rather than smoothing it over: catching the bug is a
more useful signal of rigour than the inflated numbers ever were.

## Takeaways

- A continuously adapting Kalman hedge ratio beats a periodically refit OLS one.
- Making the entry window adaptive too backfires. This pair's half-life is very short
  (a median of about two bars), so the window turns noisy, turnover climbs, and costs
  eat roughly 78% of gross PnL.
- For a fast-reverting, highly liquid pair, the hard part isn't finding mean
  reversion — it's capturing enough of it, cheaply enough, to net a profit.

## Where I'd take it next

Walk-forward validation (everything above is in-sample), a basket of consumer-staples
pairs evaluated as a portfolio, volatility-targeted sizing, and flooring the OU
half-life to see whether the adaptive window can be rescued.

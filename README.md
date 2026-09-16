# Cash Flow Sense

Build a complete, polished, end-to-end web application prototype called:

========================================================

CASH-FLOW COPILOT

Dynamic Microloan Repayment & Cash-Flow Planning System

========================================================

TAGLINE:

"Understand the cash flow. Detect the stress. Structure the recovery."

Cash-Flow Copilot is a lender-facing decision-support platform for microfinance institutions.

The system continuously analyzes borrower income, expenses and repayment history, forecasts future cash flow, detects repayment stress, distinguishes seasonal income dips from structural financial decline, generates alternative repayment plans, explains the evidence behind every recommendation, and requires explicit human loan-officer approval before any plan is accepted.

This is a HACKATHON PROTOTYPE.

Use realistic synthetic data and simulated model outputs.

DO NOT integrate real banking systems, UPI, payment gateways or real financial transactions.

The application should FEEL like a production-ready fintech/AI operations platform.

========================================================

CORE PRODUCT PRINCIPLE

========================================================

The most important concept in the product is:

NOT EVERY INCOME DROP MEANS THE SAME THING.

The system must distinguish between:

1. SEASONAL DIP

Temporary decline that matches the borrower's historical income pattern.

and

2. STRUCTURAL DECLINE

Persistent deterioration that does not match historical seasonality.

The prototype must make this difference visually obvious.

========================================================

END-TO-END SYSTEM

========================================================

Implement this complete pipeline:

DATA INGESTION

      ↓

DATA QUALITY CHECK

      ↓

CASH-FLOW DECOMPOSITION

      ↓

CASH-FLOW FORECAST

      ↓

REPAYMENT STRESS INDEX

      ↓

STRESS CLASSIFICATION

      ↓

EVIDENCE / EXPLAINABILITY

      ↓

REPAYMENT STRUCTURING ENGINE

      ↓

OFFICER REVIEW

      ↓

APPROVE / MODIFY / REJECT

      ↓

AUDIT LOG

      ↓

MONITOR ACTUAL OUTCOME

      ↓

FORECAST VS ACTUAL

      ↓

RECALIBRATION

      ↓

NEXT CYCLE

The architecture must visually communicate that this is a continuous loop, not a one-time prediction.

========================================================

IMPORTANT HUMAN-IN-THE-LOOP RULE

========================================================

THIS IS CRITICAL.

The AI/model NEVER automatically changes a loan.

The system can:

- detect

- classify

- forecast

- explain

- recommend

- simulate repayment plans

But ONLY the human loan officer can:

- approve

- modify

- reject

a repayment plan.

Every officer decision must generate an audit event.

Every approved plan must show:

Officer

Timestamp

Borrower

Previous schedule

New schedule

Reason

Evidence snapshot

RSI at decision time

Stress state

Selected plan

Never create a button called:

"Automatically apply"

Instead use:

"Review recommendation"

Then:

"Approve plan"

"Modify plan"

"Reject recommendation"

========================================================

DESIGN LANGUAGE

========================================================

Create a premium AI product interface inspired by modern AI agent workspaces and Manus-like interfaces.

Do NOT copy Manus branding or UI exactly.

Visual style:

- warm ivory background

- black / charcoal typography

- extremely clean

- minimal

- editorial

- premium

- intelligent

- subtle borders

- subtle shadows

- compact cards

- excellent whitespace

- restrained accent color

- sophisticated charts

- smooth micro-interactions

COLOR PALETTE:

Background:

#F7F6F2

Primary:

#181817

Secondary:

#686762

Muted:

#98968F

Border:

#E4E1D9

Card:

#FFFFFF

Soft surface:

#F0EFEA

Accent:

#B87524

Success:

#3F7957

Warning:

#B47720

Danger:

#B64C3D

Info:

#536B87

Do not make the application colorful.

Use accent colors sparingly.

Stress states must ALWAYS have:

- text

- icon

- label

- color

Never communicate state through color alone.

========================================================

TYPOGRAPHY

========================================================

Use Inter or Geist.

Page title:

30–36px

font-weight 600

Section title:

18–22px

font-weight 600

Card title:

14–16px

font-weight 600

Body:

13–14px

Metadata:

11–12px

Large KPI:

28–36px

Use tight typography.

Avoid giant marketing-style headings inside the application.

========================================================

APPLICATION STRUCTURE

========================================================

Create these routes:

/login

/dashboard

/portfolio

/borrowers

/borrowers/:id

/alerts

/plans

/forecasts

/monitoring

/data-ingestion

/model-insights

/audit-log

/settings

/help

========================================================

AUTHENTICATION

========================================================

Create a realistic prototype login screen.

No real authentication backend required.

Login:

Cash-Flow Copilot

"Decision intelligence for adaptive repayment."

Fields:

Work email

Password

Button:

Sign in

Demo access:

"Continue with demo account"

Demo user:

Priya Sharma

Loan Officer

Salem Central Branch

Also allow switching role:

Loan Officer

Risk Manager

Auditor

The role should change available navigation/actions.

========================================================

ROLE-BASED EXPERIENCE

========================================================

ROLE 1:

LOAN OFFICER

Can:

- view portfolio

- inspect borrowers

- review recommendations

- modify plans

- approve plans

- reject plans

- see audit history

ROLE 2:

RISK MANAGER

Can:

- view portfolio

- monitor branch risk

- inspect model metrics

- review restructuring decisions

- configure thresholds

- view audit logs

ROLE 3:

AUDITOR

Can:

- inspect borrower evidence

- inspect model explanations

- view decision history

- inspect audit snapshots

Auditor should NOT have an "Approve plan" action.

========================================================

GLOBAL APP SHELL

========================================================

LEFT SIDEBAR:

Logo:

Cash-Flow

Copilot

Small label:

LENDER OPERATIONS

Navigation:

Overview

Portfolio

Borrowers

Alerts

Plans

Divider

ANALYTICS

Forecasts

Monitoring

Model Insights

OPERATIONS

Data Ingestion

Audit Log

SYSTEM

Settings

Help

Bottom:

Salem Central Branch

Priya Sharma

Loan Officer

Profile menu.

========================================================

TOP BAR

========================================================

Top bar:

Breadcrumb

Global search

Command palette button:

⌘ K

Notification bell

Help

Profile

========================================================

DASHBOARD

========================================================

Route:

/dashboard

Heading:

Good evening, Priya.

Subheading:

"Here's what needs your attention across the branch."

Date:

September 16, 2026

KPI cards:

ACTIVE LOANS

200

STABLE

146

73%

NEEDS ATTENTION

38

19%

STRUCTURAL DECLINE

16

8%

PORTFOLIO HEALTH

Create a large chart showing borrower state distribution over the last 6 months.

States:

Stable

Seasonal Dip

Emerging Stress

Structural Decline

Below:

ATTENTION QUEUE

Table:

Borrower

Occupation

Loan balance

RSI

State

Seasonal match

Last payment

Action

Sample:

Meena Krishnan

Farmer

₹82,000

34

Seasonal Dip

87%

2 days ago

Review

Suresh Kumar

Gig Worker

₹61,200

76

Structural Decline

18%

12 days ago

Review

Anitha Devi

Vendor

₹42,000

21

Stable

92%

Yesterday

View

========================================================

AI ACTIVITY

========================================================

Dashboard section:

SYSTEM ACTIVITY

Timeline:

08:42 PM

Forecast recalculated

200 borrowers analyzed

08:39 PM

New structural decline detected

Suresh Kumar

08:32 PM

Repayment plan approved

Meena Krishnan

08:12 PM

Actual income received

12 borrowers

Make timeline interactive.

========================================================

PORTFOLIO

========================================================

Route:

/portfolio

Heading:

Portfolio

Subheading:

"Monitor repayment health across the active loan book."

Controls:

Search

State filter

Occupation filter

RSI range

Seasonal match

Sort

Date range

Stats:

200 active

146 stable

38 attention

16 structural decline

Table with 50+ realistic synthetic borrowers.

Columns:

Borrower

Occupation

Loan balance

Next installment

Cash-flow trend

RSI

State

Seasonal match

Last updated

Action

Click borrower → detail page.

========================================================

BORROWERS

========================================================

Route:

/borrowers

Create borrower directory.

Searchable cards/table.

Filters:

Occupation

Stress state

RSI

Repayment status

Each borrower card:

Avatar initials

Name

Occupation

Borrower ID

Loan balance

RSI

Stress state

Seasonal confidence

"Open analysis"

========================================================

BORROWER DETAIL

========================================================

THIS IS THE PRIMARY DEMO SCREEN.

Route:

/borrowers/meena

Header:

← Portfolio

Meena Krishnan

Farmer

Borrower ID BR-10482

Loan:

LN-28491

Status badge:

SEASONAL DIP

RSI:

34 / 100

Description:

"Low-to-moderate repayment stress with a strong seasonal-match signal."

Metadata:

Loan balance

₹82,000

Next repayment

₹7,500

Due

September 24, 2026

Last payment

September 10, 2026

========================================================

BORROWER OVERVIEW

========================================================

Create four small cards:

Cash buffer

₹2,100 projected

Repayment track record

11 / 12 on time

Income trend

Stable

Seasonal match

87%

========================================================

CASH FLOW OUTLOOK

========================================================

Large interactive chart.

Title:

Cash-flow outlook

Historical:

12 months

Forecast:

3 repayment periods

Show:

Actual income

Forecast

Confidence band

Expenses

Repayment obligation

Net cash flow

Controls:

6M

12M

18M

Tooltip on every data point.

Below:

Expected next-period inflow

₹27,800

Expected expenses

₹18,200

Repayment

₹7,500

Projected buffer

₹2,100

Forecast confidence

82%

========================================================

CASH-FLOW DECOMPOSITION

========================================================

Title:

What's driving the cash-flow change?

Three panels:

TREND

"Underlying income direction"

SEASONAL

"Recurring historical pattern"

RESIDUAL

"Unexpected variation"

Create three visual mini charts.

Show:

Seasonal match

87%

Confidence:

High

Message:

"The current decline closely matches this borrower's historical seasonal pattern."

========================================================

RSI

========================================================

Title:

Repayment Stress Index

Large circular gauge:

34 / 100

State:

Seasonal Dip

Subtitle:

"Stress signal is primarily seasonal rather than structural."

Six components:

Cash Buffer Ratio

18 / 25

Residual Volatility

5 / 15

Trend Momentum

4 / 20

Repayment Track Record

2 / 15

Unexplained Seasonal Deviation

2 / 15

Expense Shock

3 / 10

Each component:

- progress bar

- score

- contribution

- tooltip

========================================================

RSI HISTORY

========================================================

Create a small timeline chart:

RSI over previous 6 cycles.

Example:

Cycle 1: 22

Cycle 2: 24

Cycle 3: 27

Cycle 4: 29

Cycle 5: 31

Cycle 6: 34

Show that this is not a sudden unexplained jump.

========================================================

EXPLAINABILITY

========================================================

Title:

Why the system classified this borrower as a Seasonal Dip

Evidence cards:

1.

SEASONAL PATTERN

87% match

"Current income decline is consistent with the borrower's historical monsoon pattern."

2.

TREND MOMENTUM

Stable

"Underlying six-month income trend has not materially deteriorated."

3.

REPAYMENT HISTORY

Strong

"11 of the last 12 scheduled repayments were made on time."

4.

CASH BUFFER

Moderate

"Projected cash buffer remains positive through the next repayment period."

5.

EXPENSE SHOCK

Low

"No abnormal increase in expenses was detected."

Every evidence card should have:

Icon

Evidence type

Value

Explanation

Data source

Contribution

========================================================

MODEL EVIDENCE DRAWER

========================================================

Button:

"Inspect model evidence"

Opens right-side drawer.

Title:

Model evidence

Show feature attribution.

Do NOT show chain-of-thought.

Show only concise feature-level attribution.

Example:

Cash Buffer Ratio

+18%

Residual Volatility

+5%

Trend Momentum

+4%

Repayment Track Record

+2%

Seasonal Deviation

+2%

Expense Shock

+3%

Include:

"These feature contributions explain the displayed classification."

========================================================

REPAYMENT STRUCTURING ENGINE

========================================================

Title:

Repayment options

Subtitle:

"Alternative structures generated from projected affordability and stress state."

Show 3 plans.

------------------------------------------------

PLAN A

------------------------------------------------

SEASONAL STEP-DOWN

Badge:

RECOMMENDED

Current installment:

₹7,500

Proposed:

₹5,200

during low-income periods

₹8,100

during recovery periods

Tenure:

+1 month

Projected buffer:

₹2,300

Recovery outlook:

Strong

Reason:

"Matches the borrower's recurring seasonal income cycle."

Button:

Review recommendation

------------------------------------------------

PLAN B

------------------------------------------------

SKIP & REDISTRIBUTE

Skip:

1 period

Redistribute:

Next 5 periods

New installment:

₹9,000

Tenure:

+1 month

Button:

Review

------------------------------------------------

PLAN C

------------------------------------------------

TENURE EXTENSION

Current tenure:

18 months

New tenure:

21 months

Installment:

₹6,300

Button:

Review

========================================================

PLAN COMPARISON

========================================================

Create a comparison table.

Columns:

Current

Step-down

Skip & redistribute

Tenure extension

Rows:

Installment

Tenure

Projected buffer

Recovery impact

Borrower affordability

Principal recovery

Risk signal

Use subtle visual highlighting for recommended plan.

========================================================

HUMAN REVIEW

========================================================

Click:

Review recommendation

Open large side drawer.

Title:

Review repayment recommendation

Step indicator:

01 Understand

02 Compare

03 Decide

04 Record

STEP 01:

Borrower summary

Show:

RSI

State

Forecast

Seasonal match

Cash buffer

STEP 02:

Plan comparison

STEP 03:

Officer decision

Show:

Recommended:

Seasonal Step-Down

Then buttons:

Approve plan

Modify plan

Reject recommendation

IMPORTANT:

Do NOT allow automatic execution.

========================================================

MODIFY PLAN

========================================================

Click:

Modify plan

Open form.

Fields:

Low-income installment

₹5,200

Recovery installment

₹8,100

Extension

1 month

Optional officer note:

"Plan adjusted to reflect expected harvest recovery."

Show live recalculation:

Projected borrower buffer

₹2,300

Estimated recovery

98%

New tenure

19 months

Button:

Save modified recommendation

Then return to decision screen.

========================================================

APPROVAL CONFIRMATION

========================================================

When officer clicks:

Approve plan

Show confirmation dialog:

Approve repayment adjustment?

Selected plan:

Seasonal Step-Down

Borrower:

Meena Krishnan

New schedule:

₹5,200 × 2

₹8,100 × 4

Officer:

Priya Sharma

Timestamp:

September 16, 2026 · 8:42 PM

Buttons:

Cancel

Confirm approval

After confirmation:

Success state:

PLAN APPROVED

"Decision recorded. The repayment system has NOT automatically executed the change."

Show:

Approved by

Priya Sharma

Decision time

8:42 PM

Plan

Seasonal Step-Down

Audit ID

AUD-20260916-0842

Button:

View audit record

========================================================

REJECTION FLOW

========================================================

If Reject:

Open rejection modal.

Required reason:

Plan not affordable

Insufficient evidence

Borrower prefers current schedule

Needs branch manager review

Other

Optional notes.

Button:

Record rejection

Create audit entry.

========================================================

BRANCH MANAGER REVIEW

========================================================

Create plans page:

/plans

Sections:

Pending review

Approved

Modified

Rejected

For large restructurings show:

"Requires branch manager approval"

Create mock escalation workflow.

========================================================

ALERTS

========================================================

/alerts

Sections:

Immediate attention

Emerging Stress

Seasonal Dips

Structural Declines

Forecast anomalies

Each alert:

Borrower

Trigger

RSI

Detected

Evidence

Suggested action

Click → borrower detail.

========================================================

SURESH STRUCTURAL DECLINE SCENARIO

========================================================

Create a dedicated demo scenario.

Borrower:

Suresh Kumar

Occupation:

Gig Worker

Borrower ID:

BR-10921

State:

STRUCTURAL DECLINE

RSI:

76 / 100

Seasonal match:

18%

Create income data showing:

- six consecutive periods of decline

- no meaningful seasonal match

- increasing expenses

- decreasing cash buffer

- weaker repayment history

Forecast:

Income continues declining.

Projected cash buffer:

negative within two repayment periods.

Evidence:

1.

LONG-TERM DECLINE

"Income has declined for six consecutive periods."

2.

LOW SEASONAL MATCH

"Current decline does not resemble the borrower's historical seasonal pattern."

3.

CASH BUFFER PRESSURE

"Projected buffer becomes negative within two repayment periods."

4.

EXPENSE PRESSURE

"Expense-to-income ratio increased from 61% to 78%."

5.

REPAYMENT HISTORY

"Recent repayment behavior shows increasing irregularity."

Make:

Seasonal match = 18%

visually very different from Meena's:

Seasonal match = 87%

========================================================

SCENARIO SWITCHER

========================================================

At top of borrower analysis page create:

DEMO SCENARIO

[Meena — Seasonal Dip]

[Suresh — Structural Decline]

Clicking switches the entire analysis.

This must update:

Cash-flow chart

Forecast

Decomposition

RSI

Evidence

Stress state

Repayment plans

This is a major hackathon demonstration feature.

========================================================

DATA INGESTION

========================================================

Route:

/data-ingestion

Title:

Data ingestion

Options:

UPLOAD DATA

Drag-and-drop CSV/JSON.

Required columns:

borrower_id

date

amount

type

source

Show sample data format.

After upload:

Step 1

File validation

Step 2

Data quality

Step 3

Borrower mapping

Step 4

Analysis

Show:

Records

Borrowers

Date range

Missing values

Irregular intervals

Invalid records

Create a data quality score.

Example:

94 / 100

Warnings:

7 missing dates

3 malformed records

Allow:

Review issues

========================================================

SYNTHETIC DATA GENERATOR

========================================================

Second option:

Generate demo data

Buttons:

50 borrowers

100 borrowers

200 borrowers

Archetypes:

Regular / Stable

Seasonal

Structurally Declining

After generation:

200 borrowers created

1,200 transaction periods

3 archetypes

Analysis ready

Button:

Run analysis

========================================================

FORECAST ENGINE

========================================================

Route:

/forecasts

Title:

Forecast engine

Stats:

200 / 200 borrowers forecasted

Forecast horizon:

3 repayment periods

Method:

STL + Prophet

Show:

Trend

Seasonal

Residual

Forecast

Confidence band

Create borrower selector.

Create forecast-vs-actual chart.

Metrics:

Forecast MAE

Forecast MAPE

Coverage

Make this page technical enough for judges but understandable.

========================================================

MONITORING

========================================================

Route:

/monitoring

Title:

Monitoring loop

Create large visual:

FORECAST

↓

ACTUAL

↓

ERROR

↓

RECALIBRATION

↓

NEXT CYCLE

Show forecast-vs-actual chart.

Table:

Borrower

Forecast

Actual

Error

State

Last cycle

Example:

Meena

₹27,800

₹28,400

+2.1%

Seasonal Dip

Suresh

₹18,900

₹16,700

-11.6%

Structural Decline

Show:

Forecast accuracy

91.4%

Cohort calibration

+3.2%

========================================================

OUTCOME TRACKING

========================================================

After a repayment plan is approved, allow simulated outcomes.

For example:

Plan approved

Next cycle:

Actual inflow

₹28,400

Repayment

₹5,200

Buffer

₹3,100

Outcome:

RECOVERING

Create outcome labels:

Recovered

Still stressed

Re-entered stress

Default risk

Then show:

"Forecast vs actual"

and:

"Plan outcome"

========================================================

FEEDBACK LOOP

========================================================

Make the monitoring system feed back into forecasting.

Visual:

Approved plan

→ Actual outcome

→ Forecast error

→ Cohort recalibration

→ Updated forecast

→ Updated RSI

Include a button:

"Run next cycle"

Clicking it should:

- generate new actuals

- compare forecast

- update RSI

- update borrower state

- update dashboard

- add audit/monitoring event

========================================================

MODEL INSIGHTS

========================================================

Route:

/model-insights

Title:

Model insights

Cards:

RSI distribution

State distribution

Seasonal-match confidence

Forecast confidence

Feature contribution

Create feature importance chart:

Cash Buffer Ratio

Trend Momentum

Residual Volatility

Repayment Track Record

Unexplained Seasonal Deviation

Expense Shock

========================================================

RSI CONFIGURATION

========================================================

Show:

RSI weights

Cash Buffer Ratio

25%

Residual Volatility

15%

Trend Momentum

20%

Repayment Track Record

15%

Unexplained Seasonal Deviation

15%

Expense Shock

10%

Use sliders.

Show:

Total = 100%

Button:

Save configuration

========================================================

STRESS THRESHOLDS

========================================================

Show:

Stable

0–30

Seasonal Dip

31–50

Emerging Stress

51–70

Structural Decline

71–100

Show explanation.

These are demo configuration values.

========================================================

STRUCTURING RULES

========================================================

Display editable rules:

Seasonal Dip

→ Step-down

→ Skip & redistribute

Emerging Stress

→ Step-down

→ Tenure extension

Structural Decline

→ Moratorium

→ Tenure extension

Stable + strong trend

→ Early close

→ Top-up eligibility

Make this configuration-driven.

========================================================

AUDIT LOG

========================================================

Route:

/audit-log

Title:

Decision audit log

Every decision must appear here.

Columns:

Timestamp

Officer

Borrower

Action

Plan

RSI

State

Evidence snapshot

Audit ID

Actions:

Approved

Modified

Rejected

Click event.

Open detailed audit drawer.

Show:

Decision

Officer

Timestamp

Borrower

RSI at decision

Stress state

Selected plan

Previous schedule

New schedule

Evidence presented

Officer notes

Model version

Configuration version

========================================================

AUDIT IMMUTABILITY UI

========================================================

Show:

"Decision snapshot"

"Evidence shown at decision time"

"Configuration at decision time"

This demonstrates that the system can later explain why the decision was made.

========================================================

BORROWER TIMELINE

========================================================

On borrower detail page add:

Activity timeline.

Examples:

Sep 16

Forecast recalculated

Sep 16

RSI changed

31 → 34

Sep 16

Seasonal Dip detected

Sep 16

Step-down plan recommended

Sep 16

Plan approved by Priya Sharma

Sep 24

Next repayment due

========================================================

POSITIVE RECOMMENDATIONS

========================================================

For strong stable borrowers show optional section:

"Positive opportunities"

Example:

Anitha Devi

Stable

RSI 18

Strong upward cash-flow trend.

Possible options:

Early close

Top-up eligibility

Do NOT show these as mandatory.

========================================================

COMMAND PALETTE

========================================================

Implement:

Ctrl + K

or

Cmd + K

Search:

Borrowers

Loans

Alerts

Plans

Audit events

Pages

Example:

Search "Meena"

Result:

Meena Krishnan

Farmer

RSI 34

Seasonal Dip

========================================================

NOTIFICATIONS

========================================================

Create notification drawer.

Examples:

New structural decline detected

Suresh Kumar

RSI 76

Plan awaiting approval

Meena Krishnan

Forecast recalibration complete

12 borrowers updated

========================================================

HELP / PRODUCT EDUCATION

========================================================

Create /help.

Explain:

What is RSI?

What is seasonal match?

What is forecast confidence?

Why does the system need officer approval?

What does structural decline mean?

Keep explanations short.

========================================================

MOCK DATA ARCHITECTURE

========================================================

Use TypeScript interfaces.

Entities:

Borrower

Loan

Transaction

ForecastResult

DecompositionResult

RSIScore

Evidence

RepaymentPlanOption

OfficerDecision

AuditEvent

MonitoringOutcome

ModelConfiguration

========================================================

BORROWER MODEL

========================================================

Example:

{

 id: "BR-10482",

 name: "Meena Krishnan",

 occupation: "Farmer",

 state: "Seasonal Dip",

 rsi: 34,

 seasonalMatch: 87,

 cashBuffer: 2100

}

========================================================

LOAN MODEL

========================================================

{

 id: "LN-28491",

 borrowerId: "BR-10482",

 principal: 120000,

 balance: 82000,

 installment: 7500,

 tenure: 18,

 remainingPeriods: 11

}

========================================================

TRANSACTION MODEL

========================================================

{

 id: "TX-10001",

 borrowerId: "BR-10482",

 date: "2026-08-15",

 amount: 28000,

 type: "income",

 source: "market_sales"

}

Types:

income

expense

repayment

========================================================

FORECAST MODEL

========================================================

{

 borrowerId,

 period,

 pointEstimate,

 lowerBound,

 upperBound

}

========================================================

RSI MODEL

========================================================

{

 borrowerId,

 cycle,

 value,

 components,

 state

}

Components:

CBR

RV

TM

RTR

USD

ESI

========================================================

EVIDENCE MODEL

========================================================

{

 borrowerId,

 cycle,

 statement,

 component,

 direction,

 contribution

}

========================================================

PLAN MODEL

========================================================

{

 id,

 borrowerId,

 type,

 installment,

 revisedTenure,

 projectedBuffer,

 recoveryImpact,

 recommended

}

========================================================

DECISION MODEL

========================================================

{

 id,

 borrowerId,

 officerId,

 action,

 planId,

 timestamp,

 notes,

 evidenceSnapshot,

 configurationSnapshot

}

========================================================

SIMULATED ANALYSIS ENGINE

========================================================

Do not require actual ML infrastructure.

Create modular functions:

analyzeBorrower()

forecastCashFlow()

decomposeCashFlow()

calculateRSI()

classifyStress()

generateEvidence()

generateRepaymentPlans()

simulateOutcome()

recalibrateForecast()

Use deterministic mock calculations.

The interface should behave as if the actual ML pipeline is running.

Keep all model simulation logic separate from UI.

This should allow future replacement with:

STL

Prophet / NeuralProphet

XGBoost / LightGBM

SHAP

without rewriting the UI.

========================================================

RSI LOGIC

========================================================

Create a weighted composite score from:

Cash Buffer Ratio

Residual Volatility

Trend Momentum

Repayment Track Record

Unexplained Seasonal Deviation

Expense Shock

RSI range:

0–100

Classification:

0–30:

Stable

31–50:

Seasonal Dip

51–70:

Emerging Stress

71–100:

Structural Decline

Use trend direction and seasonal-match confidence in classification.

========================================================

SEASONAL MATCH LOGIC

========================================================

The key prototype behavior:

If current income decline resembles historical seasonal pattern:

increase seasonal-match confidence

reduce unexplained seasonal deviation

avoid incorrectly classifying as structural decline

If decline is persistent and does not match historical seasonality:

low seasonal confidence

higher structural signal

higher RSI

========================================================

PLAN GENERATION LOGIC

========================================================

For:

Seasonal Dip:

generate:

Step-down

Skip & redistribute

Tenure extension

Recommended:

Step-down

For:

Emerging Stress:

generate:

Step-down

Tenure extension

Moratorium

For:

Structural Decline:

generate:

Moratorium

Tenure extension

Skip & redistribute

Recommended plan should depend on forecast trajectory.

For Stable:

do not show restructuring as a required intervention.

Optionally show:

Early close

Top-up eligibility

========================================================

IMPORTANT FINANCIAL UX

========================================================

Never use language:

"AI has decided."

Use:

"System recommendation"

"Evidence"

"Officer decision"

"Recommended option"

"Projected"

"Estimated"

"Forecast"

Clearly distinguish:

ACTUAL

FORECAST

RECOMMENDATION

DECISION

APPROVED

========================================================

NO FALSE CERTAINTY

========================================================

When displaying forecasts use:

Projected

Estimated

Confidence

Expected

Never present simulated predictions as guaranteed outcomes.

========================================================

TABLES

========================================================

All tables should have:

- sorting

- filtering

- search

- pagination

- hover states

- row click

- responsive horizontal scrolling

========================================================

CHARTS

========================================================

Use Recharts.

Required charts:

Portfolio health

Cash-flow actual vs forecast

Forecast confidence band

Trend

Seasonality

Residual

RSI history

RSI contribution

Forecast vs actual

State distribution

Feature importance

Outcome tracking

Charts should be clean and minimal.

No 3D charts.

No excessive colors.

========================================================

RESPONSIVENESS

========================================================

Optimize for:

1440px desktop

1280px laptop

1024px tablet

At smaller sizes:

Collapse sidebar.

Stack cards.

Make tables horizontally scrollable.

Keep charts readable.

Drawers become full-screen sheets.

========================================================

LOADING STATES

========================================================

Create polished skeleton loaders.

Example:

"Analyzing borrower..."

Show pipeline progress:

Data verified

✓

Forecast generated

✓

RSI calculated

✓

Stress classified

✓

Evidence generated

✓

Plans generated

✓

Then:

Analysis complete

========================================================

ERROR STATES

========================================================

Create graceful states for:

Malformed CSV

Insufficient history

Missing transaction data

Forecast unavailable

No repayment history

No recommendation

Do not use browser alerts.

Use inline error states and toast notifications.

========================================================

TOAST SYSTEM

========================================================

Use toast notifications for:

Plan approved

Plan modified

Plan rejected

Data imported

Synthetic data generated

Analysis complete

Configuration saved

Audit event created

========================================================

DEMO MODE

========================================================

Create a visible:

DEMO MODE

indicator.

Add:

"Reset demo"

button.

Reset should restore original demo state.

Create:

"Run complete demo"

button.

This should automatically walk through the product pipeline visually:

1. Data ingestion

2. Forecast

3. Stress detection

4. Evidence

5. Plan generation

6. Officer review

7. Approval

8. Audit

9. Monitoring

Use subtle animation.

========================================================

HACKATHON PRESENTATION MODE

========================================================

Create a special:

Presentation Mode

button.

When enabled:

Hide unnecessary navigation.

Use a clean full-screen experience.

Show:

Cash-Flow Copilot

Then:

"Two income drops. Two different stories."

Scenario cards:

MEENA

Seasonal Dip

87% seasonal match

RSI 34

SURESH

Structural Decline

18% seasonal match

RSI 76

Button:

Compare scenarios

Create a side-by-side comparison.

========================================================

SIDE-BY-SIDE SCENARIO COMPARISON

========================================================

Create:

Meena vs Suresh

Columns:

Metric

Meena

Suresh

Income trend

Seasonal

Persistent decline

Seasonal match

87%

18%

RSI

34

76

Cash buffer

Positive

Negative projected

Repayment history

11/12 on time

Increasing irregularity

Recommended intervention

Step-down

Moratorium / extension

Evidence count

5

5

Make this the centerpiece of the hackathon demo.

========================================================

PIPELINE VISUALIZATION

========================================================

Create reusable component:

CashFlowPipeline

Six stages:

01 Data ingestion

02 Cash-flow forecasting

03 Stress detection

04 Structuring engine

05 Explainability

06 Lender approval

Then:

Monitoring loop

↓

Actual outcome

↓

Recalibration

↓

Next forecast

Use thin connecting lines.

Current active stage gets subtle amber highlight.

========================================================

GLOBAL SEARCH

========================================================

Command palette:

⌘K / Ctrl+K

Search across:

borrowers

loans

alerts

plans

audit logs

========================================================

ACCESSIBILITY

========================================================

Ensure:

Keyboard navigation

Visible focus states

ARIA labels

Readable contrast

Non-color status indicators

Tooltips

Accessible buttons

Responsive layout

========================================================

PERFORMANCE

========================================================

The prototype should feel instant.

Use:

Memoization where useful

Lazy-loaded routes

Efficient chart rendering

Virtualized table if necessary

Local mock data

No unnecessary API calls.

========================================================

NO PLACEHOLDER SCREENS

========================================================

Every navigation item must lead to a real screen.

Do not create:

"Coming soon"

"Lorem ipsum"

Empty placeholder cards.

Every page must contain realistic content.

========================================================

CODE QUALITY

========================================================

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Lucide React

Recharts

Use reusable components.

Keep business logic separate from presentation.

Create:

/data

/models

/lib

/components

/pages

========================================================

SUGGESTED COMPONENT STRUCTURE

========================================================

src/

components/

layout/

Sidebar

Topbar

Breadcrumbs

CommandPalette

dashboard/

KPIGrid

PortfolioHealth

AttentionQueue

ActivityTimeline

borrower/

BorrowerHeader

CashFlowChart

DecompositionChart

RSIGauge

RSIComponents

EvidencePanel

EvidenceDrawer

PlanCards

PlanComparison

PlanReviewDrawer

ApprovalDialog

BorrowerTimeline

pipeline/

CashFlowPipeline

PipelineStage

monitoring/

ForecastActualChart

OutcomeCard

RecalibrationPanel

audit/

AuditTable

AuditDrawer

DecisionSnapshot

data/

UploadZone

DataQuality

SyntheticGenerator

common/

StatusBadge

MetricCard

EmptyState

LoadingState

ErrorState

Toast

========================================================

FINAL NAVIGATION

========================================================

Sidebar must contain:

Overview

Portfolio

Borrowers

Alerts

Plans

Forecasts

Monitoring

Model Insights

Data Ingestion

Audit Log

Settings

Help

========================================================

FINAL DEMO SCRIPT

========================================================

The application must support this exact presentation:

STEP 1

Open dashboard.

Show:

200 active loans

146 stable

38 attention

16 structural decline

STEP 2

Open Meena.

Show:

RSI 34

Seasonal Dip

87% seasonal match

STEP 3

Open cash-flow chart.

Show income decline.

STEP 4

Open decomposition.

Show:

Trend stable

Seasonality strong

Residual low

STEP 5

Open explainability.

Show why this is seasonal.

STEP 6

Open repayment plans.

Show:

Seasonal Step-Down

RECOMMENDED

STEP 7

Click:

Review recommendation

STEP 8

Show:

AI recommendation ≠ automatic action

Officer decision required.

STEP 9

Click:

Approve plan

STEP 10

Show:

Approval confirmation.

STEP 11

Open:

Audit Log

Show exact decision snapshot.

STEP 12

Switch to Suresh.

Show:

RSI 76

Structural Decline

18% seasonal match.

STEP 13

Show six-period declining trend.

STEP 14

Show negative projected buffer.

STEP 15

Show explainability.

STEP 16

Show different repayment structures.

STEP 17

Open monitoring.

Show:

Forecast → Actual → Error → Recalibration.

STEP 18

Run next cycle.

Show updated borrower analysis.

========================================================

CORE STORY OF THE PRODUCT

========================================================

The entire product should communicate this:

"Cash-flow stress is not binary."

A missed or reduced repayment can mean:

Temporary seasonal pressure

OR

Genuine financial deterioration.

Cash-Flow Copilot identifies the difference using:

Cash-flow patterns

Forecasts

Seasonality

Repayment behavior

Expense changes

Cash buffer

Explainable evidence

Then it proposes:

"Here are the options."

NOT:

"Here is what you must do."

The officer remains the final decision-maker.

========================================================

FINAL QUALITY BAR

========================================================

The finished application must look like a serious AI fintech startup product.

It should be suitable for:

Hackathon judging

Investor demonstration

Product walkthrough

Technical architecture presentation

The UI should feel closer to:

AI operations console

+

premium fintech dashboard

+

model transparency workspace

rather than:

traditional banking software

or

generic admin dashboard.

Prioritize:

1. Borrower analysis

2. Seasonal vs structural distinction

3. Explainability

4. Repayment plan recommendation

5. Human approval workflow

6. Auditability

7. Monitoring feedback loop

8. Premium UI

Build the complete end-to-end prototype now.

Do not stop at static screens.

All major interactions must work using local simulated data/state.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3754a1ab-a65b-45fd-8874-9224d7009fed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

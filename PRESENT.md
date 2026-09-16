# Cash-Flow Copilot — Presentation Guide

## One-line pitch

**Cash-Flow Copilot is an AI-powered lender decision-intelligence workspace that detects borrower cash-flow stress, explains whether the decline is seasonal or structural, proposes repayment options, keeps the loan officer in control, records the decision, and closes the loop through outcome monitoring and recalibration.**

---

# Final Demo Story

## 1. Dashboard

Open the dashboard.

### Say:

> “Cash-Flow Copilot monitors the lending portfolio and identifies borrowers whose cash flow needs attention.”

Point out the portfolio overview, attention queue, stress states, and borrower analysis entry points.

---

# 2. Open Meena

Open:

`/borrowers/meena`

### Say:

> “Here we have two borrowers with income pressure, but the system doesn't assume every decline means the same thing.”

Introduce Meena as the first hero scenario.

---

# 3. Meena — Seasonal Stress

Show:

- **RSI: 34 / 100**
- **Seasonal match: 87%**
- **Classification: Seasonal Dip**
- Cash-flow forecast
- STL decomposition
- RSI analysis
- Evidence

### Say:

> “Meena's decline closely matches her historical seasonal pattern. The model therefore treats this as a seasonal dip rather than immediately interpreting the decline as structural deterioration.”

### Explain the evidence

Show the forecast and decomposition.

The key concept is:

```text
Income pressure
      ↓
Historical pattern comparison
      ↓
Strong seasonal alignment
      ↓
Lower repayment stress
      ↓
Seasonal Dip classification
```

The model is not simply saying that income fell.

It is asking:

> **“What explains the income decline?”**

---

# 4. System Recommendation

Scroll to the repayment recommendation.

### Say:

> “The system proposes a repayment adjustment based on projected affordability, forecast conditions, repayment history, and the detected stress pattern.”

Show:

- Current installment
- Proposed installment
- Projected buffer
- Tenure impact
- Recovery impact
- Model rationale
- Alternative repayment options

Emphasize:

> “This is a recommendation, not an automatic loan-system action.”

---

# 5. Human-in-the-Loop Decision

Show:

**OFFICER REVIEW REQUIRED**

### Say:

> “But the AI does not make the lending decision.”

Click:

**Review recommendation →**

Walk through:

```text
01 Understand
      ↓
02 Compare
      ↓
03 Decide
      ↓
04 Record
```

### Say:

> “The officer reviews the evidence, compares the available options, and then decides whether to approve, modify, or reject the recommendation.”

Show the three officer choices:

- Approve recommendation
- Modify recommendation
- Reject recommendation

---

# 6. Approve / Modify / Reject

## Approve

Show the confirmation screen.

### Say:

> “If the officer agrees, the decision is explicitly recorded as an officer approval.”

Point out the disclaimer:

> “This records the officer's decision. The prototype does not automatically execute a loan-system change.”

Complete the approval.

---

## Modify

If demonstrating modification:

> “The officer can also override the recommendation and modify the repayment terms.”

Show that the modified decision is attributed to the officer.

---

## Reject

If demonstrating rejection:

> “The officer can reject the recommendation and must provide a reason.”

Show:

- Rejection reason
- Officer notes

---

# 7. Audit Log

Open:

`/audit-log`

### Say:

> “Every officer decision becomes an auditable record.”

Show:

- Borrower
- Officer
- Timestamp
- Decision
- Selected plan
- RSI
- Stress state
- Previous schedule
- New schedule
- Evidence snapshot
- Officer notes
- Model version
- Configuration version

### Key statement

> “The important part is that the evidence used at decision time is preserved with the decision.”

---

# 8. Show Suresh

Open:

`/borrowers/suresh`

Show:

- **RSI: 76 / 100**
- **Seasonal match: 18%**
- **Structural Decline**

### Say:

> “Now look at Suresh. The income decline has a much weaker seasonal explanation and a stronger persistent negative trend, so the analysis produces a materially different risk interpretation and repayment recommendation.”

The comparison should communicate:

| | Meena | Suresh |
|---|---|---|
| RSI | 34 | 76 |
| Seasonal match | 87% | 18% |
| Classification | Seasonal Dip | Structural Decline |
| Interpretation | Strong seasonal explanation | Weak seasonal explanation |
| Intervention direction | Seasonal repayment adjustment | Moratorium / restructuring direction |

The purpose is not to claim that one borrower is “good” and the other is “bad”.

The purpose is to demonstrate that:

> **Different underlying causes of income decline can lead to different decision-support recommendations.**

---

# 9. Monitoring

Open:

`/monitoring`

Show the monitoring pipeline.

```text
Decision
   ↓
Observed Outcome
   ↓
Forecast Error
   ↓
Recalibration
   ↓
Next Cycle
```

Click:

**Run next cycle**

### Say:

> “The system doesn't stop after the officer makes a decision. The next cycle compares observed outcomes against the forecast.”

Point out:

- Forecast vs actual
- Forecast error
- MAPE
- MAE
- Accuracy/recalibration metrics
- Monitoring cycle

Then:

> “Those outcomes feed back into the next forecasting cycle.”

---

# 10. Closing Statement

End with:

> **“Cash-Flow Copilot doesn't just predict stress. It explains the stress, proposes an intervention, keeps the officer in control, records the decision, and learns from the outcome.”**

Then use the short final line:

# TWO INCOME DROPS.
# TWO DIFFERENT STORIES.
# ONE HUMAN DECISION.

---

# 90-Second Demo Flow

```text
Dashboard
   ↓
Meena
   ↓
RSI 34 / Seasonal Match 87%
   ↓
Forecast
   ↓
Decomposition
   ↓
Evidence
   ↓
System Recommendation
   ↓
Officer Review Required
   ↓
Approve / Modify / Reject
   ↓
Audit Log
   ↓
Suresh
   ↓
RSI 76 / Seasonal Match 18%
   ↓
Structural Decline
   ↓
Monitoring
   ↓
Run Next Cycle
   ↓
Forecast Error
   ↓
Recalibration
```

---

# Important Presentation Rules

## Always say

- “The system recommends.”
- “The model identifies.”
- “The officer reviews.”
- “The officer decides.”
- “The decision is recorded.”
- “The outcome is monitored.”
- “The model is recalibrated.”

## Avoid saying

- “The AI approves the loan.”
- “The AI rejects the borrower.”
- “The system automatically restructures the loan.”
- “The AI makes the final lending decision.”
- “The model knows the borrower will default.”

The prototype is explicitly **human-in-the-loop**.

---

# Product Architecture Story

```text
Data Ingestion
      ↓
Cash-Flow Forecasting
(STL decomposition + Prophet)
      ↓
Stress Detection
(RSI)
      ↓
Stress Classification
      ↓
Evidence / Explainability
      ↓
Repayment Plan Generation
      ↓
Officer Review
      ↓
Officer Decision
      ↓
Audit Event
      ↓
Outcome Monitoring
      ↓
Forecast Error
      ↓
Recalibration
      ↺
```

---

# Core Demo Scenarios

## Meena Krishnan

- Borrower ID: `BR-10482`
- Occupation: Farmer
- RSI: `34`
- Seasonal match: `87%`
- Stress state: `Seasonal Dip`
- Demonstrates: seasonal income pressure and temporary repayment adjustment

## Suresh Kumar

- Borrower ID: `BR-10921`
- Occupation: Gig Worker
- RSI: `76`
- Seasonal match: `18%`
- Stress state: `Structural Decline`
- Demonstrates: persistent decline with weak seasonal explanation and a different intervention direction

---

# Final Demo Checklist

Before presenting:

- [ ] Reset Demo
- [ ] Dashboard loads
- [ ] Meena loads
- [ ] RSI is 34
- [ ] Seasonal match is 87%
- [ ] Seasonal Dip is displayed
- [ ] Forecast renders
- [ ] Decomposition renders
- [ ] Evidence renders
- [ ] Recommendation renders
- [ ] Officer Review Required is visible
- [ ] Approve flow works
- [ ] Modify flow works
- [ ] Reject flow works
- [ ] Audit entry is created
- [ ] Suresh loads
- [ ] RSI is 76
- [ ] Seasonal match is 18%
- [ ] Structural Decline is displayed
- [ ] Monitoring loads
- [ ] Run next cycle works
- [ ] Reset Demo restores the baseline

---

# Final Message

**Cash-Flow Copilot**

> **Two income drops. Two different stories. One human decision.**

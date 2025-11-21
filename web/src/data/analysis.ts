export type StageId =
  | "introduction"
  | "diagnosis"
  | "solution"
  | "upsell"
  | "maintenance"
  | "closing"
  | "callType"
  | "salesInsights";

export interface Stage {
  id: StageId;
  title: string;
  verdict: "met" | "partial" | "missed";
  summary: string;
  notes: string[];
  timeWindow?: [number, number]; // seconds
}

export const stages: Stage[] = [
  {
    id: "introduction",
    title: "Introduction",
    verdict: "partial",
    summary:
      "Brief greeting and light small talk, but no clear name/company intro or agenda set.",
    notes: [
      "Tech greeted and asked about the day, but never stated name or company.",
      "No upfront expectation setting (what was done, what will be reviewed).",
    ],
    timeWindow: [0, 80],
  },
  {
    id: "diagnosis",
    title: "Problem Diagnosis",
    verdict: "partial",
    summary:
      "References prior work (charge performed, mold/efficiency concerns) but little active questioning during this call.",
    notes: [
      "Mentions a previous issue (below-freezing coil, mold, efficiency drop expected in 1–2 months).",
      "Did not re-verify symptoms with the customer on this call or confirm pain points.",
    ],
    timeWindow: [80, 180],
  },
  {
    id: "solution",
    title: "Solution Explanation",
    verdict: "met",
    summary:
      "Provides multiple system options with pros/cons, refrigerant updates, efficiency gains, and warranties.",
    notes: [
      "Covers like-for-like replacement, higher-efficiency gas, and heat pump options with rebates.",
      "Explains technology (inverter heat pumps), SEER improvements, and warranty terms.",
      "Tailors discussion to home constraints (ducting, attic vs closet placement).",
    ],
    timeWindow: [180, 520],
  },
  {
    id: "upsell",
    title: "Upsell Attempts",
    verdict: "met",
    summary:
      "Actively promotes higher-end heat pumps, duct sealing, and rebate-driven upgrades.",
    notes: [
      "Highlights rebates (Silicon Valley Clean Energy, TECH) to make premium options attractive.",
      "Suggests duct sealing/relocation and grill swap for quieter operation.",
      "Positions inverter heat pumps as best comfort/efficiency choice.",
    ],
    timeWindow: [520, 760],
  },
  {
    id: "maintenance",
    title: "Maintenance Plan Offer",
    verdict: "partial",
    summary:
      "Mentions matching manufacturer warranties if on the maintenance program but gives no details or close.",
    notes: [
      "States 10-year parts/compressor warranties matched when on the maintenance plan.",
      "Does not explain plan pricing, benefits, or ask for enrollment.",
    ],
    timeWindow: [430, 520],
  },
  {
    id: "closing",
    title: "Closing & Thank You",
    verdict: "partial",
    summary:
      "Ends after payment without a formal recap, next steps, or gratitude.",
    notes: [
      "Collects payment but no scheduled follow-up or install timeline confirmation.",
      "No explicit thank-you or call for future contact preferences.",
    ],
    timeWindow: [1860, 1938],
  },
  {
    id: "callType",
    title: "Call Type",
    verdict: "met",
    summary:
      "Sales-focused service follow-up for HVAC replacement options after a repair/charge visit.",
    notes: [
      "Technician had already serviced the unit and is proposing replacement/upgrade paths.",
    ],
  },
  {
    id: "salesInsights",
    title: "Sales Insights",
    verdict: "partial",
    summary:
      "Strong option framing and rebate use; missed tightening the close and maintenance conversion.",
    notes: [
      "Good: led with efficiency, rebates, noise reduction, and partnership credibility (Daikin training).",
      "Missed: no budget check, no clear next meeting/decision date, no written proposal sent on call.",
      "Opportunity: package duct sealing + maintenance plan with heat pump to lock value and reduce leakage concerns.",
    ],
  },
];

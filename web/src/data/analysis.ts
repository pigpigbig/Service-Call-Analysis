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
  checks: {
    status: "met" | "partial" | "missed";
    label: string;
    detail: string;
    timeWindow?: [number, number]; // seconds
  }[];
  timeWindow?: [number, number]; // seconds for default excerpt pull
}

export const stages: Stage[] = [
  {
    id: "introduction",
    title: "Introduction",
    verdict: "partial",
    summary:
      "Quick small talk but no explicit name/company or agenda set at the top of the call.",
    checks: [
      {
        status: "missed",
        label: "Name & company",
        detail: "Never states their name or company during the greeting.",
      },
      {
        status: "partial",
        label: "Set expectations",
        detail: "Starts with light chat and jumps into wrap-up without framing the agenda.",
        timeWindow: [0, 40],
      },
    ],
    timeWindow: [0, 80],
  },
  {
    id: "diagnosis",
    title: "Problem Diagnosis",
    verdict: "partial",
    summary:
      "References earlier findings (freeze-up, mold, efficiency drop) but does not re-verify symptoms on this call.",
    checks: [
      {
        status: "partial",
        label: "Restate issues",
        detail: "Mentions coil freezing, mold, expected efficiency decline.",
        timeWindow: [80, 130],
      },
      {
        status: "missed",
        label: "Ask probing questions",
        detail: "No fresh questions to confirm current symptoms or priorities.",
      },
    ],
    timeWindow: [80, 180],
  },
  {
    id: "solution",
    title: "Solution Explanation",
    verdict: "met",
    summary: "Clear options with pros/cons, refrigerant changes, efficiency gains, and warranties.",
    checks: [
      {
        status: "met",
        label: "Options presented",
        detail: "Like-for-like, higher-efficiency gas, and heat pump choices with pricing context.",
        timeWindow: [180, 520],
      },
      {
        status: "met",
        label: "Tech explained",
        detail: "Inverter heat pump behavior, SEER improvements, R32 refrigerant, warranty terms.",
        timeWindow: [430, 520],
      },
      {
        status: "met",
        label: "Home constraints",
        detail: "Discusses duct condition, attic vs closet placement, noise considerations.",
        timeWindow: [520, 760],
      },
    ],
    timeWindow: [180, 520],
  },
  {
    id: "upsell",
    title: "Upsell Attempts",
    verdict: "met",
    summary: "Promotes premium heat pumps, duct sealing, and rebate-backed upgrades.",
    checks: [
      {
        status: "met",
        label: "Rebates leveraged",
        detail: "Positions SVCE/TECH rebates to offset premium options.",
        timeWindow: [700, 760],
      },
      {
        status: "met",
        label: "Add-ons",
        detail: "Suggests duct sealing, attic relocation, grill swap for noise reduction.",
        timeWindow: [520, 760],
      },
    ],
    timeWindow: [520, 760],
  },
  {
    id: "maintenance",
    title: "Maintenance Plan Offer",
    verdict: "partial",
    summary: "Mentions matched warranties if on the maintenance plan but provides no plan details or close.",
    checks: [
      {
        status: "partial",
        label: "Offer mentioned",
        detail: "Notes maintenance program ties to 10-year warranty matching.",
        timeWindow: [430, 520],
      },
      {
        status: "missed",
        label: "Explain & close",
        detail: "No pricing, cadence, or enrollment ask for the maintenance plan.",
      },
    ],
    timeWindow: [430, 520],
  },
  {
    id: "closing",
    title: "Closing & Thank You",
    verdict: "partial",
    summary: "Collects payment but lacks formal recap, next steps, or gratitude.",
    checks: [
      {
        status: "partial",
        label: "Next steps",
        detail: "Reduces options to two and promises updated estimates via email.",
        timeWindow: [1760, 1850],
      },
      {
        status: "missed",
        label: "Close & thanks",
        detail: "No explicit thank-you or scheduled follow-up/decision date.",
      },
    ],
    timeWindow: [1860, 1938],
  },
  {
    id: "callType",
    title: "Call Type",
    verdict: "met",
    summary: "Sales-focused service follow-up presenting HVAC replacement/upgrade options after a repair visit.",
    checks: [
      {
        status: "met",
        label: "Type identified",
        detail: "Technician finished repair/charge and pivots to replacement/upgrade recommendations.",
        timeWindow: [10, 120],
      },
    ],
  },
  {
    id: "salesInsights",
    title: "Sales Insights",
    verdict: "partial",
    summary: "Strong framing and rebate use; missed budget check and tight close.",
    checks: [
      {
        status: "met",
        label: "Value framing",
        detail: "Highlights efficiency, rebates, noise reduction, brand credibility (Daikin training).",
        timeWindow: [180, 850],
      },
      {
        status: "missed",
        label: "Budget/urgency",
        detail: "No budget discovery or decision timeline set.",
      },
      {
        status: "missed",
        label: "Close quality",
        detail: "Relies on emailed estimates; no scheduled follow-up or maintenance upsell close.",
      },
      {
        status: "partial",
        label: "Packaging",
        detail: "Mentions duct sealing promotion; could bundle maintenance + sealing with heat pump to boost acceptance.",
        timeWindow: [430, 760],
      },
    ],
  },
];

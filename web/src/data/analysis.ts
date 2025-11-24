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
      "Checks for greeting plus clear name/company introduction.",
    checks: [
      {
        status: "met",
        label: "Greet customer",
        detail: "Opens with a greeting and casual check-in.",
        timeWindow: [0, 40],
      },
      {
        status: "missed",
        label: "Introduce self/company",
        detail: "Never states their name or company during the greeting.",
      },
    ],
    timeWindow: [0, 80],
  },
  {
    id: "diagnosis",
    title: "Problem Diagnosis",
    verdict: "partial",
    summary:
      "Minimal inquiry this call: technician references earlier findings (freeze-up, mold, expected efficiency drop) but asks no fresh questions to understand the customer’s current symptoms or concerns.",
    checks: [
      {
        status: "partial",
        label: "Restate issues",
        detail:
          "Recaps prior findings (coil freeze, mold, looming efficiency drop) without confirming with customer—shows some understanding but no fresh validation.",
        timeWindow: [80, 130],
      },
      {
        status: "missed",
        label: "Ask probing questions",
        detail: "Does not ask about current symptoms, comfort issues, or priorities during this call.",
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
    verdict: "partial",
    summary:
      "Sales-focused follow-up after a repair visit, presenting HVAC replacement/upgrade options.",
    checks: [
      {
        status: "met",
        label: "Identified as sales follow-up",
        detail: "Technician says they wrapped up work and built equipment options/replacements.",
        timeWindow: [10, 140],
      },
    ],
    timeWindow: [10, 140],
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

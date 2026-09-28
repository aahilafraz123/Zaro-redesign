// All copy and facts are sourced from zarohealth.com (see research/subpages.md).

export const LINKS = {
  getStarted: "https://zarohealth.com/pricing",
  ourTests: "https://zarohealth.com/our-tests",
  howItWorks: "https://zarohealth.com/how-it-works",
  faq: "https://zarohealth.com/faq",
  appStore: "https://apps.apple.com/app/6782261771",
  googlePlay: "https://play.google.com/store/apps/details?id=com.zarohealth.app",
  heroVideo: "https://zarohealth.com/video/zarohealth.mp4",
};

export const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Zaro Score", href: "#score" },
  { label: "Panels", href: "#panels" },
  { label: "FAQ", href: "#faq" },
];

export const STEPS = [
  {
    n: "01",
    title: "Choose a panel",
    body: "Pick how deep you want to go. Check that there’s a Quest center near your ZIP, then pay with any card, including FSA or HSA.",
    note: "About 2 minutes",
  },
  {
    n: "02",
    title: "Get your blood drawn",
    body: "Walk into one of 2,250+ Quest Diagnostics centers with a photo ID. Fast for 8–10 hours beforehand. Water and black coffee are fine.",
    note: "5–10 minute draw",
  },
  {
    n: "03",
    title: "Read your results",
    body: "Every marker lands in the Zaro app in plain language: what it measures, what your number means, and what to do if it’s out of range.",
    note: "5–7 business days",
  },
  {
    n: "04",
    title: "Follow your plan",
    body: "Your Zaro Score shows where you stand. Daily guidance, tied to your own markers, shows how to move it. Retest in 3–6 months to see the trend.",
    note: "Every day after",
  },
];

export type Panel = {
  id: "surface" | "signal" | "source";
  name: string;
  question: string;
  price: number;
  was: number;
  values: string;
  systems: number;
  badge?: string;
  summary: string;
  adds: string[];
  forWho: string;
};

export const PANELS: Panel[] = [
  {
    id: "surface",
    name: "Surface",
    question: "Has something already gone wrong?",
    price: 149,
    was: 199,
    values: "65",
    systems: 8,
    summary:
      "Your complete baseline. The markers a routine physical should check, run as one full panel.",
    adds: [
      "Full metabolic panel and complete blood count",
      "HbA1c and fasting insulin",
      "Lipid panel, ApoB and hs-CRP",
      "Thyroid (TSH), vitamin D and ferritin",
      "Complete urinalysis",
    ],
    forWho: "You’ve never had full bloodwork, or it’s been over two years.",
  },
  {
    id: "signal",
    name: "Signal",
    question: "Is something developing?",
    price: 249,
    was: 299,
    values: "97",
    systems: 10,
    badge: "Most popular",
    summary:
      "Everything in Surface, plus the early-warning markers that show problems years before a diagnosis.",
    adds: [
      "Lp(a), the inherited heart risk 1 in 5 people carry",
      "NMR particle testing, not just cholesterol mass",
      "Sex-specific hormones and morning cortisol",
      "Free T3 and T4, B12, iron, magnesium, zinc",
      "Earliest sign of kidney stress (urine albumin)",
    ],
    forWho: "Family history of heart or metabolic disease, or you train hard.",
  },
  {
    id: "source",
    name: "Source",
    question: "What’s the root cause?",
    price: 399,
    was: 449,
    values: "112",
    systems: 12,
    badge: "Most complete",
    summary:
      "Everything in Signal, plus the upstream markers that explain why your body works the way it does.",
    adds: [
      "Your Biological Age and Heart Age",
      "Full omega-3 and omega-6 profile",
      "Thyroid antibodies (TPO, thyroglobulin)",
      "Fibrinogen and ESR for hidden inflammation",
      "Insulin resistance (HOMA-IR) and thiamine",
    ],
    forWho: "Unexplained fatigue, hormonal symptoms, or you want the full picture.",
  },
];

export const SYSTEMS = [
  "Heart",
  "Metabolic",
  "Liver",
  "Blood",
  "Thyroid",
  "Kidneys",
  "Electrolytes",
  "Nutrients",
  "Hormones",
  "Stress",
  "Brain",
  "Immune",
];

export const RECOMMENDATIONS = {
  Supplements: [
    { title: "Omega-3, 2g EPA/DHA daily", marker: "Low EPA/DHA", tone: "coral" },
    { title: "Vitamin D3, 5,000 IU", marker: "Deficiency detected", tone: "coral" },
    { title: "Magnesium glycinate, 400mg", marker: "Low magnesium", tone: "sage" },
  ],
  Food: [
    { title: "Oily fish twice a week", marker: "Low omega-3 index", tone: "coral" },
    { title: "Swap refined carbs at breakfast", marker: "Fasting insulin rising", tone: "coral" },
    { title: "Leafy greens with dinner", marker: "Folate below optimal", tone: "sage" },
  ],
  Lifestyle: [
    { title: "10-minute walk after meals", marker: "HbA1c trending up", tone: "coral" },
    { title: "Lights out by 11pm", marker: "HRV down 14%", tone: "sage" },
    { title: "Morning daylight, 10 minutes", marker: "AM cortisol low", tone: "sage" },
  ],
} as const;

export const WEARABLES = [
  "Apple Watch",
  "Oura Ring",
  "WHOOP",
  "Garmin",
  "Fitbit",
  "Polar",
  "Withings",
  "COROS",
  "Suunto",
  "Samsung Galaxy Watch",
  "Google Pixel Watch",
  "Eight Sleep",
  "Dexcom",
  "Abbott Libre",
  "Levels",
  "Ultrahuman",
  "Wahoo",
  "Peloton",
  "Strava",
  "MyFitnessPal",
  "Apple Health",
  "Cronometer",
];

export const FAQ = [
  {
    q: "Do I need a doctor’s order?",
    a: "No. You order online and go straight to the lab. There’s no referral, no prior authorization and no insurance paperwork.",
  },
  {
    q: "Where do I get my blood drawn?",
    a: "At a Quest Diagnostics patient service center (2,250+ nationwide). We confirm there’s one near your ZIP code before you pay. Labcorp and BioReference are coming soon. New York and New Jersey are coming soon, and Rhode Island isn’t supported yet.",
  },
  {
    q: "How long until I get results?",
    a: "Usually 5–7 business days after your draw. Some specialized markers can take a little longer. You’ll get a notification in the app when they land.",
  },
  {
    q: "I already get a physical. Why do I need this?",
    a: "A typical annual physical checks 12–15 basic markers and flags only what’s already out of range. Zaro adds markers like ApoB, Lp(a) and fasting insulin, which can show metabolic decline up to a decade before glucose or HbA1c move. You also get optimal ranges, a score and a trend, not just “normal.”",
  },
  {
    q: "Why isn’t this covered by insurance, and is it worth it?",
    a: "Insurance generally only pays for tests needed to diagnose an existing condition, so preventive panels are treated as elective. Ordered one by one without a diagnosis, these markers can cost $400–800+ per round at cash rates. Zaro bundles them, and you can pay with FSA or HSA funds.",
  },
  {
    q: "Can I share results with my doctor?",
    a: "Yes. Export your full results as a PDF and share them with any provider. Many physicians like having detailed baseline data before a visit.",
  },
  {
    q: "What happens to my data?",
    a: "It’s encrypted at rest and in transit, and it’s never sold or shared with insurers or advertisers. You own it and can export or delete it any time from the app.",
  },
  {
    q: "Can I cancel?",
    a: "If you haven’t had your blood drawn yet, you can request a refund within 30 days of purchase, minus a processing fee. Once a draw has happened, the lab costs are already incurred.",
  },
];

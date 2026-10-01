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
  { label: "How it works", href: "/#how" },
  { label: "Panels", href: "/#panels" },
  { label: "Journal", href: "/blog" },
  { label: "Dr. Rena Malik", href: "/dr-rena-malik" },
  { label: "FAQ", href: "/#faq" },
];

export const SOCIAL = [
  { label: "Reddit", handle: "r/ZaroHealth", href: "https://www.reddit.com/r/ZaroHealth/" },
  { label: "Instagram", handle: "@zarohealth26", href: "https://www.instagram.com/zarohealth26/" },
  { label: "X", handle: "@ZaroHealth", href: "https://x.com/ZaroHealth" },
  { label: "LinkedIn", handle: "Zaro Health", href: "https://www.linkedin.com/company/zarohealth" },
  { label: "Facebook", handle: "Zaro Health", href: "https://www.facebook.com/profile.php?id=61576446315228" },
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

export type Topic = "Testing basics" | "Heart" | "Cost & FSA/HSA" | "Inside Zaro";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  topic: Topic;
  cover: { glyph: string; caption: string; tone: "teal" | "night" | "sand" | "sage" | "mist" };
  measuredIn?: "Surface" | "Signal" | "Source";
};

// Titles, dates and excerpts are Zaro’s own, from zarohealth.com/blog.
export const POSTS: Post[] = [
  {
    slug: "inside-the-cascade-model",
    title: "Inside the Cascade Model: How Zaro’s Three-Tier Testing Actually Works",
    excerpt:
      "Surface, Signal, and Source aren’t just price tiers. Each one answers a fundamentally different question about your health. Here’s how the cascade model works and why it matters.",
    date: "2026-07-27",
    topic: "Inside Zaro",
    cover: { glyph: "3", caption: "questions, three depths", tone: "teal" },
  },
  {
    slug: "how-often-should-you-get-blood-work",
    title: "How Often Should You Actually Get Blood Work Done?",
    excerpt:
      "Annual physicals check a box, but they’re not built to catch change. Here’s how often to test, and why your Zaro Score adapts as you add more data.",
    date: "2026-07-24",
    topic: "Testing basics",
    cover: { glyph: "3–6", caption: "months between panels", tone: "sand" },
    measuredIn: "Surface",
  },
  {
    slug: "what-is-lpa",
    title: "What Is Lp(a)? The Genetic Cholesterol Risk Most Blood Tests Miss",
    excerpt:
      "One in five people carry a genetic cardiovascular risk factor that a standard lipid panel will never show them. Here’s what Lp(a) is and why it’s only tested once.",
    date: "2026-07-21",
    topic: "Heart",
    cover: { glyph: "Lp(a)", caption: "1 in 5 people carry it", tone: "night" },
    measuredIn: "Signal",
  },
  {
    slug: "is-blood-testing-fsa-hsa-eligible",
    title: "Is At-Home Blood Testing FSA/HSA Eligible?",
    excerpt:
      "Yes — here’s exactly how to use your FSA or HSA card to pay for a Zaro panel, and why testing like this qualifies as an eligible medical expense.",
    date: "2026-07-18",
    topic: "Cost & FSA/HSA",
    cover: { glyph: "FSA/HSA", caption: "eligible at checkout", tone: "mist" },
  },
  {
    slug: "why-regular-blood-testing-matters",
    title: "Why Regular Blood Testing Matters More Than Your Annual Physical",
    excerpt:
      "A once-a-year snapshot misses the trend. Here’s why quarterly testing catches problems while they’re still reversible, not after they become diagnoses.",
    date: "2026-07-15",
    topic: "Testing basics",
    cover: { glyph: "12–15", caption: "markers in a typical physical", tone: "sage" },
    measuredIn: "Surface",
  },
];

export const postUrl = (slug: string) => `https://zarohealth.com/blog/${slug}`;

// Dr. Rena Malik: public facts from renamalikmd.com (see research/social-plan.md).
export const RENA = {
  name: "Dr. Rena Malik",
  headshot: "https://renamalikmd.com/wp-content/uploads/2026/04/Rena-Headshot-67-2mb-scaled.jpg",
  title: "Board-certified urologist and pelvic surgeon",
  stats: [
    { k: "550M+", v: "views on YouTube" },
    { k: "3M", v: "followers across platforms" },
    { k: "Top 10", v: "Health Influencer, Men’s Health" },
  ],
  heardOn: ["Huberman Lab", "The Diary of a CEO", "The Mel Robbins Podcast", "Shawn Ryan Show"],
  training: [
    { k: "Medical school", v: "NYU School of Medicine" },
    { k: "Residency", v: "University of Chicago" },
    { k: "Fellowship", v: "UT Southwestern Medical Center" },
    { k: "Board certification", v: "American Board of Urology" },
  ],
  honors: ["Men’s Health Top 10 Health Influencer", "GQ Top Wellness Creator Award"],
  videos: [
    { id: "oELGc7bSgS8", title: "A Urologist Explains 11 Signs of Low Testosterone Most Men Overlook" },
    { id: "SEHq1uz5Va8", title: "The Ultimate Guide to Testosterone" },
    { id: "ugHdMW2adYI", title: "Scientifically Proven Ways to Boost Your Testosterone Naturally" },
  ],
  channels: [
    { label: "YouTube", href: "https://www.youtube.com/@RenaMalikMD" },
    { label: "Instagram", href: "https://www.instagram.com/RenaMalikMD/" },
    { label: "TikTok", href: "https://www.tiktok.com/@renamalikmd" },
    { label: "Website", href: "https://renamalikmd.com/" },
  ],
};

export const HORMONE_MAP = {
  "For men": [
    { signal: "Low energy, low drive, slower recovery", markers: "Total, free and bioavailable testosterone, SHBG", panel: "Signal" },
    { signal: "Feeling run down under stress", markers: "DHEA-S and morning cortisol", panel: "Signal" },
    { signal: "Weight creeping up, energy crashes", markers: "HbA1c, fasting insulin", panel: "Surface" },
    { signal: "Cold, sluggish, foggy", markers: "TSH, free T3, free T4", panel: "Signal" },
  ],
  "For women": [
    { signal: "Cycle changes, hot flashes, poor sleep", markers: "Estradiol, LH, FSH, progesterone", panel: "Signal" },
    { signal: "Feeling run down under stress", markers: "Morning cortisol", panel: "Signal" },
    { signal: "Fatigue, hair thinning", markers: "Ferritin, full iron panel", panel: "Signal" },
    { signal: "Cold, sluggish, foggy", markers: "TSH, free T3, free T4, thyroid antibodies", panel: "Source" },
  ],
} as const;

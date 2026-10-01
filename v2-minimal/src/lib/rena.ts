// Dr. Rena Malik: public facts from renamalikmd.com (see research/social-plan.md in the repo root).
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
    { k: "Recognition", v: "Men’s Health Top 10 Health Influencer · GQ Top Wellness Creator Award" },
  ],
  videos: [
    { id: "SEHq1uz5Va8", title: "The Ultimate Guide to Testosterone" },
    { id: "oELGc7bSgS8", title: "11 Signs of Low Testosterone Most Men Overlook" },
    { id: "ugHdMW2adYI", title: "Proven Ways to Boost Testosterone Naturally" },
  ],
  channels: [
    { label: "YouTube", href: "https://www.youtube.com/@RenaMalikMD" },
    { label: "Instagram", href: "https://www.instagram.com/RenaMalikMD/" },
    { label: "TikTok", href: "https://www.tiktok.com/@renamalikmd" },
    { label: "Website", href: "https://renamalikmd.com/" },
  ],
};

export const HORMONES = {
  Men: [
    { s: "Low energy, low drive, slower recovery", m: "Total, free and bioavailable testosterone, SHBG", p: "Signal" },
    { s: "Feeling run down under stress", m: "DHEA-S, morning cortisol", p: "Signal" },
    { s: "Weight creeping up, energy crashes", m: "HbA1c, fasting insulin", p: "Surface" },
    { s: "Cold, sluggish, foggy", m: "TSH, free T3, free T4", p: "Signal" },
  ],
  Women: [
    { s: "Cycle changes, hot flashes, poor sleep", m: "Estradiol, LH, FSH, progesterone", p: "Signal" },
    { s: "Feeling run down under stress", m: "Morning cortisol", p: "Signal" },
    { s: "Fatigue, thinning hair", m: "Ferritin, full iron panel", p: "Signal" },
    { s: "Cold, sluggish, foggy", m: "TSH, free T3 and T4, thyroid antibodies", p: "Source" },
  ],
} as const;

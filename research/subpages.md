# Zaro Health: Subpage Research

Source: live site https://zarohealth.com, fetched 2026-09-28 with `curl -sL`. The pages are server-rendered Next.js, so the full copy is in the HTML; no client-only content was missing. Copy is quoted or closely paraphrased. Items marked **[computed]** are my own tallies and do not appear on the site.

---

## Global / shared elements (all subpages)

- **Nav:** Our Tests · How It Works · Pricing · Blog · About · Contact · **Get Started**
- **Footer tagline:** "Preventive health intelligence for everyone. Know your body before it tells you something is wrong."
- **Apps:** "Download on the App Store" (https://apps.apple.com/app/6782261771) · "Get it on Google Play" (https://play.google.com/store/apps/details?id=com.zarohealth.app). The site also links an app QR code at `/logos/app-qr-code.svg`.
- **Footer columns:** Product (Our Tests, How It Works, Pricing) · Company (About, Blog, FAQ, Contact) · Legal (Terms of Service `/terms`, Privacy Policy `/privacy`, HIPAA Authorization `/hipaa-authorization`)
- **Social:** Facebook (profile.php?id=61576446315228), Instagram (@zarohealth26), LinkedIn (company/zarohealth), Reddit (r/ZaroHealth), X (@ZaroHealth)
- **Footer badges:** "FSA/HSA Eligible" · "Quest Diagnostics · Labcorp & BioReference coming soon"
- **Copyright:** © 2026 Zaro Health, Inc. All rights reserved.
- **Shared closing CTA:** "Start knowing your body." / "Choose a panel, schedule your blood draw, and get answers that actually explain what is happening inside your body." Buttons: See Pricing · Explore Our Tests
- **Checkout URLs:** `/checkout?tier=surface`, `/checkout?tier=signal`, `/checkout?tier=source`
- **Twitter card tagline:** "Your body knows. Now you will too."

---

## 1. Our Tests (`/our-tests`)

**Meta description:** "Explore Zaro's three-tier blood testing framework: Surface, Signal, and Source. Learn the science behind each panel and the biomarkers that matter."

**Eyebrow:** Our Science
**H1:** "Medicine reacts. We test for answers."
**Sub:** "Most labs tell you whether you're sick. Zaro tells you what's developing, what's at the root, and how your biology is aging, so you can act years before a diagnosis."

### The Cascade Model
"No other testing platform offers all three tiers of the cascade. Each level answers a fundamentally different question about your health."

| Tier | Question | Price on this page |
|---|---|---|
| Surface | Has something already gone wrong? | $149 |
| Signal | Is something developing? | $249 |
| Source | What root causes? | $399 |

Caption: "Surface → Signal → Source: deeper understanding at each level"

This page shows only the intro prices, with no strikethrough. The standard prices appear on the Pricing page.

---

### Surface: $149
*"Has something already gone wrong?"* · CTA "Get Surface →"

**Body systems covered (8):** Heart & Vessels · Metabolic · Liver · Blood Health · Thyroid · Kidneys · Electrolytes · Nutrients

**The Science:** "Surface testing captures what has already crossed clinical thresholds. These are the markers standard medicine looks at during a routine physical, but that most people never get done as a full panel — the red flags that, caught early, prevent the most common causes of preventable death: heart disease, type 2 diabetes, thyroid dysfunction and anemia."

**Who It's For:** "Anyone who has never had comprehensive bloodwork done, adults over 25 who want a baseline, or anyone who has not had labs in over two years."

**Biomarkers Included:**

- **Metabolic Core**
  - Comprehensive Metabolic Panel — glucose, BUN, creatinine, eGFR, BUN/creatinine ratio, sodium, potassium, chloride, CO₂, calcium, total protein, albumin, globulin, A/G ratio, total bilirubin, ALP, AST, ALT (18 values)
  - CBC with Differential and Platelets — WBC, RBC, hemoglobin, hematocrit, MCV, MCH, MCHC, RDW, platelets, MPV, plus neutrophils, lymphocytes, monocytes, eosinophils and basophils as both percentage and absolute count (20 values)
  - HbA1c (glycated hemoglobin)
  - Fasting insulin
  - Uric acid
- **Heart & Lipids**
  - Lipid Panel with Reflex to Direct LDL — total cholesterol, LDL, HDL, triglycerides, non-HDL cholesterol, total/HDL ratio (6 values)
  - hs-CRP (high-sensitivity C-reactive protein)
- **Advanced Cardiometabolic**
  - ApoB (apolipoprotein B)
- **Thyroid**
  - TSH (thyroid stimulating hormone)
- **Nutrients**
  - Vitamin D (25-OH)
  - Ferritin
- **Urinalysis**
  - Complete Urinalysis with Microscopy and Reflex to Culture — color, appearance, specific gravity, pH, protein, glucose, ketones, occult blood, bilirubin, nitrite, leukocyte esterase, plus WBC and RBC per high-power field (13 values)

**[computed] Surface total:** 18 + 20 + 3 + 6 + 1 + 1 + 1 + 2 + 13 = **65 values**. The site does not state a Surface total.

**Highlights:**
- ✓ Comprehensive metabolic panel and full CBC with differential
- ✓ ApoB — the cardiovascular risk marker most annual physicals skip
- ✓ Complete urinalysis with microscopy and reflex to culture
- ✓ FSA/HSA eligible
- ✓ Results in 5–7 business days

---

### Signal: $249 (badge: "Most Popular")
*"Is something developing?"* · CTA "Get Signal →"
"Includes: Everything in Surface is included in this panel."

**Body systems covered (10):** Heart & Vessels · Metabolic · Liver · Blood Health · Thyroid · Kidneys · Electrolytes · Nutrients · Hormones · Stress & Adrenal

**The Science:** "Signal markers are the early-warning system of preventive medicine. Where Surface markers respond to disease that has already developed, these detect the conditions that lead to it. Fasting insulin rises years before HbA1c signals pre-diabetes, and NMR fractionation finds dangerous particle patterns a standard lipid panel reports as normal."

**Who It's For:** "Health optimizers, athletes, anyone with a family history of cardiovascular or metabolic disease, and anyone who has done Surface and wants to go deeper."

**What Signal Adds:**

- **Advanced Cardiometabolic**
  - Lipoprotein(a) — inherited cardiovascular risk
  - Lipoprotein Fractionation by NMR — LDL-P, small LDL-P, LDL peak size, HDL-P, HDL peak size, large VLDL-P, VLDL peak size (7 values)
  - Homocysteine
- **Hormones**
  - Testosterone — total, free and bioavailable, with SHBG, by mass spectrometry (4 values) — men
  - DHEA-S (dehydroepiandrosterone sulfate) — men
  - Estradiol (E2) — women
  - LH (luteinizing hormone) — women
  - FSH (follicle stimulating hormone) — women
  - Progesterone — women
  - Cortisol, AM — adrenal function
- **Extended Thyroid**
  - Free T3 (free triiodothyronine)
  - Free T4 (free thyroxine)
- **Nutrients**
  - Vitamin B12
  - Iron, TIBC and Ferritin Panel — iron, total iron-binding capacity, % saturation (3 values)
  - Magnesium
- **Metabolic Depth**
  - Folate, serum
  - Zinc
  - GGT (gamma-glutamyl transferase)
- **Advanced Kidney**
  - Albumin, Random Urine with Creatinine — urine albumin, urine creatinine, albumin/creatinine ratio (3 values)

**[computed]** The additions come to exactly 32 when both the men's and women's hormones are counted, which matches the site's "plus 32 markers". Any one person gets fewer because the hormones are sex-specific: men get 5 hormone values (testosterone 4 + DHEA-S) and women get 4 (E2, LH, FSH, progesterone).

**Highlights:**
- ✓ Everything in Surface, plus 32 markers
- ✓ NMR lipoprotein fractionation — particle number and size, not just cholesterol mass
- ✓ Sex-specific hormone panel plus morning cortisol
- ✓ Urine albumin/creatinine ratio — the earliest detectable sign of kidney stress
- ✓ Lp(a) — inherited cardiovascular risk carried by roughly 1 in 5 people
- ✓ FSA/HSA eligible
- ✓ Results in 5–7 business days

---

### Source: $399 (badge: "Most Comprehensive")
*"What root causes?"* · CTA "Get Source →"
"Includes: Everything in Signal is included in this panel."

**Body systems covered (12):** Heart & Vessels · Metabolic · Liver · Blood Health · Thyroid · Kidneys · Electrolytes · Nutrients · Hormones · Stress & Adrenal · Brain & Cognition · Immune

**The Science:** "Source reaches the upstream causes Signal does not capture: autoimmune thyroid activity, systemic inflammatory load, coagulation risk and the omega-3 status that shapes how you age. It is also the tier that unlocks Biological Age (PhenoAge) and Heart Age (AHA PREVENT), two independent reads on how your biology is ageing relative to your years."

**Who It's For:** "Longevity-focused members, anyone with chronic fatigue, hormonal symptoms or unresolved issues, and anyone who has completed Signal and wants root causes."

**What Source Adds:**

- **Advanced Cardiometabolic**
  - Fibrinogen activity — coagulation and inflammation risk
  - OmegaCheck — EPA, DPA, DHA, omega-3 total, omega-6 total, arachidonic acid, linoleic acid, omega-6:omega-3 ratio, AA/EPA ratio (9 values)
- **Extended Thyroid**
  - TPO antibodies (thyroid peroxidase)
  - Thyroglobulin antibodies
- **Autoimmune & Inflammation**
  - ESR (erythrocyte sedimentation rate)
- **Cognitive Risk**
  - Vitamin B1 (thiamine), whole blood by LC/MS/MS
- **Metabolic Depth**
  - HOMA-IR — insulin resistance index, calculated from fasting glucose and insulin

**[computed]** The additions total 1 + 9 + 2 + 1 + 1 + 1 = 15, which matches "plus 15 markers". **[computed] Tier totals:** Surface 65, Signal 97, Source 112 values (counting both sexes' hormones; HOMA-IR is a calculated value).

**Highlights:**
- ✓ Everything in Signal, plus 15 markers
- ✓ TPO and thyroglobulin antibodies — detects autoimmune thyroid disease
- ✓ Fibrinogen — cardiovascular risk independent of LDL
- ✓ OmegaCheck — the full omega-3 and omega-6 fatty acid profile
- ✓ ESR — systemic inflammation beyond hs-CRP
- ✓ Unlocks Biological Age (PhenoAge) and Heart Age (AHA PREVENT)
- ✓ FSA/HSA eligible
- ✓ Results in 5–7 business days

---

### "Two ages. One clock."
"Zaro calculates your Biological Age (PhenoAge), reflecting how old your body actually is based on blood chemistry, and your Heart Age using the AHA PREVENT model. Is your biology aging faster or slower than your birthday suggests?"

Example graphic: Chronological Age 38 · Biological Age 33, "5 YRS YOUNGER" (PhenoAge Model) · Heart Age 41, "3 YRS OLDER" (AHA PREVENT).
Disclaimer: "Example output · your results will reflect your actual blood data"

### Zaro Score: "A living health score, built on three pillars"
"Zaro synthesizes bloodwork, wearable signals, and lifestyle into a single score out of 100. It updates continuously and adapts to whatever data you have, no wearable required to get started."

Example: **78 / 100 Strong**

- **Layer 1 · From your bloodwork: Clinical Foundation** (PhenoAge · 10-yr CV Risk · 30-yr CV Risk)
- **Layer 2 · From Apple Health & wearables: Daily Performance** (VO2 Max · Heart Rate · HRV · Sleep). Graphic labels: Score out of 100 · 30-day trend · Biological age
- **Layer 3 · From weekly check-ins: Lifestyle** (Exercise · Nutrition · Stress · Habits)

**Score bands:** Optimal 90–100 · Strong 75–89 · Moderate 60–74 · At-Risk 40–59 · Critical <40

**Adaptive weighting: "Score adapts automatically as you add data"**
- Full data: Labs + wearable + lifestyle, giving Clinical + Performance + Lifestyle
- No wearable: Labs re-weighted with lifestyle, giving Clinical + Lifestyle
- Labs only: Biomarker Score shown, giving Clinical Foundation

No weighting percentages are published.

---

## 2. How It Works (`/how-it-works`)

**Meta description:** "Order a blood panel, schedule your draw at Quest, and get results with your Zaro Score in days. No doctor required."

**H1:** "Answers in four steps."
**Sub:** "No waiting rooms, no referrals, no insurance forms. Order online, get your blood drawn, and receive results that actually explain what they mean."

**01 · Choose your panel.** "Select Surface, Signal, or Source based on how deep you want to go. All panels are FSA/HSA eligible. You can start with Surface and add more depth over time as you track your progress."
Note: "After payment, use the secure email link to verify your identity and finish the patient details required to generate your lab order."

**02 · Schedule your blood draw.** "Visit a compatible Quest Diagnostics patient service center near you. Labcorp and BioReference are coming soon. New York and New Jersey are coming soon, and Rhode Island is not currently supported. We confirm nearby availability before payment."
Note: "Most people are fasting for at least 8–10 hours before their draw for accurate metabolic and lipid readings. We'll send you prep instructions."

**03 · We process your samples.** "Your blood is analyzed at a CLIA-certified Quest Diagnostics facility using clinical-grade equipment, the same instruments your physician uses."
Note: "Results are typically ready within 5–7 business days of your draw."

**04 · Get your results + Zaro Score.** "Results appear in the Zaro app with plain-language explanations for every biomarker: what it measures, what your value means, and what to do if it's out of range."
Note: "Your Zaro Score is calculated automatically from your results, giving you a 0–100 composite across 7 health domains. Run another panel in 3–6 months to track your progress."

**Common questions:** 13 Q&As. Their text is identical to the matching entries in the FAQ section below: doctor's order; what to bring; fasting; how long for results; abnormal results; share with doctor; FSA/HSA; Zaro Score; how often; Surface vs Signal vs Source; privacy; states; existing PCP; lab partners; cancel/refund. Link: "See all FAQs →"

---

## 3. Pricing (`/pricing`)

**Meta description:** "Choose from Surface ($149), Signal ($249), or Source ($399). All panels are FSA/HSA eligible with no doctor visit required."

**H1:** "Choose your level of understanding"
**Sub:** "All panels are one-time purchases, FSA/HSA eligible, and processed at Quest Diagnostics."

| Panel | Intro price | Standard (struck through) | Badge | Tagline |
|---|---|---|---|---|
| Surface | **$149** | $199 | — | Has something already gone wrong? |
| Signal | **$249** | $299 | Most Popular | Is something developing? |
| Source | **$399** | $449 | Most Comprehensive | What root causes? |

Each card also says "one-time · FSA/HSA eligible", "Save $50" and "**Intro pricing — standard price from Nov 14, 2026**". The CTAs are "Get Surface for $149" / "Get Signal for $249" / "Get Source for $399" plus "Learn what's included →". The bullets are the same highlight lists as on Our Tests.

**Model:** one-time purchases. There is **no subscription or membership** on the page.

**Trust strip:** FSA/HSA Eligible · Quest Diagnostics · Labcorp & BioReference coming soon · CLIA-Certified Labs · No Insurance Required · Results in 5–7 Days

**Common questions (pricing-specific wording):**
- *How do I use my FSA/HSA?* "During checkout, pay with your FSA or HSA card like any other card. Zaro's MCC code qualifies for FSA/HSA spending."
- *Where do I get my blood drawn?* A compatible Quest Diagnostics patient service center. Labcorp/BioReference are coming soon, NY/NJ are coming soon, and RI is not currently supported. "We confirm nearby availability before payment."
- *How long until I get results?* "Most results are ready in 5–7 business days from the time of your blood draw."
- *Do I need a doctor's order?* "No. Zaro is a direct-to-consumer service. You order online and go directly to the lab, no referral needed."

---

## 4. About (`/about`)

**Meta description:** "Zaro Health is built on a simple idea: your health compounds, just like an investment. Regular check-ins, small adjustments, and clear data add up to a life that stays ahead of disease."

**Eyebrow:** About Zaro Health
**H1:** "We believe, our health is our longest investment." (the comma is on the site)

**Mission copy (summary of 3 paragraphs):**
- The team describes itself as "a team of clinicians, researchers, and health-obsessed builders". Its belief is that managing your biology consistently today prevents managing a crisis tomorrow.
- Healthcare is compared to a long-term investment. Ignored, the "compounding costs (physical, financial, emotional)" become catastrophic. Attended to with the right data, it lets you "show up fully for the moments that matter" (trips, milestone dinners, "the ordinary Tuesdays") instead of watching from a hospital bed.
- That future "is not luck, and it is not reserved for the privileged or the genetically gifted. It is built one check-in at a time… before anything goes wrong."

**Comparison: two models**

| The current model: "React to crisis" | The Zaro model: "Compound your health" |
|---|---|
| Symptoms appear, then you act | Quarterly checks before anything goes wrong |
| Annual visit, 12-15 basic markers | Bloodwork, wearable data, one living score |
| No trend data, no continuity | Trends over time, not one-off snapshots |
| Expensive treatment after the damage is done | Small adjustments early, before costs compound |
| Hospitalization, medication, chronic management | Stay ahead of disease instead of treating it |

"The difference between these two paths is not luck or genetics. It is information, available early enough to act on. That is what Zaro provides."

**"Four habits that compound into a healthier life"**
1. **Check Regularly:** quarterly bloodwork plus wearable data give "a dashboard that updates continuously."
2. **Adjust Deliberately:** the Zaro Score "identifies exactly which systems are drifting and by how much." "Rebalance early, not in a crisis."
3. **Stay Transparent:** every biomarker is explained in plain language, with "no gatekeeping, no jargon." "It belongs to you."
4. **Act With Context:** "Zaro ties every recommendation to your actual numbers… not a population average."

**Clinical Leadership: "Every result is grounded in real clinical expertise"**
- **Rajesh, MD: Medical Director.** No surname is given on the page. "MD, Board Certified Physician (ABFM), Family Medicine. Rajesh oversees the clinical accuracy of every Zaro panel and reviews the health content published on this site."
- Quote: "We believe the future of health is not about treating disease. It is about never getting there. The same compounding that builds wealth builds health. Zaro is the account statement nobody gave you."

**Founders / other team members: NOT on the page.** No founder names, headcount, location, funding or founding year are given.

**Our Values: "How we think"**
- **Preventive over reactive:** "We optimize for the 10-year-earlier version of every problem." Disease "has usually been building for a decade, quietly visible in bloodwork the whole time."
- **Consistency over intensity:** "Four quarterly check-ins beat one heroic annual panel… The power is in the trend, not the single data point."
- **Transparency as default:** "Your data is yours… downloadable, exportable, always accessible. No paywalls on your own health."
- **Access without gatekeepers:** "FSA/HSA eligible. No referral required. No insurance maze. CLIA-certified labs." Preventive health "should not require a specialist, a high deductible, or a six-week wait."

---

## 5. FAQ (`/faq`)

**Meta description:** "Answers to common questions about Zaro Health panels, pricing, insurance, privacy, and how testing works, all in one place."

**H1:** "Common questions"
**Sub:** "Everything about getting started, testing and results, pricing and insurance, privacy, and Zaro itself, all in one place."

### Getting Started
- **Do I need a doctor's order or prescription?** No. Zaro is direct-to-consumer: you order online and go to the lab with "no physician referral or prior authorization."
- **What do I need to bring to the lab?** "Bring a valid photo ID and follow the instructions in your Zaro portal. Your lab order is generated after payment, email verification, and completion of the required patient details. Most draws take 5 to 10 minutes."
- **Do I need to fast?** "Yes, we recommend fasting for at least 8 to 10 hours before your draw for accurate glucose, insulin, and lipid results. Water and black coffee are fine."
- **Where do I get my blood drawn?** At a compatible Quest Diagnostics patient service center. Labcorp and BioReference are coming soon, New York and New Jersey are coming soon, and Rhode Island is not currently supported. "We confirm nearby availability before payment."

### Testing & Results
- **How long until results?** "typically ready within 5 to 7 business days from your blood draw. Some specialized markers may take slightly longer."
- **Abnormal results?** The app explains each result "including what levels are optimal, what yours means, and when to consult a physician. We always recommend speaking with your doctor about any values of concern."
- **Share with my doctor?** "Yes. You can export your full results as a PDF and share them directly with any healthcare provider."
- **What does the Zaro Score measure?** "a 0 to 100 composite built from up to 7 health domains: metabolic function, cardiovascular markers, inflammation, hormones, nutrient status, organ health, and longevity indicators."
- **How often?** "every 3 to 6 months, especially when you are making changes to diet, supplements, exercise, or sleep. Annual testing is a good baseline…"
- **Surface vs Signal vs Source?** "Surface is our foundational panel covering the most important metabolic, lipid, and inflammatory markers… Signal adds depth with hormones, thyroid function, and key micronutrients. Source is our most comprehensive panel, including advanced cardiovascular risk markers, longevity biomarkers, and a full hormone profile." (See Inconsistencies: this answer does not match the Our Tests lists.)

### Pricing & Insurance
- **FSA/HSA:** "enter your FSA or HSA card like any other payment card. Zaro qualifies as an eligible FSA/HSA expense."
- **Cancel / refund:** "If you have not yet scheduled your blood draw, you can request a refund within 30 days of purchase minus a processing fee. Once a lab order has been generated and a draw has occurred, we are unable to issue a refund as the lab costs have already been incurred." The processing fee amount is not stated.
- **Why isn't Zaro covered by insurance?** Insurance only pays for testing that is "medically necessary to diagnose or treat a specific, existing condition". Longevity/performance tracking counts as "elective wellness testing", which insurers generally exclude.
- **Which biomarkers won't insurance typically cover?** The answer names advanced cardiovascular markers (ApoB, Lp(a), NMR lipid particle fractionation), early metabolic and inflammation signals (fasting insulin, hs-CRP), full hormone panels (testosterone, estradiol, DHEA-S, LH, FSH) "plus the Omega-3 Index". It attributes all of these to "Signal and Source".
- **Why do I need Zaro if I get an annual physical?** "An annual physical is reactive… Zaro is proactive." It names three upgrades: ApoB and Lp(a); fasting insulin, which "can catch metabolic decline up to a decade before it shows up in glucose or HbA1c"; and an "optimal-range 0–100 Zaro Score with trends tracked over time, instead of just a binary 'normal' flag."
- **Expensive compared to insurance-covered testing?** A "$0" physical can climb once deductibles and hospital facility fees apply. "Independent cash-pay lab testing is typically more affordable than what you'd actually pay through insurance billing without full coverage."
- **Compared to ordering tests individually?** Without a diagnosis, insurance "would likely deny coverage, leaving you paying diagnostic cash rates that can total **$400–800+ per round**." Bundling "brings the effective cost per marker down."

### Privacy & Trust
- **Private and secure?** "encrypted at rest and in transit and is never sold to third parties or shared with insurers. You own your results. You can export or delete your data at any time from the Zaro app."
- **Is my data safe?** "We do not sell or share your health data with third parties for advertising. Sensitive clinical data, including lab orders, results, and wearable biometrics, is handled under a **HIPAA Authorization framework** covering you, Zaro, and clinical partners like Quest Diagnostics. Your account and lab orders are also protected by secure email identity verification."

### About Zaro
- **States:** "available in many US states through our Quest Diagnostics network. New York and New Jersey are coming soon, and Rhode Island is not currently supported. We confirm compatible nearby testing using your ZIP code before payment."
- **Existing PCP?** "Absolutely." Results export as PDF, and "many physicians appreciate having detailed baseline data before a visit."
- **Lab partners:** "All samples are currently processed at CLIA-certified Quest Diagnostics facilities using the same clinical-grade instruments used in hospital settings. Labcorp and BioReference are coming soon." Availability is confirmed by testing ZIP code at checkout.
- **Why no national media advertising?** The page gives four reasons. Zaro is "capital-efficient rather than funded by a massive ad budget". Every signup needs real lab logistics, so mass ads "don't scale profitably yet". It grows through "targeted partnerships, like corporate wellness perks and referrals from trainers and functional medicine practitioners". Because testing needs a nearby partner lab, growth stays "concentrated around specific launch markets for now."

---

## 6. Blog (`/blog`)

**H1:** "Learn how to read your own biology"
**Sub:** "Practical, science-grounded guides on blood testing, biomarkers, and how to actually use your results."

| Date | Title | Slug |
|---|---|---|
| July 27, 2026 | Inside the Cascade Model: How Zaro's Three-Tier Testing Actually Works | `/blog/inside-the-cascade-model` |
| July 24, 2026 | How Often Should You Actually Get Blood Work Done? | `/blog/how-often-should-you-get-blood-work` |
| July 21, 2026 | What Is Lp(a)? The Genetic Cholesterol Risk Most Blood Tests Miss | `/blog/what-is-lpa` |
| July 18, 2026 | Is At-Home Blood Testing FSA/HSA Eligible? | `/blog/is-blood-testing-fsa-hsa-eligible` |
| July 15, 2026 | Why Regular Blood Testing Matters More Than Your Annual Physical | `/blog/why-regular-blood-testing-matters` |

There are 5 posts in total, all from July 2026. Post bodies were not fetched (out of scope).

---

## 7. Contact (`/contact`)

**Eyebrow:** Get in Touch
**H1:** "We are here to help"
**Copy:** "Have a question about your results, your order, or how Zaro works? Send us a message and our team will get back to you within two to five business days."

- **Contact method:** a web form only, with Name*, Email* and "How can we help?"* fields and a "Send message" button. It is protected by reCAPTCHA.
- **Email / phone / address: NOT on the page.** The HTML has no mailto or tel links.
- The meta description ("we will get back to you promptly") is vaguer than the on-page "two to five business days".

---

## Inconsistencies and gaps worth noting for the redesign

1. **Biomarker count.** The homepage says "150+ biomarkers tracked". The Our Tests lists add up to about 112 values for Source [computed], including calculated ratios and both sexes' hormones.
2. **Which tier unlocks Bio Age / Heart Age.** The homepage says "EXCLUSIVE TO SIGNAL AND SOURCE PANELS". Our Tests and Pricing say Source unlocks Biological Age (PhenoAge) and Heart Age (AHA PREVENT).
3. **Zaro Score model.** The FAQ, How It Works and homepage say "7 health domains" (metabolic, cardiovascular, inflammation, hormones, nutrient status, organ health, longevity). Our Tests says "three pillars/layers" (Clinical Foundation, Daily Performance, Lifestyle) with adaptive weighting.
4. **The FAQ's tier descriptions don't match the panel lists.**
   - It says Source includes "a full hormone profile", but the hormones are in Signal.
   - It says "Signal and Source add" ApoB, fasting insulin and hs-CRP, but all three are in Surface.
   - It says "Omega-3 Index", but the panel lists OmegaCheck.
   - It says Surface covers "inflammatory markers", but Surface has only hs-CRP.
5. **Intro pricing isn't consistent.** Our Tests shows only $149/$249/$399 with no strikethrough. Pricing and the homepage show $199/$299/$449 struck through, with "standard price from Nov 14, 2026".
6. **Blog wording.** The FSA/HSA post title says "At-Home Blood Testing", but draws happen in person at Quest patient service centers. No at-home option is mentioned anywhere else.
7. **Missing trust info.** The only named person is "Rajesh, MD" (first name only). There are no founders, no testimonials or reviews, no press, no published privacy certifications beyond the "HIPAA Authorization framework", and no contact email.
8. **Refund.** The processing fee amount is not stated. The policy is refundable within 30 days only if no draw is scheduled, and not refundable after a lab order and draw.

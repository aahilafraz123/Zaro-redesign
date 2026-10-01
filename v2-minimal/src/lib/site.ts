// Paths that respect the GitHub Pages base (/Zaro-redesign/minimal/) and trailing slashes.
export const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const url = (path = "") => `${base}${path.replace(/^\//, "")}`;

export const BUY = "https://zarohealth.com/pricing";

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

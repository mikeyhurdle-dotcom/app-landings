import Script from "next/script";

const ACCOUNT = process.env.NEXT_PUBLIC_TEALIUM_ACCOUNT;
const PROFILE = process.env.NEXT_PUBLIC_TEALIUM_PROFILE;
const ENVIRONMENT = process.env.NEXT_PUBLIC_TEALIUM_ENVIRONMENT ?? "dev";

// Inline script that runs before utag.js loads, so the auto-fired page-view
// tag in TiQ sees a populated data layer. Keep it tiny and dependency-free —
// this is injected into every page in the head.
const seedScript = `
(function(){
  try {
    var path = window.location.pathname || "/";
    var seg = path.split("/").filter(Boolean)[0] || "";
    var brandList = ["mewstro","bouldy","purrouette","teacher"];
    var brand = brandList.indexOf(seg) >= 0 ? seg : "root";
    var pageType = "other";
    if (path === "/") pageType = "landing";
    else if (/\\/(apply|teachers\\/apply)$/.test(path)) pageType = "apply";
    else if (/\\/story$/.test(path)) pageType = "story";
    else if (/\\/privacy$/.test(path)) pageType = "privacy";
    else if (/\\/support$/.test(path)) pageType = "support";
    else if (path === "/teacher/login") pageType = "login";
    else if (path.indexOf("/teacher") === 0) pageType = "dashboard";
    var params = new URLSearchParams(window.location.search);
    var consent = "pending";
    try {
      var stored = localStorage.getItem("tealium_consent");
      if (stored === "granted") consent = "granted";
      else if (stored === "denied") consent = "denied";
    } catch (e) { /* ignore */ }
    window.utag_data = Object.assign(window.utag_data || {}, {
      brand: brand,
      page_type: pageType,
      page_path: path,
      page_url: window.location.href,
      referrer: document.referrer || "",
      consent_status: consent,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || ""
    });
  } catch (e) { /* never break the page */ }
})();
`;

export function TealiumScript() {
  if (!ACCOUNT || !PROFILE) {
    // No-op when env vars aren't set (local dev without Tealium configured).
    return null;
  }
  const src = `https://tags.tiqcdn.com/utag/${ACCOUNT}/${PROFILE}/${ENVIRONMENT}/utag.js`;
  return (
    <>
      <Script
        id="tealium-udo"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: seedScript }}
      />
      <Script id="tealium-utag" src={src} strategy="afterInteractive" />
    </>
  );
}

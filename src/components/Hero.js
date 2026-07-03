import siteData from "../data/site-data.json";

async function getImageOverrides() {
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SECRET_KEY;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
  if (!SB_URL || !SB_KEY || !PROJECT_ID) return {};
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/site_images?project_id=eq.${PROJECT_ID}&select=image_key,url`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }, cache: "no-store" }
    );
    const rows = await res.json();
    const map = {};
    (rows || []).forEach((r) => { map[r.image_key] = r.url; });
    return map;
  } catch {
    return {};
  }
}

export default async function Hero() {
  const { restaurant, content, images: defaultImages } = siteData;
  const overrides = await getImageOverrides();
  const images = { ...defaultImages, ...overrides };

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {images.hero ? (
        <>
          <img
            src={images.hero}
            alt={restaurant.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: "heroZoom 12s ease-out forwards" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-coffee via-terradark to-terra" />
      )}

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-cream">
        <div
          className="flex items-center justify-center gap-4"
          style={{ animation: "fadeUp 0.9s ease-out both" }}
        >
          <span className="h-px w-12 bg-sand/60" />
          <p className="text-xs uppercase tracking-[0.4em] text-sand">
            {restaurant.cuisine || restaurant.tagline}
          </p>
          <span className="h-px w-12 bg-sand/60" />
        </div>

        <h1
          className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-7xl"
          style={{ animation: "fadeUp 0.9s ease-out 0.15s both" }}
        >
          {content.welcomeHeading || restaurant.name}
        </h1>

        <div
          className="mx-auto mt-6 h-0.5 w-20 bg-terra"
          style={{ animation: "fadeUp 0.9s ease-out 0.3s both" }}
        />

        {content.welcomeSubtext && (
          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/85"
            style={{ animation: "fadeUp 0.9s ease-out 0.4s both" }}
          >
            {content.welcomeSubtext}
          </p>
        )}

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: "fadeUp 0.9s ease-out 0.55s both" }}
        >
          <a
            href="#speisekarte"
            className="rounded-full bg-terra px-9 py-3.5 font-semibold text-cream shadow-lg shadow-terra/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terradark hover:shadow-xl"
          >
            Zur Speisekarte
          </a>
          <a
            href="#kontakt"
            className="rounded-full border border-cream/40 px-9 py-3.5 font-semibold text-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cream hover:bg-cream/10"
          >
            Kontakt
          </a>
        </div>
      </div>

      <a
        href="#ueber-uns"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/80"
        style={{ animation: "bounceDown 2s ease-in-out infinite" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

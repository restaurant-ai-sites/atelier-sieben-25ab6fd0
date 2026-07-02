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
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {images.hero ? (
        <>
          <img
            src={images.hero}
            alt={restaurant.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-coffee/55" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-coffee via-terradark to-terra" />
      )}

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-cream">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sand">
          {restaurant.cuisine && `${restaurant.cuisine} · `}
          {restaurant.tagline}
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
          {content.welcomeHeading || restaurant.name}
        </h1>
        {content.welcomeSubtext && (
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/90">
            {content.welcomeSubtext}
          </p>
        )}
        <a
          href="#speisekarte"
          className="mt-8 inline-block rounded-full bg-terra px-8 py-3 font-semibold text-cream shadow-lg transition-colors hover:bg-terradark"
        >
          Zur Speisekarte
        </a>
      </div>
    </section>
  );
}

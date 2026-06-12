import siteData from "../data/site-data.json";

export default function Hero() {
  const { restaurant, content, images } = siteData;

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      {images.hero ? (
        <>
          <img
            src={images.hero}
            alt={restaurant.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-coffee via-terradark to-terra" />
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-40">
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
          {restaurant.cuisine || restaurant.tagline}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl font-bold leading-[0.95] text-white sm:text-8xl">
          {content.welcomeHeading || restaurant.name}
        </h1>
        {content.welcomeSubtext && (
          <p className="mt-6 max-w-xl text-xl text-white/85">
            {content.welcomeSubtext}
          </p>
        )}
        <a
          href="#speisekarte"
          className="mt-10 inline-block bg-terra px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-terradark"
        >
          Speisekarte entdecken
        </a>
      </div>
    </section>
  );
}

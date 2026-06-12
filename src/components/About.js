import siteData from "../data/site-data.json";

export default function About() {
  const { restaurant, images } = siteData;
  const bandImage = images.interior || images.food || images.exterior;

  return (
    <>
      <section id="ueber-uns" className="mx-auto max-w-4xl px-4 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-terra">Unsere Geschichte</p>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Über uns</h2>
        <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-coffee/80">
          {restaurant.about}
        </p>
      </section>

      {bandImage && (
        <img
          src={bandImage}
          alt={`${restaurant.name} — Einblick`}
          className="h-[60vh] w-full object-cover"
        />
      )}
    </>
  );
}

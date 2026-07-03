import siteData from "../data/site-data.json";

const links = [
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand/60 bg-cream/80 shadow-sm shadow-coffee/5 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          {siteData.restaurant.name}
        </a>
        <ul className="flex items-center gap-5 text-sm sm:gap-8 sm:text-base">
          {links.map((link, i) => (
            <li key={link.href}>
              {i === links.length - 1 ? (
                <a
                  href={link.href}
                  className="rounded-full bg-terra px-5 py-2 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-terradark hover:shadow-md"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className="relative py-1 transition-colors hover:text-terra after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-terra after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

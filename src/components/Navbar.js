import siteData from "../data/site-data.json";

const links = [
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          {siteData.restaurant.name}
        </a>
        <ul className="flex gap-5 text-sm sm:gap-8 sm:text-base">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-terra transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

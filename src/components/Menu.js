import siteData from "../data/site-data.json";

async function getMenuData() {
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SECRET_KEY;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
  if (!SB_URL || !SB_KEY || !PROJECT_ID) return { sections: null, speisekarte: null };
  const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };
  try {
    const [secRes, itemRes, imgRes] = await Promise.all([
      fetch(`${SB_URL}/rest/v1/menu_sections?project_id=eq.${PROJECT_ID}&select=id,name&order=created_at.asc`, { headers, cache: "no-store" }),
      fetch(`${SB_URL}/rest/v1/menu_items?project_id=eq.${PROJECT_ID}&select=id,section_id,name,description,price&order=created_at.asc`, { headers, cache: "no-store" }),
      fetch(`${SB_URL}/rest/v1/site_images?project_id=eq.${PROJECT_ID}&image_key=eq.speisekarte&select=url`, { headers, cache: "no-store" }),
    ]);
    const secs = await secRes.json();
    const items = await itemRes.json();
    const imgs = await imgRes.json();
    const sections = (secs || []).length > 0
      ? (secs || []).map((s) => ({ ...s, items: (items || []).filter((i) => i.section_id === s.id) }))
      : null;
    const speisekarte = imgs?.[0]?.url || null;
    return { sections, speisekarte };
  } catch { return { sections: null, speisekarte: null }; }
}

function MenuItem({ item }) {
  if (typeof item === "string") return <li className="py-2">{item}</li>;
  return (
    <li className="flex items-baseline justify-between gap-4 py-3">
      <div>
        <p className="font-semibold">{item.name}</p>
        {item.description && <p className="text-sm text-coffee/70">{item.description}</p>}
      </div>
      {item.price && <span className="shrink-0 font-semibold text-terra">{item.price}</span>}
    </li>
  );
}

export default async function Menu() {
  const { sections: dbSections, speisekarte } = await getMenuData();
  const sections = dbSections ?? (Array.isArray(siteData.menu) ? siteData.menu : []);
  const foodImage = speisekarte || siteData.images?.food;

  if (sections.length === 0 && !foodImage) return null;

  return (
    <section id="speisekarte" className="bg-sand/50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Speisekarte</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-terra" />

        {foodImage && (
          <img src={foodImage} alt="Unsere Gerichte"
            className="mt-10 h-64 w-full rounded-2xl object-cover shadow-lg" />
        )}

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <div key={section.id || i}>
              <h3 className="font-display text-xl font-bold text-terradark">
                {section.title || section.name || `Kategorie ${i + 1}`}
              </h3>
              <ul className="mt-3 divide-y divide-coffee/10">
                {(section.items || []).map((item, j) => (
                  <MenuItem key={item.id || j} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

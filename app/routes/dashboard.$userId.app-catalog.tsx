import AppCatalogCard from "~/components/app-catalog-card";
import { TbBrandVite } from "react-icons/tb";

export default function AppCatalog() {
  const iconStyling= {size:50};
  const apps = [{ name: "React + Vite", icon: <TbBrandVite  size={iconStyling.size} /> }];
  return (
    <div>
      <h1 className="text-xl font-">
        Welcome Chiyembekezo What would you like to deploy today
      </h1>
      <section className="grid grid-cols-3 mt-14">
        {apps.map((app) => (
          <article key={app.name}>
            <AppCatalogCard details={{ name: app.name, icon: app.icon }} />
          </article>
        ))}
      </section>
    </div>
  );
}

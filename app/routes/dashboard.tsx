import NavLinks from "~/components/navigation-links";
import { Outlet } from "@remix-run/react";
export default function Dashboard() {
  return (
    <main className="h-dvh grid grid-cols-[0.4fr_2fr]">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4">
        <div>
          <p className="font-extrabold text-2xl px-4">
            SCARLET<span className="text-rose-600">Deploy</span>
          </p>

          <section className="mt-8">
            <NavLinks />
          </section>
        </div>
      </section>
      <section className="text-white font-bold text-2xl p-6 text-center">
        <Outlet />
      </section>
    </main>
  );
}

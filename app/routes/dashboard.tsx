import NavLinks from "~/components/navigation-links";
import { Outlet } from "@remix-run/react";
import { SignedIn, UserButton } from "@clerk/remix";

export default function Dashboard() {
  return (
    <SignedIn>
      <main className="h-dvh grid-rows-[1fr_0.1fr] grid md:grid-cols-[0.4fr_2fr]">
        <section className="md:h-dvh bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 md:p-8 flex justify-center items-center md:block">
          <div>
            <p className="font-extrabold text-2xl px-4 hidden md:block">
              SCARLET<span className="text-rose-600">Deploy</span>
            </p>

            <section className="md:mt-8">
              <NavLinks />
            </section>
          </div>
        </section>
        <section className="text-white font-bold text-2xl p-6 text-center overflow-y-scroll row-start-1 md:row-start-auto">
          <div className="flex justify-end">
            <UserButton
              showName
              appearance={{
                elements: { userButtonOuterIdentifier: "text-white text-md" },
              }}
            />
          </div>
          <Outlet />
        </section>
      </main>
    </SignedIn>
  );
}

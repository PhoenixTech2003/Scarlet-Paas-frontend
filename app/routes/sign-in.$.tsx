import { SignIn } from "@clerk/remix";
export default function SignInPage() {
  return (
    <main className="h-dvh grid grid-cols-[1fr_2fr]">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 grid justify-center items-center">
        <p className="text-white font-extrabold text-4xl">
          SCARLET<span className="text-rose-600">Deploy</span>
        </p>
      </section>
      <section className="justify-self-center self-center">
        <SignIn />
      </section>
    </main>
  );
}

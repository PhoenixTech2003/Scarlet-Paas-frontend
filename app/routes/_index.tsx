import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-gradient-to-r from-slate-950 to-slate-700">
      <nav className="flex justify-between items-center p-6">
        <p className="text-white font-extrabold text-3xl">
          SCARLET<span className="text-rose-600">Deploy</span>
        </p>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="bg-slate-700 text-white border-2"
          >
            Sign Up
          </Button>
          <Button className="bg-rose-700">Log In</Button>
        </div>
      </nav>
      <main className=" h-[90dvh] grid justify-center items-center">
        <div className="">
          <p className="text-white text-4xl ">
            Deployment made easy with a few clicks with{" "}
            <span className="font-extrabold">SCARLET</span>
            <span className="text-rose-600 font-extrabold">Deploy</span>
          </p>
          <div className="flex justify-center mt-8">
            <Link to={"/"}>
              <Button className="font-extrabold bg-rose-600 text-white">
                Lets Deploy
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

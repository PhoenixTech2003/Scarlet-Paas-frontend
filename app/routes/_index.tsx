import type { MetaFunction, LoaderFunction} from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Link } from "@remix-run/react";
import { getAuth } from '@clerk/remix/ssr.server'
import { redirect } from "@remix-run/node";

import { SignedOut, SignInButton, SignUpButton} from "@clerk/remix";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader:LoaderFunction = async(args)=>{
  const {userId} = await getAuth(args)
  if(userId){
    return redirect(`/dashboard/${userId}/app-catalog`)
  }
    return {}
}


export default function Index() {
  return (
    <SignedOut>
    <div className="bg-gradient-to-r from-slate-950 to-slate-700 p-4">
      <nav className="flex justify-between items-center gap-4 p-6">
        <p className="text-white font-extrabold text-base md:text-3xl">
          SCARLET<span className="text-rose-600">Deploy</span>
        </p>
        <div className="flex gap-4">
          <SignUpButton>

          <Button
            variant={"outline"}
            className="bg-slate-700 text-white border-2"
          >
            Sign Up
          </Button>

          </SignUpButton>
          <SignInButton><Button className="bg-rose-600">Sign In</Button></SignInButton>
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
            <Link to={"/sign-in"}>
              <Button className="font-extrabold bg-rose-600 text-white">
                Lets Deploy
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>


    </SignedOut>
  );
}

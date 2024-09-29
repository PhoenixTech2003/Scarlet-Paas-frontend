import AppCatalogCard from "~/components/app-catalog-card";
import { TbBrandVite } from "react-icons/tb";

import { getAuth } from "@clerk/remix/ssr.server";
import {
  redirect,
  LoaderFunction,
  json,
  ActionFunctionArgs,
} from "@remix-run/node";
import { getUserDetails, postDeployment } from "~/lib/data";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { MdErrorOutline } from "react-icons/md";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const userDetails = await getUserDetails(args.params.userId);
  return json({ userDetails });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const data = new FormData();
  data.append("id", params.userId || "");
  for (const [key, value] of formdata.entries()) {
    data.append(key, value);
  }

  const response = await (await postDeployment(data)).data;
  const userId = response.userId;
  const deployemntId = response.deploymentId;
  return redirect(`/dashboard/${userId}/deployments/${deployemntId}`);
};

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main>
      <section className="grid items-center h-[60dvh] md:px-16">
        <article className="bg-gradient-to-r from-rose-400 to-rose-800 py-16 rounded-md">
          <p className="flex justify-center"><MdErrorOutline size={70}/></p>
          
          <p>Oh oh something went wrong</p>
          <p className="font-normal mt-4 text-base md:text-xl">
            ERROR: {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <p className="font-normal text-base md:text-xl">Please refresh the page and if the error persists contact support</p>
        </article>
      </section>
    </main>
  );
}

export default function AppCatalog() {
  const { userDetails } = useLoaderData<typeof loader>();
  const iconStyling = { size: 50 };
  const apps = [
    { name: "React + Vite", icon: <TbBrandVite size={iconStyling.size} /> },
    
  ];
  return (
    <div>
      <h1 className="text-xl font-">
        Welcome {userDetails.firstname} What would you like to deploy today
      </h1>
      <section className="grid justify-center md:grid-cols-3 mt-14">
        {apps.map((app) => (
          <article key={app.name}>
            <AppCatalogCard details={{ name: app.name, icon: app.icon }} />
          </article>
        ))}
      </section>
    </div>
  );
}

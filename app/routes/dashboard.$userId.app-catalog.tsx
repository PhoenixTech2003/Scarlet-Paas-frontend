import AppCatalogCard from "~/components/app-catalog-card";
import { TbBrandVite } from "react-icons/tb";
import { FaNode } from "react-icons/fa";
import { getAuth } from '@clerk/remix/ssr.server'
import { redirect, LoaderFunction, json, ActionFunctionArgs } from "@remix-run/node";
import { getUserDetails } from "~/lib/data";
import { useLoaderData } from "@remix-run/react";
import { postDeployment } from "~/lib/data";


export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    return redirect('/sign-in')
  }
  const userDetails = await getUserDetails(args.params.userId)
  return json({userDetails})
}

export const action = async ({params, request}:ActionFunctionArgs)=>{
  const formdata = await request.formData();
  const data = new FormData();
  data.append('id', params.userId || '');
  for (const [key, value] of formdata.entries()) {
    data.append(key, value);
  }

  console.log(data)
  await postDeployment(data)
  return null
}

export default function AppCatalog() {
  const {userDetails} = useLoaderData<typeof loader>()
  const iconStyling= {size:50};
  const apps = [{ name: "React + Vite", icon: <TbBrandVite  size={iconStyling.size} /> }, {name:"Nodejs", icon:<FaNode size={60}/>}];
  return (
    <div>
      <h1 className="text-xl font-">
        Welcome {userDetails.firstname} What would you like to deploy today
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

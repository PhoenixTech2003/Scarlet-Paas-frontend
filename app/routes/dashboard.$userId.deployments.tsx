import { LoaderFunctionArgs } from "@remix-run/node";
import { getDeployments } from "~/lib/data";
import { Link, useRouteError, json, useLoaderData } from "@remix-run/react";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { Badge } from "~/components/ui/badge";
import { MdErrorOutline } from "react-icons/md";
import { Deployment } from "~/lib/definitions";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.userId !== undefined) {
    const userDeployments = await getDeployments(params.userId);

    return json({ userDeployments });
  }
  return json({ userDeployments: [] });
};

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main>
      <h1>Deployments</h1>
      <section className="grid items-center h-[60dvh] md:px-16">
        <article className="bg-gradient-to-r from-rose-400 to-rose-800 py-16 rounded-md">
          <p className="flex justify-center">
            <MdErrorOutline size={70} />
          </p>

          <p>Oh oh something went wrong</p>
          <p className="font-normal mt-4 text-base md:text-xl">
            ERROR: {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <p className="font-normal text-base md:text-xl">
            Please refresh the page and if the error persists contact support
          </p>
        </article>
      </section>
    </main>
  );
}

export default function Deployments() {
  const { userDeployments } = useLoaderData<typeof loader>();

  return (
    <section className="text-white ">
      <h1>Deployments</h1>
      {userDeployments.map((deployment: Deployment) => {
        return (
          <Link
            className="hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-800 mt-8 justify-around rounded-xl bg-gradient-to-r flex items-center  from-slate-900 to-slate-800 py-24 px-4"
            key={deployment.id}
            to={`/dashboard/${deployment.userId}/deployments/${deployment._id}`}
          >
            <div>
              <AiOutlineDeploymentUnit size={70} />
            </div>
            <article key={deployment._id}>
              <p className="font-bold">
                App Name{" "}
                <span className="font-medium">{deployment.app_name}</span>
              </p>
              <p className="flex items-center gap-4">
                Status{" "}
                <Badge
                  className={`${
                    deployment.status === "Running"
                      ? "bg-green-500"
                      : deployment.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                >
                  {deployment.status}
                </Badge>{" "}
              </p>
            </article>
          </Link>
        );
      })}
    </section>
  );
}

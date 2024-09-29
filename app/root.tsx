import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { MdErrorOutline } from "react-icons/md";

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-r  from-slate-900 to-slate-800 py-24 px-4 text-white">
        <main>
          <section className="grid items-center h-[70dvh] md:px-16">
            <article className="bg-gradient-to-r from-rose-400 to-rose-800 py-16 rounded-md">
              <p className="flex justify-center">
                <MdErrorOutline size={70} />
              </p>

              <p className="text-center text-2xl font-bold">
                Oh oh something went wrong
              </p>
              <p className="font-normal mt-4 text-xl text-center">
                ERROR: {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <p className="font-normal text-xl mt-4 text-center">
                Please refresh the page and if the error persists contact
                support
              </p>
            </article>
          </section>
        </main>
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-900  h-dvh">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default ClerkApp(App, {
  signInFallbackRedirectUrl: "/",
  signUpFallbackRedirectUrl: "/",
});

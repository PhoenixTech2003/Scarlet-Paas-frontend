import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { ClerkApp} from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'

export const loader: LoaderFunction = (args) => rootAuthLoader(args)

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



export default ClerkApp(App,{
  signInFallbackRedirectUrl:"/",
  signUpFallbackRedirectUrl: "/",
})
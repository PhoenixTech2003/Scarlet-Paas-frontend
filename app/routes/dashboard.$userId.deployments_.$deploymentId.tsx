import { useState, useEffect } from "react";
import { socket } from "~/sockets/sockets"; // Ensure this path is correct
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getLogs } from "~/lib/data";
import { MdErrorOutline } from "react-icons/md";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  const deploymentId = params.deploymentId;

  if (userId !== undefined && deploymentId !== undefined) {
    const dbLogs = await getLogs(userId, deploymentId);
    return json({ userId, deploymentId, dbLogs });
  }
};

export default function AppDeployment() {
  const [logs, setLogs] = useState<string[]>([]);
  const { userId, deploymentId, dbLogs } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log("Setting up socket listener");

    // Set initial logs from dbLogs
    setLogs(dbLogs);

    const handleLog = (data: string[]) => {
      console.log("Received data:", data);
      setLogs((prevLogs) => {
        console.log("Previous logs:", prevLogs);
        const updatedLogs = [...prevLogs, ...data];
        console.log("Updated logs:", updatedLogs);

        return updatedLogs;
      });
    };

    const eventName = `${userId}-${deploymentId}`;
    socket.on(eventName, handleLog);

    // Check if socket is connected
    if (socket.connected) {
      console.log("Socket is connected");
    } else {
      console.log("Socket is not connected, attempting to connect...");
      socket.connect();
    }

    // Listen for connection event
    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    // Listen for connection error
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Cleanup the socket listener on component unmount
    return () => {
      console.log("Cleaning up socket listener");
      socket.off(eventName, handleLog);
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [dbLogs, userId, deploymentId]); // Dependency array ensures this runs only once

  return (
    <>
      <h1 className="mt-4">Deployment Logs</h1>
      <div className="mt-8 bg-black  text-left font-mono  grid font-extralight text-base overflow-y-auto max-h-screen text-white p-4 text-wrap">
        {/* Render logs if available */}
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <p
              className="text-white flex flex-wrap break-words whitespace-normal "
              key={index}
            >
              {log}
            </p>
          ))
        ) : (
          <p>No logs available</p>
        )}
      </div>
      <p className="mt-4 text-base font-normal">
        Please use this sites url and attach the specified port in the
        deployment logs to access your deployed site
      </p>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main>
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

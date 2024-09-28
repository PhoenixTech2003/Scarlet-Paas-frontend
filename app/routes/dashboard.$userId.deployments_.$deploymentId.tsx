import { useState, useEffect } from 'react';
import { socket } from '~/sockets/sockets'; // Ensure this path is correct

export default function AppDeployment() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log("Setting up socket listener");

    const handleLog = (data) => {
      console.log("Received data:", data);
      setLogs((prevLogs) => {
        console.log("Previous logs:", prevLogs);
        const updatedLogs = [...prevLogs, data];
        console.log("Updated logs:", updatedLogs);
        return updatedLogs;
      });
    };

    socket.on("log", handleLog);

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
      socket.off("log", handleLog);
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="bg-black text-white p-4">
      {/* Render logs if available */}
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <p className='text-white' key={index}>
            {log.message}
          </p>
        ))
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}
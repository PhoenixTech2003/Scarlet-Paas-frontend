import { socket } from "~/sockets/sockets";
import { useEffect } from "react";

export default function Deployments() {
  useEffect(()=>{
    socket.on('log', (data) => console.log(data) )
  })
  return <div className="text-white">hello from the deployments</div>;
}

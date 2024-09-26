import { TbApps } from "react-icons/tb";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { NavLink } from "@remix-run/react";
import { useAuth } from "@clerk/remix";

export default function NavLinks() {
  const {userId} = useAuth()
  return (
    <ul>
      <li className="flex gap-2 rounded-md items-center ">
        <NavLink className={({isActive, isPending})=>
        isActive ? "bg-rose-600 text-xl font-medium flex gap-2 rounded-md px-6 py-2" : isPending ? "flex items-center font-medium px-6 py-2" : "hover:bg-rose-600 flex items-center font-medium gap-2 px-6 py-2 rounded-md"

        } to={`/dashboard/${userId}/app-catalog`}>
    
        <TbApps size={30} />
        
          <p className="text-xl">App Catalog</p>

    
        </NavLink>
      </li>
      <li className="flex gap-2 rounded-md items-center mt-8">
      <NavLink className={({isActive, isPending})=>
        isActive ? "bg-rose-600 text-xl font-medium flex gap-2 rounded-md px-6 py-2" : isPending ? "flex items-center font-medium px-6 py-2" : "hover:bg-rose-600 gap-2 flex items-center font-medium px-6 py-2 rounded-md"

        } to={`/dashboard/${userId}/deployments`}>

        {" "}
        <AiOutlineDeploymentUnit size={30} />
        
          <p className="text-xl">Deployments</p>
    
        </NavLink>
        
      </li>
    </ul>
  );
}

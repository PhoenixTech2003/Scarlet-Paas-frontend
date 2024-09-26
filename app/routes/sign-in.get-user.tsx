
import { redirect, LoaderFunction } from "@remix-run/node";
import { getAuth } from '@clerk/remix/ssr.server'


export const loader:LoaderFunction = async(args)=>{
    const {userId} = await getAuth(args)
    return redirect(`/dashboard/${userId}/app-catalog`)

}
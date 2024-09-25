
import { redirect, LoaderFunction } from "@remix-run/node";
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from "@clerk/remix/api.server";


export const loader:LoaderFunction = async(args)=>{
    const {userId} = await getAuth(args)
    const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
        userId as string,
      )
      console.log(JSON.stringify(user))
    return redirect(`/dashboard/${userId}/app-catalog`)

}
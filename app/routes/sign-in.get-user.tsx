
import { redirect, LoaderFunction } from "@remix-run/node";
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from "@clerk/remix/api.server";
import { getMongoUserId } from "~/lib/data";


export const loader:LoaderFunction = async(args)=>{
    const {userId} = await getAuth(args)
    const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
        userId as string,
      )
      const email = user.emailAddresses[0].emailAddress
      const mongoUserId = (await getMongoUserId(email)).data.userId
      
    return redirect(`/dashboard/${mongoUserId}/app-catalog`)

}
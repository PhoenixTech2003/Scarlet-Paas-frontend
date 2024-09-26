import { redirect, LoaderFunction } from "@remix-run/node";
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from "@clerk/remix/api.server";
import { saveUserDataToMongo, getMongoUserId } from "~/lib/data";


export const loader:LoaderFunction = async(args)=>{
    const {userId} = await getAuth(args)
    const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
        userId as string,
      )

    const emailAddress = user.emailAddresses[0].emailAddress
    const firstName = user.firstName as string
    const lastName = user.lastName as string
    const id = userId as string
    await saveUserDataToMongo(id,emailAddress,firstName,lastName)
    const mongoUserId = (await getMongoUserId(emailAddress)).data.userId
    return redirect(`/dashboard/${mongoUserId}/app-catalog`)

}
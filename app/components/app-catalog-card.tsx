import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";
import type { AppCatalogCard } from "~/lib/definitions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function AppCatalogCard({
  details,
}: {
  details: AppCatalogCard;
}) {
  return (
    <Dialog>
      <DialogTrigger className="hover:border-2 hover:border-rose-600 rounded-xl bg-gradient-to-r grid gap-4 from-slate-900 to-slate-800 py-24 px-4">
        <div>
          <p className="flex justify-center">{details.icon}</p>
          <p>{details.name}</p>
        </div>
        <div className="flex items-center gap-2 self-center">
          <p className="font-normal text-lg">Click to start Deployment</p>
          <FaArrowRight color="#e11d48" />
        </div>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Let us deploy your {details.name} app</DialogTitle>
          <DialogDescription>
            Please provide a name for your app and upload a zip file of the app
          </DialogDescription>
        </DialogHeader>
        <Form className="grid gap-4">
          <Label>App Name</Label>
          <Input type="text" />
          <Label>Zip file</Label>
          <Input type="file" />
          <Button type="submit">Deploy</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

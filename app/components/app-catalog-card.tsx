import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FaArrowRight } from "react-icons/fa";
import type { AppCatalogCard } from "~/lib/definitions";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

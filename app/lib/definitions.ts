import { ReactNode } from "react";

export type AppCatalogCard = {
    name: string;
    icon: ReactNode;
}

export type AppFormData ={
    appname: string;
    zipFile : File;
}
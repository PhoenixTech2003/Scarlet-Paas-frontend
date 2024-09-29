import { ReactNode } from "react";

export type AppCatalogCard = {
    name: string;
    icon: ReactNode;
}

export type AppFormData ={
    appname: string;
    zipFile : File;
}

export type Deployment = {
    id: string;
    userId: string;
    _id: string;
    app_name: string;
    status: string;
  };





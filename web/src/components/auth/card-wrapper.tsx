"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <div className="">
          <div className="flex items-center justify-center w-full pb-3 gap-1 mx-auto px-7">
            <hr className="border-t flex-1 flex border-gray-300 " />
            <span className=" px-1 flex-1 flex text-sm text-gray-500">
              or continue with
            </span>
            <hr className="border-t border-gray-300 flex-1 " />
          </div>
          {/* <CardFooter>
            <Social />
          </CardFooter> */}
        </div>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

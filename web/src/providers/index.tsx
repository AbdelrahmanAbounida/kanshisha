import React from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./query-provider";

export const AllProviders = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" attribute="class">
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

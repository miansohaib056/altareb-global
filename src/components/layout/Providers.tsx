"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#FAF7F2",
            border: "1px solid rgba(200, 169, 126, 0.2)",
            fontSize: "14px",
          },
        }}
        richColors
        closeButton
      />
    </SessionProvider>
  );
}

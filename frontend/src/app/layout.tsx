"use client";

import { Provider } from "@/components/ui/provider";
import { createSystem, defaultConfig } from "@chakra-ui/react";
import Header from "@/app/components/Common/Header";
import Footer from "@/app/components/Common/Footer";
import "@/app/styles/globals.css";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider value={system}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
